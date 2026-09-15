import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Home, Moon, Sparkles, Wind } from "lucide-react";
import type { ReactNode } from "react";

import { useLumi } from "@/lib/lumi-store";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/feed", label: "Feed", icon: Heart },
  { to: "/release", label: "Let go", icon: Wind },
  { to: "/room", label: "Room", icon: Sparkles },
  { to: "/nights", label: "Nights", icon: Moon },
] as const;

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Late night";
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  const { coins } = useLumi();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-secondary/60 p-0 sm:p-6">
      <div className="relative flex h-screen w-full max-w-[430px] flex-col overflow-hidden border-border bg-background shadow-[0_40px_80px_-40px_rgba(60,40,70,0.55)] sm:h-[900px] sm:max-h-[92vh] sm:rounded-[2.75rem] sm:border-8">
        <div className="soft-sky flex min-h-0 flex-1 flex-col">
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-6 pt-6 pb-2">
            <p className="min-w-0 truncate text-sm text-muted-foreground">{greeting()}</p>
            <span className="shrink-0 rounded-full bg-card/80 px-3 py-1 text-xs font-semibold text-primary">
              ♡ {coins}
            </span>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto px-6 pb-4">{children}</main>

          <nav className="glass-card m-3 grid grid-cols-5 gap-1 rounded-3xl p-2">
            {tabs.map(({ to, label, icon: Icon }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-semibold transition-colors",
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
