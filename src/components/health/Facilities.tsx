import { useEffect, useState } from "react";
import { Phone, MapPin, Navigation, Loader2, Map as MapIcon } from "lucide-react";
import { FACILITIES, haversineKm, type Facility } from "@/lib/hospitals";
import { Button } from "@/components/ui/button";

type Props = {
  lang: "en" | "kn";
  title: string;
  callLabel: string;
  distLabel: string;
  useLocationLabel: string;
  locatingLabel: string;
  locationOnLabel: string;
  locationOffLabel: string;
  locationDeniedLabel: string;
};

export function Facilities({
  lang,
  title,
  callLabel,
  distLabel,
  useLocationLabel,
  locatingLabel,
  locationOnLabel,
  locationOffLabel,
  locationDeniedLabel,
}: Props) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error" | "denied">("idle");

  const requestLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setCoords({ lat: p.coords.latitude, lng: p.coords.longitude });
        setStatus("ok");
      },
      (err) => {
        setCoords(null);
        setStatus(err.code === err.PERMISSION_DENIED ? "denied" : "error");
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const list = (coords
    ? [...FACILITIES]
        .map((f) => ({ f, d: haversineKm(coords, f) }))
        .sort((a, b) => a.d - b.d)
    : FACILITIES.map((f) => ({ f, d: null as number | null }))
  ).slice(0, 8);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" /> {title}
        </h3>
        <Button size="sm" variant="outline" onClick={requestLocation} disabled={status === "loading"}>
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <Navigation className="h-4 w-4 mr-1" />
          )}
          {useLocationLabel}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        {status === "loading" && locatingLabel}
        {status === "ok" && coords && `${locationOnLabel} · ${coords.lat.toFixed(3)}, ${coords.lng.toFixed(3)}`}
        {status === "denied" && locationDeniedLabel}
        {(status === "error" || status === "idle") && status !== "idle" && locationOffLabel}
      </p>
      <ul className="space-y-2">
        {list.map(({ f, d }: { f: Facility; d: number | null }) => (
          <li key={f.id} className="rounded-lg border bg-card p-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-medium truncate">{f.name[lang]}</div>
              <div className="text-xs text-muted-foreground truncate">
                {f.type} · {f.address[lang]} {d != null && `· ${d} ${distLabel}`}
              </div>
              <a
                href={`tel:${f.phone.replace(/[^+\d]/g, "")}`}
                className="text-xs text-primary underline-offset-2 hover:underline"
              >
                {f.phone}
              </a>
            </div>
            <div className="flex flex-col gap-1 shrink-0">
              <Button asChild size="sm" variant="default">
                <a href={`tel:${f.phone.replace(/[^+\d]/g, "")}`} aria-label={`${callLabel} ${f.name[lang]}`}>
                  <Phone className="h-4 w-4 mr-1" /> {callLabel}
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a
                  href={
                    coords
                      ? `https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${f.lat},${f.lng}`
                      : `https://www.google.com/maps/search/?api=1&query=${f.lat},${f.lng}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Map ${f.name[lang]}`}
                >
                  <MapIcon className="h-4 w-4 mr-1" /> Map
                </a>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}