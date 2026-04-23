import { useEffect, useMemo, useState } from "react";
import { Activity, Languages, RotateCcw, Heart, AlertTriangle, CheckCircle2, Volume2, VolumeX, Lightbulb, Brain, CloudOff, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { t, type Lang } from "@/lib/i18n";
import { ALL_QUESTIONS, START_ID, computeTriage, nextQuestion, type Triage, QUESTION_LIST } from "@/lib/triage";
import { aiModel, answersToInputs, outputsToDisease, trainModel } from "@/lib/ai-triage";
import { VoiceButton } from "./VoiceButton";
import { Facilities } from "./Facilities";
import { PatientForm, type Patient } from "./PatientForm";
import { saveAssessmentLocally, getPendingAssessments } from "@/lib/offline-store";
import { syncPendingAssessments } from "@/lib/sync";
import { toast } from "sonner";
import { History } from "./History";
import { Clock } from "lucide-react";
import { ImageScanner } from "./ImageScanner";
import type { VisualAnalysis } from "@/lib/vision";

type Phase = "intro" | "patient" | "asking" | "image_scan" | "result" | "history";

export function HealthAssistant() {
  const [lang, setLang] = useState<Lang>("en");
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentId, setCurrentId] = useState<string>(START_ID);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [visuals, setVisuals] = useState<VisualAnalysis | null>(null);
  const [forced, setForced] = useState<Triage | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [autoVoice, setAutoVoice] = useState(true);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [pendingCount, setPendingCount] = useState(0);

  const refreshPendingCount = async () => {
    const pending = await getPendingAssessments();
    setPendingCount(pending.length);
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.info("Online. Syncing pending data...");
      syncPendingAssessments().then(({ synced }) => {
        if (synced > 0) toast.success(`Synced ${synced} offline cases!`);
        refreshPendingCount();
      });
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    refreshPendingCount();
    
    // Initial sync if online
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      syncPendingAssessments().then(({ synced }) => {
        if (synced > 0) toast.success(`Synced ${synced} offline cases!`);
        refreshPendingCount();
      });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const tr = t[lang];
  const totalSteps = QUESTION_LIST.length;
  const stepNum = Object.keys(answers).length + 1;

  const current = ALL_QUESTIONS[currentId];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, phase, lang]);



  // Train AI silently in background once on load
  useEffect(() => {
    trainModel().catch(console.error);
  }, []);

  const triage: Triage = forced ?? computeTriage(answers);

  const aiPredictionInfo = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;
    const inputs = answersToInputs(answers);
    
    // Inject visual heuristics into AI inputs
    if (visuals?.hasRedness) {
      inputs[10] = 1; // Rash
      inputs[7] = inputs[7] > 0 ? inputs[7] : 0.5; // Minor bleeding
    }
    if (visuals?.hasYellowing) {
      inputs[2] = 1; // Vomiting (Jaundice proxy for Typhoid/Gastro)
    }

    const outputs = aiModel.predict(inputs);
    return outputsToDisease(outputs);
  }, [answers, visuals]);



  const start = () => {
    setAnswers({});
    setVisuals(null);
    setForced(null);
    setCurrentId(START_ID);
    setSavedId(null);
    setPhase("patient");
  };

  const handlePatientSubmit = (p: Patient) => {
    setPatient(p);
    setPhase("asking");
  };

  const restart = () => setPhase("intro");

  const answer = (a: string) => {
    const newAns = { ...answers, [currentId]: a };
    setAnswers(newAns);
    
    const q = ALL_QUESTIONS[currentId];
    const opt = q?.options.find(o => o.value === a);
    if (opt?.redFlag) {
      setForced("emergency");
      setPhase("result");
      return;
    }
    
    const nxt = nextQuestion(currentId);
    if (!nxt || !ALL_QUESTIONS[nxt]) {
      setPhase("image_scan");
      return;
    }
    setCurrentId(nxt);
  };

  const handleVoice = (text: string) => {
    if (speaking) return;
    const lower = text.toLowerCase().replace(/[.,!?;:]/g, " ").trim();
    const tokens = lower.split(/\s+/).filter(Boolean);
    
    const hasWord = (list: string[]) =>
      list.some((k) => {
        const kk = k.toLowerCase();
        if (/^[a-z]+$/.test(kk) && kk.length <= 4) return tokens.includes(kk);
        return lower.includes(kk);
      });

    for (const opt of current?.options ?? []) {
      if (hasWord(opt.keywords)) {
        answer(opt.value);
        return;
      }
    }
    
    toast.error("Couldn't understand. Please tap the button.");
  };

  const resultMeta = useMemo(() => {
    if (triage === "emergency")
      return {
        title: tr.emergency,
        desc: tr.emergencyDesc,
        cls: "bg-emergency text-emergency-foreground",
        Icon: AlertTriangle,
        recs: tr.recEmergencyList,
      };
    if (triage === "clinic")
      return {
        title: tr.visitClinic,
        desc: tr.visitClinicDesc,
        cls: "bg-warning text-warning-foreground",
        Icon: Activity,
        recs: tr.recClinicList,
      };
    return {
      title: tr.homeCare,
      desc: tr.homeCareDesc,
      cls: "bg-safe text-safe-foreground",
      Icon: CheckCircle2,
      recs: tr.recHomeList,
    };
  }, [triage, tr]);

  // Save locally and attempt sync on entering result phase (once)
  useEffect(() => {
    if (phase !== "result" || !patient || savedId) return;
    (async () => {
      try {
        const id = await saveAssessmentLocally({
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          place: patient.place,
          language: lang,
          triage,
          answers,
        });
        setSavedId(id);
        refreshPendingCount();
        
        if (isOnline) {
          toast.success("Saved! Syncing to cloud...");
          const { synced } = await syncPendingAssessments();
          if (synced > 0) toast.success("Successfully synced to cloud.");
          refreshPendingCount();
        } else {
          toast.success("Saved offline. Will sync when internet is restored.");
        }
      } catch (err) {
        console.error(err);
        toast.error(tr.saveFailed);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur border-b">
        <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="App Logo" className="h-6 w-6" />
            <span className="font-semibold">{tr.appName}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 bg-muted rounded-full mr-2">
              {isOnline ? (
                <Wifi className="h-3 w-3 text-emerald-500" />
              ) : (
                <CloudOff className="h-3 w-3 text-muted-foreground" />
              )}
              {pendingCount > 0 && <span className="text-primary">{pendingCount} pending</span>}
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
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-6 space-y-6">
        {phase === "intro" && (
          <section className="text-center space-y-6 pt-8">
            <div className="mx-auto h-24 w-24 rounded-2xl bg-[#cbf4e6] flex items-center justify-center p-2 shadow-sm">
              <img src="/logo.svg" alt="App Logo" className="h-full w-full drop-shadow-md" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{tr.appName}</h1>
              <p className="text-muted-foreground">{tr.tagline}</p>
            </div>
            <Button onClick={start} className="w-full h-14 text-lg">
              {tr.start}
            </Button>
            <Button onClick={() => setPhase("history")} variant="outline" className="w-full h-12">
              <Clock className="h-4 w-4 mr-2" />
              View Assessment History
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

            <div className="grid grid-cols-1 gap-3">
              {current.options.map((opt) => (
                <Button 
                  key={opt.value} 
                  onClick={() => answer(opt.value)} 
                  variant="outline" 
                  className={`h-16 text-lg justify-start px-6 ${opt.severity > 0 ? "border-primary/50 hover:bg-primary/5" : ""}`}
                >
                  {opt.label[lang]}
                </Button>
              ))}
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

        {phase === "patient" && (
          <PatientForm lang={lang} onSubmit={handlePatientSubmit} />
        )}

        {phase === "image_scan" && (
          <ImageScanner 
            lang={lang} 
            onComplete={(res) => {
              setVisuals(res);
              setPhase("result");
            }}
            onSkip={() => setPhase("result")}
          />
        )}

        {phase === "result" && (
          <section className="space-y-6">
            <div className={`rounded-2xl p-6 shadow-md ${resultMeta.cls}`}>
              <resultMeta.Icon className="h-10 w-10 mb-3" />
              <h2 className="text-2xl font-bold">{resultMeta.title}</h2>
              <p className="mt-2 opacity-95">{resultMeta.desc}</p>
              {patient && (
                <p className="mt-3 text-sm opacity-90">
                  {patient.name} · {patient.age} · {patient.place}
                </p>
              )}
            </div>



            {aiPredictionInfo && (
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-sm flex items-start gap-3">
                <Brain className="h-6 w-6 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-primary">Disease Prediction</h3>
                  <p className="text-sm text-primary/80 mt-1">
                    Based on these symptoms, the most likely condition is <strong>{aiPredictionInfo.prediction}</strong> ({Math.round(aiPredictionInfo.confidence * 100)}% match).
                  </p>
                </div>
              </div>
            )}

            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{tr.recommendations}</h3>
              </div>
              <ul className="space-y-2 text-sm">
                {resultMeta.recs.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
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

        {phase === "history" && (
          <History lang={lang} onBack={() => setPhase("intro")} />
        )}
      </main>
    </div>
  );
}