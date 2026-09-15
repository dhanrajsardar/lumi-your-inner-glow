import { cn } from "@/lib/utils";

export type LumiMood =
  | "idle"
  | "happy"
  | "love"
  | "proud"
  | "surprised"
  | "sleepy"
  | "eat"
  | "hug"
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
  outfit?: string | undefined;
  accessory?: string | undefined;
  className?: string | undefined;
};

const moodAnimation: Record<LumiMood, string> = {
  idle: "animate-lumi-float",
  happy: "animate-lumi-dance",
  love: "animate-lumi-breathe",
  proud: "animate-lumi-proud",
  surprised: "animate-lumi-pop",
  sleepy: "animate-lumi-sink",
  eat: "animate-lumi-chew",
  hug: "animate-lumi-hug",
  close: "animate-lumi-approach",
  sad: "animate-lumi-sink",
  lonely: "animate-lumi-lean",
  anxious: "animate-lumi-breathe",
  shy: "animate-lumi-sink",
  shrug: "animate-lumi-lean",
};

export function Lumi({
  mood = "idle",
  size = 220,
  hat,
  face,
  outfit,
  accessory,
  className,
}: Props) {
  const closedEyes = mood === "happy" || mood === "love" || mood === "hug" || mood === "shy";
  const teary = mood === "sad" || mood === "lonely";

  return (
    <div
      className={cn("relative grid place-items-center", moodAnimation[mood], className)}
      style={{ width: size, height: size * 0.82 }}
      aria-hidden
    >
      <div className="lumi-glow" />
      <svg viewBox="0 0 200 164" width={size} height={size * 0.82} className="relative overflow-visible">
        <path
          className="lumi-body"
          d="M18 132C8 86 32 44 60 36C62 12 74 8 86 44C100 10 112 12 118 40c24 14 32 44 36 70 3 20 16 25 25 13 10-14 22-3 17 15-6 21-38 29-70 27H42c-13 0-21-6-24-14Z"
        />

        {outfit === "hoodie" ? (
          <g><path className="lumi-hoodie" d="M27 116q72 38 137-3l-5 46q-62 15-128 1z" /><circle className="lumi-hoodie-eye" cx="55" cy="124" r="5" /><circle className="lumi-hoodie-eye" cx="137" cy="122" r="5" /></g>
        ) : null}
        {outfit === "blanket" ? <path className="lumi-blanket" d="M24 107q72 35 141-3v55q-69 15-138 0z" /> : null}
        {outfit === "scarf" ? <g><path className="lumi-scarf" d="M48 111q49 17 98-2l3 17q-52 16-103 1z" /><path className="lumi-scarf" d="m126 123 22 37-19 2-13-37z" /></g> : null}

        {closedEyes ? (
          <g className="lumi-line" strokeWidth="5" strokeLinecap="round"><path d="M70 87q8 9 16 0" /><path d="M110 87q8 9 16 0" /></g>
        ) : mood === "sleepy" ? (
          <g className="lumi-line" strokeWidth="5" strokeLinecap="round"><path d="M70 91h16" /><path d="M110 91h16" /></g>
        ) : mood === "surprised" ? (
          <g className="lumi-eyes"><circle cx="78" cy="88" r="8" /><circle cx="118" cy="88" r="8" /></g>
        ) : (
          <g className="lumi-eyes"><ellipse cx="78" cy="88" rx="6" ry="7" /><ellipse cx="118" cy="88" rx="6" ry="7" /></g>
        )}

        <g className="lumi-whiskers" strokeWidth="4" strokeLinecap="round">
          <path d="M58 81 43 76" /><path d="M57 91H39" /><path d="m59 101-15 5" />
          <path d="m138 81 15-5" /><path d="M139 91h18" /><path d="m137 101 15 5" />
        </g>

        {mood === "eat" ? <ellipse className="lumi-mouth-open" cx="98" cy="109" rx="11" ry="14" /> : null}
        {mood === "surprised" ? <circle className="lumi-mouth" cx="98" cy="111" r="7" /> : null}
        {mood === "happy" || mood === "proud" ? <path className="lumi-line" strokeWidth="4" strokeLinecap="round" d="M88 108q10 12 20 0" /> : null}
        {mood === "anxious" ? <path className="lumi-line" strokeWidth="4" strokeLinecap="round" d="M88 113q10-8 20 0" /> : null}
        {mood === "love" || mood === "hug" ? (
          <g className="lumi-heart-wrap"><path className="lumi-heart" d="M98 134C72 117 77 97 91 100c5 1 7 7 7 7s3-6 8-7c14-3 19 17-8 34Z" /><path className="lumi-arm" d="M54 118q12 25 37 10M142 118q-12 25-37 10" /></g>
        ) : null}
        {teary ? <g className="lumi-tears"><path d="M76 99q-8 12 0 17 8-5 0-17ZM120 99q-8 12 0 17 8-5 0-17Z" /></g> : null}
        {mood === "shy" ? <g className="lumi-blush"><ellipse cx="65" cy="106" rx="10" ry="5" /><ellipse cx="131" cy="106" rx="10" ry="5" /></g> : null}

        {mood === "happy" || mood === "love" || mood === "proud" || mood === "hug" ? (
          <g className="lumi-sparkle"><path d="M166 40l4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" /><path d="M34 34l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" /></g>
        ) : null}

        {hat === "beanie" ? <g><path className="lumi-hat" d="M60 34c8-18 40-24 56-10 8 7 10 14 10 20-22-8-46-9-66-10Z" /><rect className="lumi-hat-band" x="56" y="40" width="74" height="10" rx="5" /></g> : null}
        {hat === "crown" ? <path className="lumi-crown" d="M64 34l10 12 14-16 12 16 12-14 6 20-56-4z" /> : null}
        {hat === "bow" ? <path className="lumi-bow" d="M91 42C74 24 69 48 88 51c-13 16 15 17 10-1 13 16 31-5 9-9-6-20-19-12-16 1Z" /> : null}
        {hat === "headphones" ? <g className="lumi-headphones"><path d="M55 72q4-48 43-48t45 48" /><rect x="47" y="68" width="17" height="32" rx="8" /><rect x="135" y="68" width="17" height="32" rx="8" /></g> : null}
        {face === "glasses" ? <g className="lumi-line"><circle cx="78" cy="88" r="13" fill="none" strokeWidth="4" /><circle cx="118" cy="88" r="13" fill="none" strokeWidth="4" /><path d="M91 88h14" strokeWidth="4" /></g> : null}
        {accessory === "heart-sticker" ? <path className="lumi-sticker" d="M127 122c-11-8-2-18 5-10 7-8 16 2 5 10l-5 4z" /> : null}
        {accessory === "star-sticker" ? <path className="lumi-star" d="m130 110 4 9 10 1-8 7 2 10-8-5-9 5 2-10-8-7 11-1z" /> : null}
      </svg>
    </div>
  );
}