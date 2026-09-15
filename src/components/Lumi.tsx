import { cn } from "@/lib/utils";

export type LumiMood =
  | "idle"
  | "happy"
  | "close"
  | "sad"
  | "lonely"
  | "anxious"
  | "shy"
  | "shrug";

type Props = {
  mood?: LumiMood | undefined;
  size?: number | undefined;
  hat?: string | undefined;
  face?: string | undefined;
  className?: string | undefined;
};

const moodAnimation: Record<LumiMood, string> = {
  idle: "animate-lumi-float",
  happy: "animate-lumi-dance",
  close: "animate-lumi-approach",
  sad: "animate-lumi-sink",
  lonely: "animate-lumi-lean",
  anxious: "animate-lumi-breathe",
  shy: "animate-lumi-sink",
  shrug: "animate-lumi-lean",
};

export function Lumi({ mood = "idle", size = 220, hat, face, className }: Props) {
  return (
    <div
      className={cn("relative grid place-items-center", moodAnimation[mood], className)}
      style={{ width: size, height: size * 0.82 }}
      aria-hidden
    >
      <div className="lumi-glow" />
      <svg viewBox="0 0 200 164" width={size} height={size * 0.82} className="relative">
        <path
          className="lumi-body"
          d="M18 132C8 86 34 34 68 28c6-10 12 6 20 10 7-5 13-20 22-11 30 9 40 44 44 74 3 20 16 25 25 13 10-14 22-3 17 15-6 21-38 29-70 27H42c-13 0-21-6-24-14Z"
        />
        {face === "glasses" ? (
          <g className="lumi-line">
            <circle cx="78" cy="88" r="13" fill="none" strokeWidth="4" />
            <circle cx="118" cy="88" r="13" fill="none" strokeWidth="4" />
            <path d="M91 88h14" strokeWidth="4" />
          </g>
        ) : null}
        <g className="lumi-eyes">
          <ellipse cx="78" cy="88" rx="7" ry="8" />
          <ellipse cx="118" cy="88" rx="7" ry="8" />
        </g>
        <g className="lumi-line" strokeWidth="6" strokeLinecap="round">
          <path d="M30 82h24" />
          <path d="M31 95l22 3" />
          <path d="M35 108l18-5" />
          <path d="M146 84h-22" />
          <path d="M145 97l-21 3" />
          <path d="M141 110l-18-5" />
        </g>
        {mood === "happy" ? (
          <g className="lumi-sparkle">
            <path d="M166 40l4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" />
            <path d="M34 34l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" />
          </g>
        ) : null}
        {hat === "beanie" ? (
          <g>
            <path
              className="lumi-hat"
              d="M60 34c8-18 40-24 56-10 8 7 10 14 10 20-22-8-46-9-66-10Z"
            />
            <rect className="lumi-hat-band" x="56" y="40" width="74" height="10" rx="5" />
          </g>
        ) : null}
        {hat === "crown" ? (
          <path className="lumi-hat-band" d="M64 34l10 12 14-16 12 16 12-14 6 20-56-4z" />
        ) : null}
      </svg>
    </div>
  );
}
