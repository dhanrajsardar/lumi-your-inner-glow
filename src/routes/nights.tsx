import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Lumi } from "@/components/Lumi";
import { PhoneFrame } from "@/components/PhoneFrame";
import { addNightEntry, buzz, useLumi } from "@/lib/lumi-store";

export const Route = createFileRoute("/nights")({
  head: () => ({
    meta: [
      { title: "Sweet pillow — your nightly proud moment" },
      {
        name: "description",
        content: "Before you sleep, tell Lumi one thing you're proud of today.",
      },
      { property: "og:title", content: "Sweet pillow — your nightly proud moment" },
      {
        property: "og:description",
        content: "One soft line a night, kept safe for the days you forget.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NightsPage,
});

function NightsPage() {
  const { nights, equipped } = useLumi();
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  function save() {
    if (!text.trim()) return;
    addNightEntry(text.trim());
    buzz(30);
    setText("");
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3500);
  }

  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col gap-4 py-4">
        <div className="text-center">
          <h1 className="font-display text-xl font-semibold">Before you go…</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            What's one thing you're proud of today?
          </p>
        </div>

        <div className="grid place-items-center">
          <Lumi
            mood={saved ? "proud" : "sleepy"}
            size={150}
            hat={equipped.hat}
            face={equipped.face}
            outfit={equipped.outfit}
            accessory={equipped.accessory}
          />
        </div>

        <div className="glass-card rounded-3xl p-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Tonight I'm proud that…"
            className="w-full resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={save}
            className="mt-2 min-h-[52px] w-full rounded-full bg-primary px-6 font-display font-semibold text-primary-foreground transition-transform active:scale-95"
          >
            Tuck it in
          </button>
        </div>

        {saved ? (
          <p className="animate-soft-rise text-center text-sm text-primary">
            Sleep soft. I'll keep this safe. +5 ♡
          </p>
        ) : null}

        <div className="space-y-2 pb-4">
          {nights.map((n) => (
            <div key={n.id} className="glass-card rounded-2xl px-4 py-3">
              <p className="text-sm">{n.text}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {new Date(n.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
