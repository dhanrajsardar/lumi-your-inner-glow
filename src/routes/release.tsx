import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Lumi } from "@/components/Lumi";
import { PhoneFrame } from "@/components/PhoneFrame";
import { buzz, registerRelease, useLumi } from "@/lib/lumi-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/release")({
  head: () => ({
    meta: [
      { title: "Let it go — delete your inner critic" },
      {
        name: "description",
        content:
          "Type the thought that hurts, drag it into the black hole, and let Lumi remind you it was never your reality.",
      },
      { property: "og:title", content: "Let it go — delete your inner critic" },
      {
        property: "og:description",
        content: "A satisfying way to release the harsh voice in your head.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReleasePage,
});

function ReleasePage() {
  const { equipped, released } = useLumi();
  const [text, setText] = useState("");
  const [state, setState] = useState<"write" | "drag" | "gone">("write");
  const [over, setOver] = useState(false);

  function swallow() {
    setState("gone");
    buzz([40, 30, 120]);
    registerRelease();
    window.setTimeout(() => {
      setState("write");
      setText("");
      setOver(false);
    }, 4200);
  }

  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col gap-5 py-4">
        <div className="text-center">
          <h1 className="font-display text-xl font-semibold">Let it go</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Write the voice that's being unfair to you. Then drag it in.
          </p>
        </div>

        {state === "write" ? (
          <div className="glass-card rounded-3xl p-3">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              placeholder="e.g. I am a failure"
              className="w-full resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={() => text.trim() && setState("drag")}
              className="mt-2 min-h-[52px] w-full rounded-full bg-primary px-6 font-display font-semibold text-primary-foreground transition-transform active:scale-95"
            >
              Get it out of me
            </button>
          </div>
        ) : null}

        {state !== "write" ? (
          <div className="flex flex-1 flex-col items-center justify-between py-2">
            <div
              draggable={state === "drag"}
              onDragEnd={() => over && swallow()}
              onClick={() => state === "drag" && swallow()}
              className={cn(
                "glass-card max-w-[85%] cursor-grab rounded-2xl px-4 py-3 text-center text-sm",
                state === "gone" && "animate-swallow",
              )}
            >
              {text}
            </div>

            {state === "drag" ? (
              <p className="text-xs text-muted-foreground">Drag it into the hole (or tap it)</p>
            ) : null}

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setOver(true);
              }}
              onDragLeave={() => setOver(false)}
              onDrop={swallow}
              className={cn(
                "grid h-40 w-40 place-items-center rounded-full bg-[radial-gradient(circle,var(--lumi-ink)_25%,transparent_72%)] transition-transform",
                over && "scale-110",
              )}
            >
              <div className="animate-hole h-24 w-24 rounded-full border-4 border-dashed border-primary/40" />
            </div>

            {state === "gone" ? (
              <div className="animate-soft-rise text-center">
                <Lumi
                  mood="proud"
                  size={150}
                  hat={equipped.hat}
                  face={equipped.face}
                  outfit={equipped.outfit}
                  accessory={equipped.accessory}
                />
                <p className="mt-2 text-sm font-medium text-primary">
                  That wasn't your reality. It's gone now. +3 ♡
                </p>
              </div>
            ) : null}
          </div>
        ) : null}

        <p className="pb-4 text-center text-xs text-muted-foreground">
          {released} thought{released === 1 ? "" : "s"} released so far
        </p>
      </div>
    </PhoneFrame>
  );
}
