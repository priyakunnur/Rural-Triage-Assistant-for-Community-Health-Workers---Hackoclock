import { createFileRoute } from "@tanstack/react-router";
import { HealthAssistant } from "@/components/health/HealthAssistant";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Health Assistant — Offline Triage for Rural Care" },
      {
        name: "description",
        content:
          "Offline-friendly triage assistant in English & Kannada for rural health workers. Smart symptom checks, voice input, and nearby facilities.",
      },
      { name: "theme-color", content: "#2bb6a8" },
    ],
    links: [{ rel: "manifest", href: "/manifest.webmanifest" }],
  }),
});

function Index() {
  return <HealthAssistant />;
}
