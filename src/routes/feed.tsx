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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  const [feeding, setFeeding] = useState<string | null>(null);
  const prompt = prompts[new Date().getDate() % prompts.length];

  function submit() {
    if (!text.trim()) return;
    const words = text.trim();
    setFeeding(words);
    buzz([20, 40, 20]);
    setText("");
    window.setTimeout(() => {
      addFeedEntry(words);
      setFeeding(null);
      setFed(true);
      buzz([18, 35, 18]);
      window.setTimeout(() => setFed(false), 4000);
    }, 1250);
  }

  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col gap-4 py-4">
        <div className="text-center">
          <h1 className="font-display text-xl font-semibold">Lumi is hungry</h1>
          <p className="mt-1 text-sm text-muted-foreground">Feed him by writing {prompt}.</p>
        </div>

        <div className="relative grid min-h-48 place-items-center overflow-visible">
          {feeding ? (
            <p className="animate-feed-words absolute bottom-1 z-10 max-w-52 text-center text-sm font-semibold text-primary">
              {feeding}
            </p>
          ) : null}
          <Lumi
            mood={feeding ? "eat" : fed ? "happy" : "idle"}
            size={190}
            hat={equipped.hat}
            face={equipped.face}
            outfit={equipped.outfit}
            accessory={equipped.accessory}
          />
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
              disabled={feeding !== null}
            className="mt-2 min-h-[52px] w-full rounded-full bg-primary px-6 font-display font-semibold text-primary-foreground transition-transform active:scale-95"
          >
              {feeding ? "Lumi is munching…" : "Feed Lumi"}
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
