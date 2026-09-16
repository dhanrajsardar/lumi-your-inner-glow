import { createFileRoute } from "@tanstack/react-router";

import { Lumi } from "@/components/Lumi";
import { PhoneFrame } from "@/components/PhoneFrame";
import { buyItem, buzz, toggleEquip, useLumi, type LumiSlot } from "@/lib/lumi-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/room")({
  head: () => ({
    meta: [
      { title: "Lumi's room — spend your Love Coins" },
      {
        name: "description",
        content:
          "Every kind thing you do earns Love Coins. Spend them on soft little things for Lumi.",
      },
      { property: "og:title", content: "Lumi's room — spend your Love Coins" },
      {
        property: "og:description",
        content: "Hats, glasses and warm skies for your fluffy friend.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoomPage,
});

const items: { id: string; name: string; price: number; slot: LumiSlot; icon: string }[] = [
  { id: "beanie", name: "Soft beanie", price: 15, slot: "hat", icon: "🧢" },
  { id: "crown", name: "Tiny crown", price: 25, slot: "hat", icon: "👑" },
  { id: "bow", name: "Sweet bow", price: 12, slot: "hat", icon: "🎀" },
  { id: "headphones", name: "Cozy headphones", price: 25, slot: "hat", icon: "🎧" },
  { id: "glasses", name: "Round glasses", price: 20, slot: "face", icon: "👓" },
  { id: "scarf", name: "Warm scarf", price: 18, slot: "outfit", icon: "🧣" },
  { id: "hoodie", name: "Frog hoodie", price: 30, slot: "outfit", icon: "🐸" },
  { id: "blanket", name: "Hug blanket", price: 22, slot: "outfit", icon: "🩷" },
  { id: "heart-sticker", name: "Heart sticker", price: 8, slot: "accessory", icon: "💗" },
  { id: "star-sticker", name: "Glow star", price: 8, slot: "accessory", icon: "⭐" },
];

function RoomPage() {
  const { coins, owned, equipped } = useLumi();

  return (
    <PhoneFrame>
      <div className="flex min-h-full flex-col gap-4 py-4">
        <div className="text-center">
          <h1 className="font-display text-xl font-semibold">Lumi's room</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You have {coins} Love Coins. Kindness earns them.
          </p>
        </div>

        <div className="glass-card grid min-h-52 place-items-center rounded-3xl py-4">
          <Lumi
            mood="proud"
            size={205}
            hat={equipped.hat}
            face={equipped.face}
            outfit={equipped.outfit}
            accessory={equipped.accessory}
          />
        </div>

        <div className="space-y-2 pb-4">
          {items.map((item) => {
            const has = owned.includes(item.id);
            const on = equipped[item.slot] === item.id;
            return (
              <div
                key={item.id}
                className="glass-card grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-4 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-xl" aria-hidden>
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {has ? "Yours" : `${item.price} ♡`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    buzz(15);
                    if (has) toggleEquip(item.id, item.slot);
                    else buyItem(item.id, item.price, item.slot);
                  }}
                  disabled={!has && coins < item.price}
                  className={cn(
                    "min-h-[44px] shrink-0 rounded-full px-5 text-xs font-semibold transition-transform active:scale-95",
                    has
                      ? on
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground disabled:opacity-40",
                  )}
                >
                  {has ? (on ? "Wearing" : "Wear") : "Buy"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </PhoneFrame>
  );
}
