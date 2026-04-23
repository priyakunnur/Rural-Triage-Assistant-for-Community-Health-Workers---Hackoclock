import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  lang: "en" | "kn";
  label: string;
  listeningLabel: string;
  onResult: (text: string) => void;
  autoStartKey?: string | number;
  className?: string;
};

export function VoiceButton({ lang, label, listeningLabel, onResult, autoStartKey, className }: Props) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const recogRef = useRef<any>(null);
  const onResultRef = useRef(onResult);
  const userEnabledRef = useRef(false);
  const listeningRef = useRef(false);
  const finalTextRef = useRef("");
  const handledResultRef = useRef(false);

  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  useEffect(() => {
    const SR =
      (typeof window !== "undefined" &&
        ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
      null;
    if (!SR) {
      setSupported(false);
      return;
    }
    const r = new SR();
    r.lang = lang === "kn" ? "kn-IN" : "en-IN";
    r.continuous = false;
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.onresult = (e: any) => {
      if (handledResultRef.current) return;

      let finalText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        const t = res?.[0]?.transcript ?? "";
        if (res.isFinal) finalText += t;
      }

      if (finalText) {
        finalTextRef.current += finalText;
        const out = finalTextRef.current.trim();
        if (!out) return;

        handledResultRef.current = true;
        listeningRef.current = false;
        setListening(false);

        try {
          r.stop();
        } catch {}

        onResultRef.current(out);
      }
    };
    r.onerror = (e: any) => {
      listeningRef.current = false;
      setListening(false);
      if (e?.error === "not-allowed" || e?.error === "service-not-allowed") {
        setError("Microphone blocked. Tap the mic and allow access.");
        userEnabledRef.current = false;
      } else if (e?.error === "network") {
        setError("Offline voice recognition is not installed on this device.");
      } else if (e?.error === "no-speech") {
        setError(null);
      } else if (e?.error) {
        setError(`Mic error: ${e.error}`);
      }
    };
    r.onstart = () => {
      listeningRef.current = true;
      setListening(true);
    };
    r.onend = () => {
      listeningRef.current = false;
      setListening(false);
    };
    recogRef.current = r;
    return () => {
      try {
        r.abort();
      } catch {}
    };
  }, [lang]);

  const toggle = useCallback(() => {
    const r = recogRef.current;
    if (!r) return;
    setError(null);
    if (listeningRef.current) {
      try { r.stop(); } catch {}
      listeningRef.current = false;
      setListening(false);
      userEnabledRef.current = false;
      handledResultRef.current = false;
      finalTextRef.current = "";
    } else {
      finalTextRef.current = "";
      handledResultRef.current = false;
      try {
        try { r.abort(); } catch {}
        r.start();
        userEnabledRef.current = true;
        setListening(true);
      } catch (err: any) {
        // InvalidStateError: already started — ignore
        if (err?.name !== "InvalidStateError") {
          setError(err?.message || "Could not start microphone.");
        }
      }
    }
  }, []);

  // Auto-start only after the user has granted access by tapping once.
  useEffect(() => {
    if (autoStartKey === undefined) return;
    if (!userEnabledRef.current) return;
    const r = recogRef.current;
    if (!r) return;

    handledResultRef.current = false;
    finalTextRef.current = "";

    const id = setTimeout(() => {
      if (listeningRef.current) {
        try { r.abort(); } catch {}
        listeningRef.current = false;
        setListening(false);
      }

      finalTextRef.current = "";
      handledResultRef.current = false;
      try {
        r.start();
      } catch {
        // already started or blocked; ignore
      }
    }, 800);
    return () => clearTimeout(id);
  }, [autoStartKey]);

  if (!supported) return null;

  return (
    <div className="space-y-1">
      <Button
        type="button"
        variant={listening ? "destructive" : "outline"}
        onClick={toggle}
        className={className ?? "w-full h-12 text-base"}
      >
        {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        {label && <span className="ml-2">{listening ? listeningLabel : label}</span>}
      </Button>
      {error && <p className="text-xs text-destructive text-center">{error}</p>}
    </div>
  );
}