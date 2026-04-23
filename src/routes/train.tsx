import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, Download, Play, CheckCircle2 } from 'lucide-react';
import { trainModel, aiModel, generateTrainingData, outputsToTriage, TRIAGE_CLASSES } from '@/lib/ai-triage';

export const Route = createFileRoute('/train')({
  component: TrainAI,
  head: () => ({
    meta: [{ title: 'Train AI Model — Health Assistant' }],
  }),
});

function TrainAI() {
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loss, setLoss] = useState<number | null>(null);
  const [trained, setTrained] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);

  const startTraining = async () => {
    setTraining(true);
    setProgress(0);
    setTrained(false);

    await trainModel((epoch, currentLoss) => {
      setProgress((epoch / 500) * 100);
      setLoss(currentLoss);
    });

    setTraining(false);
    setProgress(100);
    setTrained(true);
    
    // Evaluate accuracy
    const testData = generateTrainingData();
    let correct = 0;
    for (const item of testData) {
      const pred = aiModel.predict(item.input);
      const { prediction } = outputsToTriage(pred);
      const targetIdx = item.output.indexOf(1);
      if (prediction === TRIAGE_CLASSES[targetIdx]) {
        correct++;
      }
    }
    setAccuracy((correct / testData.length) * 100);
  };

  const exportModel = () => {
    const json = aiModel.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-triage-weights.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-md space-y-8">
        <header className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Training Lab</h1>
            <p className="text-sm text-muted-foreground">Train the symptom classifier</p>
          </div>
        </header>

        <section className="space-y-4 rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Model Status</h2>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Training Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>

          {loss !== null && (
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Current Loss:</span>
              <span>{loss.toFixed(6)}</span>
            </div>
          )}

          {accuracy !== null && (
            <div className="flex justify-between text-sm text-emerald-600 font-medium">
              <span>Accuracy on dataset:</span>
              <span>{accuracy.toFixed(2)}%</span>
            </div>
          )}

          <div className="pt-4 flex flex-col gap-3">
            <Button 
              onClick={startTraining} 
              disabled={training}
              className="w-full"
            >
              {training ? (
                <>Training...</>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  {trained ? 'Retrain Model' : 'Start Training'}
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={exportModel}
              disabled={!trained}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Weights JSON
            </Button>
          </div>
        </section>

        <section className="space-y-4 text-sm text-muted-foreground">
          <p>
            <strong>How it works:</strong> This trains a lightweight Multi-Layer Perceptron (Neural Network) directly in your browser. 
            It generates 4,096 synthetic combinations of symptoms based on the rule engine and trains the AI to replicate the logic.
          </p>
          <p>
            Because it is pure TypeScript, the trained model runs entirely offline on the patient's device without any external API calls.
          </p>
        </section>
      </div>
    </div>
  );
}
