import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Lumi, type LumiMood } from "@/components/Lumi";
import { PhoneFrame } from "@/components/PhoneFrame";
import { buzz, daysSince, markVisit, useLumi } from "@/lib/lumi-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumi — Glow with Self-Love" },
      {
        name: "description",
        content:
          "A pocket-sized warm space. Hug Lumi, quiet your inner critic and grow gentle confidence in seconds.",
      },
      { property: "og:title", content: "Lumi — Glow with Self-Love" },
      {
        property: "og:description",
        content: "Hug Lumi for instant relief, feed your fluffy friend, and be kinder to yourself.",
      },
    ],
  }),
  component: HomePage,
});

type Stage = "home" | "hugging" | "breathe" | "scan" | "release";

const openers = [
  "Hey you \u2661",
  "You made it to today.",
  "I'm right here.",
  "No pressure here.",
];

const moods = [
  { key: "notok", label: "Not okay", lumi: "close" as LumiMood },
  { key: "off", label: "A little off", lumi: "anxious" as LumiMood },
  { key: "okay", label: "I'm okay", lumi: "happy" as LumiMood },
  { key: "just", label: "I just want Lumi", lumi: "lonely" as LumiMood },
];

const scans = [
  {
    key: "body",
    label: "I feel not enough",
    mood: "close" as LumiMood,
    line: "Your body is your home, not a trend. Look at your hands — they carry you through everything.",
  },
  {
    key: "guilt",
    label: "I made a mistake",
    mood: "shrug" as LumiMood,
    line: "A mistake is something you did, not something you are. I'd still choose you today.",
  },
  {
    key: "lonely",
    label: "I feel lonely",
    mood: "lonely" as LumiMood,
    line: "You don't have to pretend with me. I'll just sit beside you for a while.",
  },
  {
    key: "other",
    label: "Something else",
    mood: "anxious" as LumiMood,
    line: "You don't need the right words. Breathe out slowly — I'm not going anywhere.",
  },
];

function HomePage() {
  const { equipped, lastVisit } = useLumi();
  const [stage, setStage] = useState<Stage>("home");
  const [mood, setMood] = useState<LumiMood>("idle");
  const [line, setLine] = useState(openers[0]);
  const [gap, setGap] = useState<number | null>(null);

  useEffect(() => {
    const d = daysSince(lastVisit);
    if (d !== null && d >= 2) setGap(d);
    setLine(openers[Math.floor(Math.random() * openers.length)]);
    markVisit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startHug() {
    buzz([30, 60, 30, 60, 220]);
    setStage("hugging");
    setMood("close");
    setLine("I've got you. Breathe with me.");
    window.setTimeout(() => setStage("breathe"), 2800);
    window.setTimeout(() => {
      setStage("scan");
      setMood("idle");
      setLine("Is anything sitting heavy right now?");
    }, 7000);
  }

  function pickMood(m: (typeof moods)[number]) {
    buzz(20);
    setMood(m.lumi);
    if (m.key === "just") {
      setLine("Then let's just be here together. No task, no fixing.");
      setStage("home");
      return;
    }
    if (m.key === "okay") {
      setLine("I like hearing that. Look at you, glowing quietly.");
      setStage("home");
      return;
    }
    setLine("Come here.");
    startHug();
  }

  const showFrame = stage !== "hugging" && stage !== "breathe";

  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col items-center justify-between py-4 text-center">
        <div className="animate-soft-rise space-y-2 pt-2">
          {gap !== null ? (
            <p className="text-xs text-muted-foreground">
              Hey. You're back. 🤍 No catching up needed.
            </p>
          ) : null}
          <p className="font-display text-xl leading-relaxed text-foreground">{line}</p>
        </div>

        <div
          className={cn(
            "relative my-4 grid place-items-center transition-all duration-700",
            stage === "hugging" && "animate-hug-fill",
          )}
        >
          <Lumi mood={mood} size={stage === "breathe" ? 250 : 230} hat={equipped.hat} face={equipped.face} />
        </div>

        {stage === "breathe" ? (
          <div className="animate-soft-rise space-y-4 pb-10">
            <div className="mx-auto h-24 w-24 animate-lumi-breathe rounded-full bg-primary/20" />
            <p className="text-sm text-muted-foreground">In… and out. Slower than you need to.</p>
          </div>
        ) : null}

        {showFrame ? (
          <div className="w-full space-y-5 pb-6">
            {stage === "scan" ? (
              <div className="animate-soft-rise space-y-2">
                {scans.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => {
                      buzz(15);
                      setMood(s.mood);
                      setLine(s.line);
                      setStage("release");
                    }}
                    className="glass-card w-full rounded-2xl px-4 py-4 text-sm font-medium text-foreground"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">How are you, really?</p>
                <button
                  onClick={startHug}
                  className="w-full rounded-full bg-primary px-6 py-5 font-display text-lg font-semibold text-primary-foreground shadow-[0_18px_40px_-18px_var(--glow)] transition-transform active:scale-95"
                >
                  Hug Lumi
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {moods.map((m) => (
                    <button
                      key={m.key}
                      onClick={() => pickMood(m)}
                      className="glass-card min-h-[52px] rounded-2xl px-3 py-3 text-xs font-medium text-muted-foreground"
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </PhoneFrame>
  );
}
