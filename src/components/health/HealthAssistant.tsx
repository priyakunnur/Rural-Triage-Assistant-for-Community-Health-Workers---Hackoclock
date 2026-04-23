import { useEffect, useMemo, useState } from "react";
import { Activity, Languages, RotateCcw, Heart, AlertTriangle, CheckCircle2, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { t, type Lang } from "@/lib/i18n";
import { QUESTIONS, START_ID, computeTriage, nextQuestion, type Answer, type Triage } from "@/lib/triage";
import { VoiceButton } from "./VoiceButton";
import { Facilities } from "./Facilities";

type Phase = "intro" | "asking" | "result";

export function HealthAssistant() {
  const [lang, setLang] = useState<Lang>("en");
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentId, setCurrentId] = useState<string>(START_ID);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [forced, setForced] = useState<Triage | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [autoVoice, setAutoVoice] = useState(true);

  const tr = t[lang];
  const totalSteps = 12;
  const stepNum = Object.keys(answers).length + 1;

  const current = QUESTIONS[currentId];

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "kn" ? "kn-IN" : "en-IN";
      u.rate = 0.95;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(u);
    } catch {}
  };

  const stopSpeak = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  };

  // Auto-speak each question when it changes
  useEffect(() => {
    if (phase === "asking" && current && autoVoice) {
      speak(current.text[lang]);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, phase, lang]);

  const triage: Triage = forced ?? computeTriage(answers);

  const start = () => {
    setAnswers({});
    setForced(null);
    setCurrentId(START_ID);
    setPhase("asking");
  };

  const restart = () => setPhase("intro");

  const answer = (a: Answer) => {
    const newAns = { ...answers, [currentId]: a };
    setAnswers(newAns);
    const q = QUESTIONS[currentId];
    if (a === "yes" && q.redFlag) {
      setForced("emergency");
      setPhase("result");
      return;
    }
    const nxt = nextQuestion(currentId, a);
    if (!nxt || !QUESTIONS[nxt]) {
      setPhase("result");
      return;
    }
    setCurrentId(nxt);
  };

  const handleVoice = (text: string) => {
    const lower = text.toLowerCase().trim();
    const yesWords = current?.yesKeywords ?? [];
    const noWords = ["no", "ಇಲ್ಲ", "illa"];
    if (yesWords.some((k) => lower.includes(k))) answer("yes");
    else if (noWords.some((k) => lower.includes(k))) answer("no");
  };

  const resultMeta = useMemo(() => {
    if (triage === "emergency")
      return {
        title: tr.emergency,
        desc: tr.emergencyDesc,
        cls: "bg-emergency text-emergency-foreground",
        Icon: AlertTriangle,
      };
    if (triage === "clinic")
      return {
        title: tr.visitClinic,
        desc: tr.visitClinicDesc,
        cls: "bg-warning text-warning-foreground",
        Icon: Activity,
      };
    return {
      title: tr.homeCare,
      desc: tr.homeCareDesc,
      cls: "bg-safe text-safe-foreground",
      Icon: CheckCircle2,
    };
  }, [triage, tr]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b">
        <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="font-semibold">{tr.appName}</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setLang(lang === "en" ? "kn" : "en")}
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4 mr-1" />
            {tr.language}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-6 space-y-6">
        {phase === "intro" && (
          <section className="text-center space-y-6 pt-8">
            <div className="mx-auto h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{tr.appName}</h1>
              <p className="text-muted-foreground">{tr.tagline}</p>
            </div>
            <Button onClick={start} className="w-full h-14 text-lg">
              {tr.start}
            </Button>
            <Facilities
              lang={lang}
              title={tr.nearby}
              callLabel={tr.callFacility}
              distLabel={tr.distance}
              useLocationLabel={tr.useLocation}
              locatingLabel={tr.locating}
              locationOnLabel={tr.locationOn}
              locationOffLabel={tr.locationOff}
              locationDeniedLabel={tr.locationDenied}
            />
          </section>
        )}

        {phase === "asking" && current && (
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {tr.question} {stepNum} {tr.of} {totalSteps}
                </span>
              </div>
              <Progress value={(stepNum / totalSteps) * 100} />
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xl font-medium leading-snug flex-1">{current.text[lang]}</p>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => (speaking ? stopSpeak() : speak(current.text[lang]))}
                  aria-label="Read question aloud"
                >
                  {speaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => answer("yes")} className="h-20 text-xl bg-safe hover:bg-safe/90 text-safe-foreground">
                {tr.yes}
              </Button>
              <Button onClick={() => answer("no")} variant="outline" className="h-20 text-xl">
                {tr.no}
              </Button>
            </div>

            <VoiceButton
              lang={lang}
              label={tr.voice}
              listeningLabel={tr.listening}
              onResult={handleVoice}
              autoStartKey={autoVoice ? currentId : undefined}
            />

            <Button variant="ghost" className="w-full" onClick={restart}>
              <RotateCcw className="h-4 w-4 mr-2" />
              {tr.restart}
            </Button>
          </section>
        )}

        {phase === "result" && (
          <section className="space-y-6">
            <div className={`rounded-2xl p-6 shadow-md ${resultMeta.cls}`}>
              <resultMeta.Icon className="h-10 w-10 mb-3" />
              <h2 className="text-2xl font-bold">{resultMeta.title}</h2>
              <p className="mt-2 opacity-95">{resultMeta.desc}</p>
            </div>

            {triage !== "home" && (
              <Facilities
                lang={lang}
                title={tr.nearby}
                callLabel={tr.callFacility}
                distLabel={tr.distance}
                useLocationLabel={tr.useLocation}
                locatingLabel={tr.locating}
                locationOnLabel={tr.locationOn}
                locationOffLabel={tr.locationOff}
                locationDeniedLabel={tr.locationDenied}
              />
            )}

            <Button onClick={start} className="w-full h-14 text-lg">
              <RotateCcw className="h-5 w-5 mr-2" />
              {tr.restart}
            </Button>
          </section>
        )}
      </main>
    </div>
  );
}