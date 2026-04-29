import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  ExternalLink,
  Upload,
  ChevronRight,
  CircleCheck,
  AlertTriangle,
} from "lucide-react";
import Navbar from "../(public)/_components/Navbar";
import Footer from "../(public)/_components/Footer";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { QuickAddDialog } from "./_components/QuickAddDialog";
import { ScoreDialog } from "./_components/ScoreDialog";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;
  // const name = session?.user.name;
  const email = session?.user.email;
  // const image = session?.user.image;
  // const createdAt = session?.user.createdAt;

  if (!userId) {
    return;
  }

  const result = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      subscription: {
        select: {
          // id: true,
          plan: true,
          status: true,
          razorpaySubscriptionId: true,
          currentPeriodEnd: true,
          createdAt: true,
        },
      },
      scores: {
        select: {
          // id: true,
          value: true,
          date: true,
        },
      },
      userCharity: {
        select: {
          // id:true,
          contributionPercent: true,
          charityId: true,
        },
      },
      charityContribs: {
        select: {
          amount: true,
          cycle: true,
          charityId: true,
        },
      },
      drawEntries: {
        select: {
          scores: true,
          matchCount: true,
          tier: true,
          prizeAmount: true,
          drawId: true,
        },
      },
    },
  });
  if (!result) {
    return;
  }

  console.log(result?.subscription?.status.toLowerCase());

  const subscription = {
    status: result?.subscription?.status.toLowerCase(),
    renewalDate: result?.subscription?.currentPeriodEnd?.toLocaleDateString(
      "default",
      { year: "numeric", month: "long", day: "numeric" },
    ),
  };

  const scores = result.scores;
  console.log(result.drawEntries);

  const currentDraw = {
    status: "Eligible",
    entries: 5,
    nextDraw: "31 March 2026",
  };

  const winningsTotal = 4200; // £
  const pendingVerifications = 1;

  const charity = {
    name: "Mindful Youth UK",
    contributionPercent: 18,
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0B0B0C] text-white pt-10">
        <div className="min-h-screen bg-[#0B0B0C] text-white px-4 py-6 md:py-10 max-w-7xl mx-auto space-y-6">
          <div
            className={`rounded-2xl border px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
              subscription.status === "active"
                ? "bg-emerald-950/30 border-emerald-500/30"
                : "bg-amber-950/30 border-amber-500/30"
            }`}
          >
            <div className="flex items-center gap-3">
              {subscription.status === "active" ? (
                <CircleCheck className="h-5 w-5 text-emerald-400" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-400" />
              )}
              <div>
                <p className="font-medium">
                  {subscription.status === "active"
                    ? "Your subscription is active"
                    : "Your subscription has lapsed"}
                </p>
                <p className="text-sm text-white/60">
                  {subscription.status === "active"
                    ? `Renews: ${subscription.renewalDate}`
                    : "Renew to keep participating in draws"}
                </p>
              </div>
            </div>
            {subscription.status === "lapsed" && (
              <Button className="bg-primary text-black hover:bg-[#f1b55d] rounded-full">
                Renew Now
              </Button>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">Dashboard</h1>
              <p className="text-white/60 mt-1">
                Your activity, impact, and draw status in one place
              </p>
            </div>
            {/* <Link href="/dashboard/scores">
              <Button className="bg-primary text-black hover:bg-[#f1b55d] rounded-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Score
              </Button>
            </Link> */}
            <ScoreDialog userId={userId} />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* score crrd */}
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Your Scores</h2>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/10 text-white">Last 5</Badge>
                      {/* <Link href="/dashboard/scores">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Quick Add
                        </Button>
                      </Link> */}
                      <QuickAddDialog userId={userId} />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-5 gap-3">
                    {scores.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-white/10 bg-black/20 p-3 text-center"
                      >
                        <p className="text-xs text-white/50">
                          {String(
                            s.date.toLocaleString("default", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }),
                          )}
                        </p>
                        <p className="text-lg font-semibold mt-1">{s.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* DRAW PARTICIPATION CARD */}
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Current Draw</h2>
                    <Link href="/dashboard/draw">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-[#f1b55d]"
                      >
                        View details
                        <ExternalLink className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-white/10 p-4">
                      <p className="text-sm text-white/60">Status</p>
                      <p className="mt-2 font-semibold">{currentDraw.status}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 p-4">
                      <p className="text-sm text-white/60">Entries</p>
                      <p className="mt-2 font-semibold">
                        {currentDraw.entries} scores
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 p-4">
                      <p className="text-sm text-white/60">Next draw</p>
                      <p className="mt-2 font-semibold">
                        {currentDraw.nextDraw}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WINNINGS OVERVIEW CARD */}
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Winnings</h2>
                    <Link href="/dashboard/winnings">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/10 bg-white/5 text-white"
                      >
                        <Upload className="mr-1 h-4 w-4" />
                        Upload proof
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm text-white/60">Total won</p>
                      <p className="mt-1 text-2xl font-semibold text-primary">
                        £{winningsTotal.toLocaleString()}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm text-white/60">Verifications</p>
                      <p className="mt-1 text-2xl font-semibold">
                        {pendingVerifications}{" "}
                        <span className="text-base font-normal text-white/60">
                          pending
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* recent winnings list */}
                  <div className="mt-5 space-y-2">
                    {[
                      {
                        draw: "March Draw",
                        match: "4 Match",
                        prize: "£2,100",
                        status: "Pending",
                      },
                      {
                        draw: "February Draw",
                        match: "3 Match",
                        prize: "£650",
                        status: "Paid",
                      },
                    ].map((w, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border border-white/10 rounded-xl p-3"
                      >
                        <div>
                          <p className="font-medium">{w.draw}</p>
                          <p className="text-sm text-white/60">{w.match}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            {w.prize}
                          </p>
                          <p className="text-xs text-white/50">{w.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/dashboard/winnings"
                    className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
                  >
                    View all winnings
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* --- RIGHT COLUMN --- */}
            <div className="space-y-6">
              {/* SUBSCRIPTION / BILLING CARD */}
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Billing</h3>
                  <p className="mt-2 text-sm text-white/60">
                    {subscription.status === "active"
                      ? `Active • Renews ${subscription.renewalDate}`
                      : "Inactive"}
                  </p>

                  <Button
                    variant="outline"
                    className="mt-4 w-full border-white/10 bg-white/5 text-white"
                    //asChild
                  >
                    <Link href="/coming-soon">Manage billing</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* CHARITY CARD */}
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Your Charity</h3>
                  <p className="mt-2 font-medium">{charity.name}</p>
                  <p className="text-sm text-white/60">
                    {charity.contributionPercent}% contribution
                  </p>

                  <Button
                    variant="outline"
                    className="mt-4 w-full border-white/10 bg-white/5 text-white"
                    // asChild
                  >
                    <Link href="/dashboard/charity">Change charity</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* IMPACT CARD */}
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold">Your Impact</h3>
                  <p className="mt-2 text-3xl font-semibold text-primary">
                    £128
                  </p>
                  <p className="text-sm text-white/60">Total contributed</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
