import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  onClassify: (kind: "rash" | "wound" | "jaundice" | "infection" | "unknown") => void;
};

export function PhotoUpload({ label, onClassify }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handle = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    // Lightweight rule-based "classification": sample average color from canvas
    const img = new Image();
    img.src = url;
    await new Promise((res) => (img.onload = res));
    const c = document.createElement("canvas");
    c.width = 32;
    c.height = 32;
    const ctx = c.getContext("2d");
    if (!ctx) return onClassify("unknown");
    ctx.drawImage(img, 0, 0, 64, 64);
    const { data } = ctx.getImageData(0, 0, 64, 64);
    let r = 0, g = 0, b = 0;
    let darkRed = 0, yellow = 0, redPink = 0, greenYellow = 0;
    const n = data.length / 4;
    for (let i = 0; i < data.length; i += 4) {
      const pr = data[i], pg = data[i + 1], pb = data[i + 2];
      r += pr; g += pg; b += pb;
      // Dark red / blood => wound
      if (pr > 110 && pr > pg + 40 && pr > pb + 40 && pg < 80) darkRed++;
      // Yellow tone => jaundice (high R+G, low B)
      if (pr > 170 && pg > 150 && pb < 130 && Math.abs(pr - pg) < 50) yellow++;
      // Pink/red dominance => rash
      if (pr > 160 && pr > pg + 15 && pr > pb + 15 && pg > 90) redPink++;
      // Greenish-yellow => possible pus/infection
      if (pg > 140 && pg > pr - 20 && pb < 130 && pr < 200) greenYellow++;
    }
    r /= n; g /= n; b /= n;
    const pct = (c: number) => c / n;
    if (pct(darkRed) > 0.12) return onClassify("wound");
    if (pct(yellow) > 0.35) return onClassify("jaundice");
    if (pct(greenYellow) > 0.18) return onClassify("infection");
    if (pct(redPink) > 0.2) return onClassify("rash");
    onClassify("unknown");
  };

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handle(f);
        }}
      />
      <Button
        type="button"
        variant="secondary"
        className="w-full h-12"
        onClick={() => inputRef.current?.click()}
      >
        <Camera className="mr-2 h-5 w-5" />
        {label}
      </Button>
      {preview && (
        <img
          src={preview}
          alt="Uploaded"
          className="w-full max-h-48 object-cover rounded-md border"
        />
      )}
    </div>
  );
}