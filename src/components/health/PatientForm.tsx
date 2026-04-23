import { useState } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { VoiceButton } from "./VoiceButton";

export type Patient = {
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  place: string;
};

export function PatientForm({ lang, onSubmit }: { lang: Lang; onSubmit: (p: Patient) => void }) {
  const tr = t[lang];
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other" | "">("");
  const [place, setPlace] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age, 10);
    if (
      !name.trim() ||
      !place.trim() ||
      !gender ||
      Number.isNaN(ageNum) ||
      ageNum < 0 ||
      ageNum > 130
    ) {
      toast.error(tr.fillAllFields);
      return;
    }
    onSubmit({ name: name.trim().slice(0, 100), age: ageNum, gender, place: place.trim().slice(0, 200) });
  };

  return (
    <section className="space-y-6 pt-4">
      <div className="text-center space-y-2">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <User className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold">{tr.patientDetails}</h2>
        <p className="text-sm text-muted-foreground">{tr.patientDetailsDesc}</p>
      </div>

      <form onSubmit={submit} className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="name">{tr.name}</Label>
          <div className="flex gap-2">
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required className="flex-1" />
            <VoiceButton
              lang={lang}
              label=""
              listeningLabel=""
              onResult={(text) => setName(text)}
              className="w-10 h-10 p-0 flex-shrink-0"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="age">{tr.age}</Label>
            <Input id="age" type="number" inputMode="numeric" min={0} max={130} value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>{tr.gender}</Label>
            <div className="grid grid-cols-3 gap-1">
              {(["male", "female", "other"] as const).map((g) => (
                <Button
                  key={g}
                  type="button"
                  size="sm"
                  variant={gender === g ? "default" : "outline"}
                  onClick={() => setGender(g)}
                  className="text-xs"
                >
                  {tr[g]}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="place">{tr.place}</Label>
          <div className="flex gap-2">
            <Input id="place" value={place} onChange={(e) => setPlace(e.target.value)} maxLength={200} required className="flex-1" />
            <VoiceButton
              lang={lang}
              label=""
              listeningLabel=""
              onResult={(text) => setPlace(text)}
              className="w-10 h-10 p-0 flex-shrink-0"
            />
          </div>
        </div>
        <Button type="submit" className="w-full h-12 text-base">
          {tr.continueBtn}
        </Button>
      </form>
    </section>
  );
}
