import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Lumi } from "@/components/Lumi";
import { PhoneFrame } from "@/components/PhoneFrame";
import { addFeedEntry, buzz, useLumi } from "@/lib/lumi-store";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Feed Lumi — one kind thing today" },
      {
        name: "description",
        content: "Lumi is hungry. Feed your fluffy friend one kind thing about yourself today.",
      },
      { property: "og:title", content: "Feed Lumi — one kind thing today" },
      {
        property: "og:description",
        content: "Write one thing you like about yourself and watch Lumi light up.",
      },
    ],
  }),
  component: FeedPage,
});

const prompts = [
  "one thing you like about your smile today",
  "one small thing you handled well today",
  "one part of your body that took care of you today",
  "one way you were kind without being asked",
];

function FeedPage() {
  const { feed, equipped } = useLumi();
  const [text, setText] = useState("");
  const [fed, setFed] = useState(false);
  const prompt = prompts[new Date().getDate() % prompts.length];

  function submit() {
    if (!text.trim()) return;
    addFeedEntry(text.trim());
    buzz([20, 40, 20]);
    setText("");
    setFed(true);
    window.setTimeout(() => setFed(false), 4000);
  }

  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col gap-4 py-4">
        <div className="text-center">
          <h1 className="font-display text-xl font-semibold">Lumi is hungry</h1>
          <p className="mt-1 text-sm text-muted-foreground">Feed him by writing {prompt}.</p>
        </div>

        <div className="grid place-items-center">
          <Lumi mood={fed ? "happy" : "idle"} size={180} hat={equipped.hat} face={equipped.face} />
        </div>

        {fed ? (
          <p className="animate-soft-rise text-center text-sm font-medium text-primary">
            Yum. You just gave us both something good. +5 ♡
          </p>
        ) : null}

        <div className="glass-card rounded-3xl p-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Today I like…"
            className="w-full resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={submit}
            className="mt-2 min-h-[52px] w-full rounded-full bg-primary px-6 font-display font-semibold text-primary-foreground transition-transform active:scale-95"
          >
            Feed Lumi
          </button>
        </div>

        {feed.length ? (
          <div className="space-y-2 pb-4">
            <p className="text-xs font-semibold text-muted-foreground">Things you've fed him</p>
            {feed.slice(0, 12).map((e) => (
              <div key={e.id} className="glass-card rounded-2xl px-4 py-3 text-sm">
                {e.text}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </PhoneFrame>
  );
}
