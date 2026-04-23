import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ArrowLeft, Clock, AlertTriangle, Activity, CheckCircle2, CloudOff, Wifi, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHistory, type PendingAssessment, getPendingAssessments } from "@/lib/offline-store";
import { t, type Lang } from "@/lib/i18n";
import { ALL_QUESTIONS } from "@/lib/triage";

interface HistoryProps {
  lang: Lang;
  onBack: () => void;
}

export function History({ lang, onBack }: HistoryProps) {
  const [history, setHistory] = useState<PendingAssessment[]>([]);
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const tr = t[lang];

  useEffect(() => {
    const loadData = async () => {
      const hist = await getHistory();
      const pending = await getPendingAssessments();
      
      setHistory(hist);
      setPendingIds(new Set(pending.map(p => p.id)));
      setLoading(false);
    };
    
    loadData();
  }, []);

  const getTriageIcon = (triage: string) => {
    if (triage === "emergency") return <AlertTriangle className="h-5 w-5 text-emergency" />;
    if (triage === "clinic") return <Activity className="h-5 w-5 text-warning" />;
    return <CheckCircle2 className="h-5 w-5 text-safe" />;
  };

  const getTriageColor = (triage: string) => {
    if (triage === "emergency") return "border-emergency/30 bg-emergency/5";
    if (triage === "clinic") return "border-warning/30 bg-warning/5";
    return "border-safe/30 bg-safe/5";
  };

  const getTriageLabel = (triage: string) => {
    if (triage === "emergency") return tr.emergency;
    if (triage === "clinic") return tr.visitClinic;
    return tr.homeCare;
  };

  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {tr.restart}
        </Button>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          History
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-10 text-muted-foreground">Loading...</div>
      ) : history.length === 0 ? (
        <div className="text-center py-12 rounded-2xl border bg-card text-muted-foreground flex flex-col items-center gap-3">
          <Clock className="h-10 w-10 opacity-20" />
          <p>No past assessments found on this device.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => {
            const isPending = pendingIds.has(item.id);
            return (
              <div 
                key={item.id} 
                className={`p-4 rounded-xl border shadow-sm ${getTriageColor(item.triage)}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm opacity-80">{item.age} • {item.gender} • {item.place}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {getTriageIcon(item.triage)}
                    <span className="text-xs font-medium uppercase tracking-wide opacity-80">
                      {getTriageLabel(item.triage)}
                    </span>
                  </div>
                </div>
                
                <details className="group mt-3 mb-1">
                  <summary className="flex cursor-pointer items-center gap-1.5 text-xs font-medium opacity-70 hover:opacity-100 outline-none list-none marker:hidden [&::-webkit-details-marker]:hidden">
                    View Responses
                    <ChevronDown className="h-3 w-3 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="mt-3 space-y-2 border-t border-black/5 dark:border-white/5 pt-3 mb-2">
                    {Object.entries(item.answers).map(([qId, ans]) => {
                      const q = ALL_QUESTIONS[qId];
                      const opt = q?.options.find(o => o.value === ans);
                      const isSevere = opt && opt.severity > 0;
                      const label = opt ? opt.label[lang] : ans;
                      
                      return (
                        <div key={qId} className="flex justify-between text-sm gap-4">
                          <span className="opacity-80">{q?.text[lang] || qId}</span>
                          <span className={`font-semibold shrink-0 text-right ${isSevere ? "text-emergency" : "opacity-60"}`}>
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </details>
                
                <div className="mt-2 pt-3 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-xs opacity-70">
                  <span>{format(new Date(item.timestamp), 'PP p')}</span>
                  <div className="flex items-center gap-1">
                    {isPending ? (
                      <>
                        <CloudOff className="h-3 w-3" />
                        <span>Pending Sync</span>
                      </>
                    ) : (
                      <>
                        <Wifi className="h-3 w-3 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Synced to Cloud</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
