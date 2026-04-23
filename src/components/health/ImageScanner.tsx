import { useState, useRef } from "react";
import { Camera, Upload, CheckCircle2, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { t, type Lang } from "@/lib/i18n";
import { analyzeImage, type VisualAnalysis } from "@/lib/vision";

interface Props {
  lang: Lang;
  onComplete: (analysis: VisualAnalysis) => void;
  onSkip: () => void;
}

export function ImageScanner({ lang, onComplete, onSkip }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const startScan = async () => {
    if (!file) return;
    setScanning(true);
    setProgress(0);

    // Simulate scanning time for dramatic effect
    for (let i = 0; i <= 100; i += 5) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 100));
    }

    const analysis = await analyzeImage(file);
    onComplete(analysis);
  };

  return (
    <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold">Visual Examination</h2>
        <p className="text-sm text-muted-foreground">
          Take a photo of any visible symptoms (like a skin rash or eye discoloration) for offline AI analysis.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col items-center gap-4">
        {!preview ? (
          <>
            <div className="h-48 w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 bg-muted/20">
              <Camera className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground font-medium">No Image Captured</p>
            </div>
            
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFile}
            />
            
            <div className="flex gap-3 w-full">
              <Button onClick={() => fileInputRef.current?.click()} className="flex-1">
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="relative h-48 w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Preview" className="max-h-full max-w-full object-contain" />
              
              {scanning && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-1 bg-primary/80 animate-scan absolute top-0 shadow-[0_0_8px_2px_rgba(var(--primary),0.5)]" />
                  <div className="absolute inset-0 bg-primary/10" />
                </div>
              )}
            </div>

            {scanning ? (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-xs font-medium text-primary">
                  <span>Analyzing pixels offline...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ) : (
              <div className="flex gap-3 w-full">
                <Button variant="outline" onClick={() => setPreview(null)} className="flex-1">
                  Retake
                </Button>
                <Button onClick={startScan} className="flex-1 bg-primary">
                  <Scan className="h-4 w-4 mr-2" />
                  Analyze
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {!scanning && (
        <Button variant="ghost" className="w-full text-muted-foreground" onClick={onSkip}>
          Skip Visual Exam
        </Button>
      )}
    </section>
  );
}
