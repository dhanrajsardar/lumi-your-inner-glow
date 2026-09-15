import { createFileRoute } from "@tanstack/react-router";

import { Lumi } from "@/components/Lumi";
import { PhoneFrame } from "@/components/PhoneFrame";
import { buyItem, buzz, toggleEquip, useLumi } from "@/lib/lumi-store";
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
    ],
  }),
  component: RoomPage,
});

const items = [
  { id: "beanie", name: "Soft beanie", price: 15, slot: "hat" as const },
  { id: "crown", name: "Tiny crown", price: 25, slot: "hat" as const },
  { id: "glasses", name: "Round glasses", price: 20, slot: "face" as const },
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

        <div className="glass-card grid place-items-center rounded-3xl py-4">
          <Lumi mood="idle" size={180} hat={equipped.hat} face={equipped.face} />
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
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {has ? "Yours" : `${item.price} ♡`}
                  </p>
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
