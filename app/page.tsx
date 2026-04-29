"use client";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Globe2,
  Heart,
  LucideIcon,
  Medal,
  Menu,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HowItWorks from "./(public)/_components/HowItWorks";
import Charities from "./(public)/_components/Charities";
import Pricing from "./(public)/_components/Pricing";
import Results from "./(public)/_components/Results";

const stats = [
  { label: "Total donated", value: "£248,900", icon: Heart },
  { label: "Active members", value: "12,480", icon: Users },
  { label: "Current jackpot", value: "£31,250", icon: Trophy },
];

const charities = [
  {
    name: "Green Future Trust",
    blurb:
      "Funding community-led environmental projects with measurable local impact.",
    impact: "£84,200 raised",
    accent: "From 10% contribution",
  },
  {
    name: "Mindful Youth UK",
    blurb:
      "Supporting accessible mental health resources for young people and families.",
    impact: "£61,750 raised",
    accent: "Member favourite",
  },
  {
    name: "Food For All Network",
    blurb:
      "Turning subscription energy into food relief, kitchens, and emergency support.",
    impact: "£102,950 raised",
    accent: "Fast-growing partner",
  },
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
    <Card className="border-white/10 bg-white/5 text-white shadow-2xl shadow-black/20 backdrop-blur-md">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
          <Icon className="h-5 w-5 text-[#F6C177]" />
        </div>
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(246,193,119,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_30%),linear-gradient(to_bottom,_rgba(255,255,255,0.03),_transparent_28%)]" />
        <div className="absolute left-1/2 top-[-8rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[#F6C177]/20 blur-3xl" />
        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8">
              <Sparkles className="h-5 w-5 text-[#F6C177]" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none">Impact Draw</p>
              <p className="text-xs text-white/45">
                Golf × Charity × Prize Pool
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>
            <a href="#charities" className="transition hover:text-white">
              Charities
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="#results" className="transition hover:text-white">
              Results
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/8 hover:text-white"
            >
              Log in
            </Button>
            <Button className="rounded-full bg-white px-5 text-black hover:bg-white/90">
              Start your journey
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </header>

        <main className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Badge className="mb-6 rounded-full border border-[#F6C177]/25 bg-[#F6C177]/10 px-4 py-1.5 text-[#F6C177] hover:bg-[#F6C177]/10">
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
                <span className="block text-[#F6C177]">Support a cause.</span>
                Win with purpose.
              </motion.h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                A subscription-first platform where every score you enter helps
                fund a charity, powers a rolling prize draw, and turns
                participation into measurable impact.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="rounded-full bg-[#F6C177] px-7 text-black hover:bg-[#f1b55d]"
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
                      <p className="mt-2 text-3xl font-semibold tracking-tight">
                        £31,250
                      </p>
                      <p className="mt-2 text-sm text-white/60">
                        5-match tier carries 40% and can roll over.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm text-white/50">Charity share</p>
                      <p className="mt-2 text-3xl font-semibold tracking-tight">
                        10%+
                      </p>
                      <p className="mt-2 text-sm text-white/60">
                        Subscribers can voluntarily increase contributions.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-medium">Rolling score window</p>
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
                          className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center"
                        >
                          <p className="text-[11px] uppercase tracking-[0.25em] text-white/45">
                            D{index + 1}
                          </p>
                          <p className="mt-2 text-xl font-semibold">{score}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm text-white/50">Selected charity</p>
                      <p className="mt-2 text-lg font-semibold">
                        Mindful Youth UK
                      </p>
                      <p className="mt-1 text-sm text-white/60">
                        Contribution set to 18% of membership.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm text-white/50">Draw status</p>
                      <p className="mt-2 text-lg font-semibold">
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
      </div>

      <HowItWorks />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card className="border-white/10 bg-white/[0.04] text-white shadow-xl shadow-black/10">
            <CardHeader>
              <CardTitle className="text-2xl">Prize pool breakdown</CardTitle>
              <CardDescription className="text-white/60">
                Clear, visual, and easy to understand: 5-match, 4-match,
                3-match.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6 pt-0">
              {[
                {
                  label: "5-match tier",
                  pct: "40%",
                  detail: "Jackpot share with rollover potential",
                },
                {
                  label: "4-match tier",
                  pct: "35%",
                  detail: "Strong mid-tier payout for consistency",
                },
                {
                  label: "3-match tier",
                  pct: "25%",
                  detail: "Keeps the draw rewarding for more members",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="space-y-2 rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-[#F6C177]">{item.pct}</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#F6C177]"
                      style={{ width: item.pct }}
                    />
                  </div>
                  <p className="text-sm text-white/60">{item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="border-white/10 bg-white/[0.04] text-white shadow-xl shadow-black/10">
              <CardHeader>
                <CardTitle className="text-2xl">Charity spotlight</CardTitle>
                <CardDescription className="text-white/60">
                  A refined editorial card system helps charities feel human and
                  credible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 pt-0">
                {charities.map((charity, index) => (
                  <div
                    key={charity.name}
                    className="rounded-3xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">
                            {charity.name}
                          </h3>
                          {index === 0 && (
                            <Badge className="rounded-full bg-[#F6C177]/10 text-[#F6C177] hover:bg-[#F6C177]/10">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/65">
                          {charity.blurb}
                        </p>
                      </div>
                      <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-white/35" />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-white/45">{charity.accent}</span>
                      <span className="font-medium text-white">
                        {charity.impact}
                      </span>
                    </div>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  className="mt-2 w-full justify-between rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  Explore all charities
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Pricing className="" />
      <Results />

      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-semibold">Impact Draw</p>
            <p className="mt-1 text-sm text-white/45">
              Play golf. Give back. Win with purpose.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/55">
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Charities
            </a>
            <a href="#" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
