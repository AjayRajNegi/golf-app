import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  Heart,
  LucideIcon,
  Play,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { label: "Total donated", value: "£248,900", icon: Heart },
  { label: "Active members", value: "12,480", icon: Users },
  { label: "Current jackpot", value: "£31,250", icon: Trophy },
];

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="border-white/10 bg-white/5 text-white shadow-2xl shadow-black/20 backdrop-blur-md ">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Main() {
  return (
    <main className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10 mt-15">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Badge className="mb-6 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-primary hover:bg-primary/10">
            <BadgeCheck className="mr-2 h-4 w-4" />A more meaningful way to
            compete
          </Badge>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Play golf.
            <span className="block text-primary">Support a cause.</span>
            Win with purpose.
          </motion.h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            A subscription-first platform where every score you enter helps fund
            a charity, powers a rolling prize draw, and turns participation into
            measurable impact.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="rounded-full bg-primary px-7 text-black hover:bg-[#f1b55d]"
            >
              Start your journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/12 bg-white/5 px-7 text-white hover:bg-white/10 hover:text-white"
            >
              <Play className="mr-2 h-4 w-4" />
              See how it works
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 blur-2xl" />
          <Card className="overflow-hidden border-white/10 bg-white/6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <CardHeader className="space-y-4 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center justify-between">
                <Badge className="rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/10">
                  Live impact
                </Badge>
                <div className="flex items-center gap-2 text-sm text-white/55">
                  <Globe2 className="h-4 w-4" />
                  Updated this month
                </div>
              </div>
              <CardTitle className="text-2xl text-white">
                Your membership at a glance
              </CardTitle>
              <CardDescription className="text-white/60">
                A dashboard-style preview of donation, draw status, and
                winnings.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-white/50">Current jackpot</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-secondary">
                    £31,250
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    5-match tier carries 40% and can roll over.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-white/50">Charity share</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-secondary">
                    10%+
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    Subscribers can voluntarily increase contributions.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-medium text-secondary">
                    Rolling score window
                  </p>
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-white/10 text-white hover:bg-white/10"
                  >
                    5 active scores
                  </Badge>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[39, 41, 37, 45, 42].map((score, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center "
                    >
                      <p className="text-[11px] uppercase tracking-[0.25em] text-white/45 ">
                        D{index + 1}
                      </p>
                      <p className="mt-2 text-xl font-semibold text-secondary">
                        {score}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-white/50">Selected charity</p>
                  <p className="mt-2 text-lg font-semibold text-secondary">
                    Mindful Youth UK
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    Contribution set to 18% of membership.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-white/50">Draw status</p>
                  <p className="mt-2 text-lg font-semibold text-secondary">
                    Eligible this month
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    One entry per date, no duplicates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
