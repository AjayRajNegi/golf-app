"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
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
import Pricing from "./(public)/_components/Pricing";
import Results from "./(public)/_components/Results";
import Footer from "./(public)/_components/Footer";
import Navbar from "./(public)/_components/Navbar";
import Main from "./(public)/_components/Main";

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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(246,193,119,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_30%),linear-gradient(to_bottom,_rgba(255,255,255,0.03),_transparent_28%)]" />
        <div className="absolute left-1/2 top-[-8rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />

        <Navbar />
        <Main />
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
                    <p className="text-sm text-primary">{item.pct}</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-primary"
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
                            <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/10">
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
      <Footer />
    </div>
  );
}
