"use client";

import React from "react";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CreditCard,
  Download,
  Eye,
  FileImage,
  Filter,
  Heart,
  LifeBuoy,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const kpis = [
  {
    label: "Total users",
    value: "12,480",
    delta: "+14.2%",
    icon: Users,
  },
  {
    label: "Active subscribers",
    value: "9,302",
    delta: "+8.6%",
    icon: BadgeCheck,
  },
  {
    label: "Current jackpot",
    value: "£31,250",
    delta: "+£4,120",
    icon: Trophy,
  },
  {
    label: "Total donated",
    value: "£248,900",
    delta: "+£19,830",
    icon: Heart,
  },
  {
    label: "Pending verifications",
    value: "18",
    delta: "6 urgent",
    icon: CircleAlert,
  },
  {
    label: "Published draws",
    value: "42",
    delta: "1 this month",
    icon: CalendarDays,
  },
];

const recentActivity = [
  {
    title: "New subscriber signed up",
    detail: "Aisha K. joined with monthly plan and selected Mindful Youth UK.",
    time: "3 min ago",
    type: "signup",
  },
  {
    title: "Winner proof uploaded",
    detail: "March 2026 4-match winner submitted screenshot for verification.",
    time: "18 min ago",
    type: "verification",
  },
  {
    title: "Draw published",
    detail: "April 2026 draw is now live and winners were notified.",
    time: "41 min ago",
    type: "draw",
  },
  {
    title: "Charity updated",
    detail: "Food For All Network description and logo were refreshed.",
    time: "2 hrs ago",
    type: "charity",
  },
];

const users = [
  {
    name: "Sophie Turner",
    email: "sophie@example.com",
    status: "Active",
    plan: "Yearly",
    charity: "Green Future Trust",
    score: "42",
  },
  {
    name: "Aamir Patel",
    email: "aamir@example.com",
    status: "Active",
    plan: "Monthly",
    charity: "Mindful Youth UK",
    score: "39",
  },
  {
    name: "Noah Kim",
    email: "noah@example.com",
    status: "Past due",
    plan: "Monthly",
    charity: "Food For All Network",
    score: "37",
  },
  {
    name: "Maya Singh",
    email: "maya@example.com",
    status: "Active",
    plan: "Yearly",
    charity: "Mindful Youth UK",
    score: "45",
  },
];

const draws = [
  {
    month: "April 2026",
    status: "Draft",
    pool: "£34,500",
    entries: "8,902",
    published: false,
  },
  {
    month: "March 2026",
    status: "Published",
    pool: "£31,250",
    entries: "8,644",
    published: true,
  },
  {
    month: "February 2026",
    status: "Simulated",
    pool: "£29,800",
    entries: "8,301",
    published: false,
  },
];

const charities = [
  {
    name: "Green Future Trust",
    active: true,
    contribs: "3,402",
    raised: "£84,200",
    share: "34%",
  },
  {
    name: "Mindful Youth UK",
    active: true,
    contribs: "2,811",
    raised: "£61,750",
    share: "28%",
  },
  {
    name: "Food For All Network",
    active: true,
    contribs: "4,120",
    raised: "£102,950",
    share: "38%",
  },
];

const winners = [
  {
    name: "Liam Carter",
    tier: "5 Match",
    draw: "March 2026",
    amount: "£12,000",
    proof: "Pending",
    paid: "No",
  },
  {
    name: "Zara Khan",
    tier: "4 Match",
    draw: "March 2026",
    amount: "£2,100",
    proof: "Approved",
    paid: "Yes",
  },
  {
    name: "Ethan Moore",
    tier: "3 Match",
    draw: "February 2026",
    amount: "£375",
    proof: "Rejected",
    paid: "No",
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    "Past due": "bg-amber-500/10 text-amber-300 border-amber-500/20",
    Draft: "bg-slate-500/10 text-slate-300 border-slate-500/20",
    Simulated: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    Published: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    Pending: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    Approved: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    Rejected: "bg-rose-500/10 text-rose-300 border-rose-500/20",
    Yes: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    No: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  };

  return (
    <Badge
      className={`border ${map[status] ?? "bg-white/10 text-white border-white/10"} rounded-full`}
    >
      {status}
    </Badge>
  );
}

function SectionTitle({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
      </div>
      {action}
    </div>
  );
}

export default function AdminPage() {
  toast.error("Not usable currently, in development.");
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/20 backdrop-blur md:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Sparkles className="h-5 w-5 text-[#F6C177]" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                  Admin Control Centre
                </p>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Operations Dashboard
                </h1>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="relative w-full sm:w-[280px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <Input
                  placeholder="Search users, draws, charities, winners..."
                  className="h-11 border-white/10 bg-black/20 pl-9 text-white placeholder:text-white/35"
                />
              </div>
              <Button
                variant="outline"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button
                variant="outline"
                className="border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button className="bg-[#F6C177] text-black hover:bg-[#f1b55d]">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Publish updates
              </Button>
            </div>
          </div>

          <Separator className="my-6 bg-white/10" />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {kpis.map((item) => (
              <Card
                key={item.label}
                className="border-white/10 bg-white/[0.04] shadow-xl shadow-black/10"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6C177]/10 text-[#F6C177]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <Badge className="rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                      {item.delta}
                    </Badge>
                  </div>
                  <p className="mt-5 text-sm text-white/55">{item.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">
                    {item.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="mt-8">
            <TabsList className="grid h-auto w-full grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1 md:grid-cols-4">
              <TabsTrigger
                value="overview"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Users
              </TabsTrigger>
              <TabsTrigger
                value="draws"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Draws
              </TabsTrigger>
              <TabsTrigger
                value="winners"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Winners
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
                <Card className="border-white/10 bg-white/[0.04] shadow-xl shadow-black/10">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Recent activity</CardTitle>
                    <CardDescription className="text-white/60">
                      Live operational events, signups, draws, and verification
                      actions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5">
                            {item.type === "signup" && (
                              <Users className="h-4 w-4 text-[#F6C177]" />
                            )}
                            {item.type === "verification" && (
                              <FileImage className="h-4 w-4 text-[#F6C177]" />
                            )}
                            {item.type === "draw" && (
                              <Trophy className="h-4 w-4 text-[#F6C177]" />
                            )}
                            {item.type === "charity" && (
                              <Heart className="h-4 w-4 text-[#F6C177]" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="mt-1 text-sm leading-6 text-white/60">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                        <p className="shrink-0 text-xs text-white/35">
                          {item.time}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/[0.04] shadow-xl shadow-black/10">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">
                      Operational health
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      High-level indicators for revenue, payout and verification
                      flow.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm text-white/60">
                          Subscription fulfilment
                        </p>
                        <p className="text-sm font-medium">92%</p>
                      </div>
                      <Progress value={92} className="h-2 bg-white/10" />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm text-white/60">
                          Payout completion
                        </p>
                        <p className="text-sm font-medium">84%</p>
                      </div>
                      <Progress value={84} className="h-2 bg-white/10" />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm text-white/60">
                          Verification backlog
                        </p>
                        <p className="text-sm font-medium">18</p>
                      </div>
                      <Progress value={38} className="h-2 bg-white/10" />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Button className="bg-[#F6C177] text-black hover:bg-[#f1b55d]">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Open analytics
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                      >
                        <Settings2 className="mr-2 h-4 w-4" />
                        Platform settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-white/10 bg-white/[0.04] shadow-xl shadow-black/10">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">Quick actions</CardTitle>
                      <CardDescription className="text-white/60">
                        Fast access to the most common admin workflows.
                      </CardDescription>
                    </div>
                    <Badge className="rounded-full border border-white/10 bg-white/5 text-white">
                      MVP ready
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {[
                      {
                        title: "Create draw",
                        desc: "Configure a new monthly draw",
                        icon: Trophy,
                      },
                      {
                        title: "Add charity",
                        desc: "Create or update a charity profile",
                        icon: Heart,
                      },
                      {
                        title: "Review winners",
                        desc: "Approve proof uploads and payouts",
                        icon: FileImage,
                      },
                      {
                        title: "Manage users",
                        desc: "Edit scores, plans and access",
                        icon: Users,
                      },
                    ].map((item) => (
                      <button
                        key={item.title}
                        className="group rounded-3xl border border-white/10 bg-black/20 p-5 text-left transition hover:border-[#F6C177]/30 hover:bg-white/5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F6C177]/10 text-[#F6C177]">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <ChevronRight className="h-4 w-4 text-white/35 transition group-hover:translate-x-0.5" />
                        </div>
                        <p className="mt-4 font-medium">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-white/60">
                          {item.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
                <Card className="border-white/10 bg-white/[0.04] shadow-xl shadow-black/10">
                  <CardHeader className="pb-4">
                    <SectionTitle
                      title="Users"
                      description="Manage subscriptions, scores, charity choices, and account state."
                      action={
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Select defaultValue="all">
                            <SelectTrigger className="w-full sm:w-[160px] border-white/10 bg-black/20 text-white">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All users</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="past-due">Past due</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select defaultValue="recent">
                            <SelectTrigger className="w-full sm:w-[160px] border-white/10 bg-black/20 text-white">
                              <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="recent">
                                Recently active
                              </SelectItem>
                              <SelectItem value="name">Name</SelectItem>
                              <SelectItem value="score">
                                Highest score
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      }
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                      <Table>
                        <TableHeader className="bg-white/[0.03]">
                          <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-white/60">
                              User
                            </TableHead>
                            <TableHead className="text-white/60">
                              Plan
                            </TableHead>
                            <TableHead className="text-white/60">
                              Status
                            </TableHead>
                            <TableHead className="text-white/60">
                              Charity
                            </TableHead>
                            <TableHead className="text-white/60">
                              Top score
                            </TableHead>
                            <TableHead className="text-right text-white/60">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow
                              key={user.email}
                              className="border-white/10 hover:bg-white/[0.03]"
                            >
                              <TableCell>
                                <div>
                                  <p className="font-medium text-white">
                                    {user.name}
                                  </p>
                                  <p className="text-sm text-white/50">
                                    {user.email}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell>{user.plan}</TableCell>
                              <TableCell>
                                <StatusBadge status={user.status} />
                              </TableCell>
                              <TableCell>{user.charity}</TableCell>
                              <TableCell>{user.score}</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="ghost"
                                  className="h-8 px-3 text-white hover:bg-white/10"
                                >
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/[0.04] shadow-xl shadow-black/10">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">User tools</CardTitle>
                    <CardDescription className="text-white/60">
                      Fast-access controls for account and score management.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Edit user profile",
                      "Update score history",
                      "Cancel / restore subscription",
                      "Resend verification email",
                      "Change charity selection",
                      "Reset password",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                      >
                        <span className="text-sm text-white/75">{item}</span>
                        <ChevronRight className="h-4 w-4 text-white/35" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="draws" className="mt-6">
              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <Card className="border-white/10 bg-white/[0.04] shadow-xl shadow-black/10">
                  <CardHeader className="pb-4">
                    <SectionTitle
                      title="Draws"
                      description="Configure, simulate, and publish monthly draw results."
                      action={
                        <Button className="bg-[#F6C177] text-black hover:bg-[#f1b55d]">
                          Create new draw
                        </Button>
                      }
                    />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {draws.map((draw) => (
                      <div
                        key={draw.month}
                        className="rounded-3xl border border-white/10 bg-black/20 p-5"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-semibold">
                                {draw.month}
                              </h3>
                              <StatusBadge status={draw.status} />
                              {draw.published && (
                                <Badge className="rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                                  Live
                                </Badge>
                              )}
                            </div>
                            <p className="mt-2 text-sm text-white/60">
                              Pool {draw.pool} · {draw.entries} entries
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                            >
                              Simulate
                            </Button>
                            <Button
                              variant="outline"
                              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                            >
                              Publish
                            </Button>
                            <Button
                              variant="ghost"
                              className="text-white hover:bg-white/10"
                            >
                              View
                            </Button>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3 md:grid-cols-3">
                          {[
                            { label: "5-match share", value: "40%" },
                            { label: "4-match share", value: "35%" },
                            { label: "3-match share", value: "25%" },
                          ].map((tier) => (
                            <div
                              key={tier.label}
                              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                            >
                              <p className="text-sm text-white/55">
                                {tier.label}
                              </p>
                              <p className="mt-2 text-2xl font-semibold">
                                {tier.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/[0.04] shadow-xl shadow-black/10">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">Draw controls</CardTitle>
                    <CardDescription className="text-white/60">
                      Logic, verification, and publishing workflow.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      {
                        label: "Random vs algorithmic",
                        icon: SlidersHorizontal,
                      },
                      { label: "Run simulation", icon: Activity },
                      { label: "Preview winner list", icon: Eye },
                      { label: "Notify winners", icon: Bell },
                      { label: "Mark draw as published", icon: CheckCircle2 },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 text-[#F6C177]" />
                          <span className="text-sm text-white/75">
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-white/35" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="winners" className="mt-6">
              <div className="grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
                <Card className="border-white/10 bg-white/[0.04] shadow-xl shadow-black/10">
                  <CardHeader className="pb-4">
                    <SectionTitle
                      title="Winners"
                      description="Review screenshot proof, approve payouts, and track payment status."
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                      <Table>
                        <TableHeader className="bg-white/[0.03]">
                          <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-white/60">
                              Winner
                            </TableHead>
                            <TableHead className="text-white/60">
                              Tier
                            </TableHead>
                            <TableHead className="text-white/60">
                              Draw
                            </TableHead>
                            <TableHead className="text-white/60">
                              Amount
                            </TableHead>
                            <TableHead className="text-white/60">
                              Proof
                            </TableHead>
                            <TableHead className="text-white/60">
                              Paid
                            </TableHead>
                            <TableHead className="text-right text-white/60">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {winners.map((winner) => (
                            <TableRow
                              key={`${winner.name}-${winner.draw}`}
                              className="border-white/10 hover:bg-white/[0.03]"
                            >
                              <TableCell className="font-medium">
                                {winner.name}
                              </TableCell>
                              <TableCell>{winner.tier}</TableCell>
                              <TableCell>{winner.draw}</TableCell>
                              <TableCell className="text-[#F6C177]">
                                {winner.amount}
                              </TableCell>
                              <TableCell>
                                <StatusBadge status={winner.proof} />
                              </TableCell>
                              <TableCell>
                                <StatusBadge status={winner.paid} />
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    className="h-8 px-3 text-white hover:bg-white/10"
                                  >
                                    Review
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    className="h-8 px-3 text-white hover:bg-white/10"
                                  >
                                    Mark paid
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/[0.04] shadow-xl shadow-black/10">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">
                      Verification queue
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      The next actions needed to complete winner processing.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { label: "View proof screenshot", icon: FileImage },
                      { label: "Approve or reject", icon: BadgeCheck },
                      { label: "Send payout confirmation", icon: CreditCard },
                      { label: "Add internal note", icon: LifeBuoy },
                      { label: "Escalate to admin", icon: CircleAlert },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 text-[#F6C177]" />
                          <span className="text-sm text-white/75">
                            {item.label}
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-white/35" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <Card className="border-white/10 bg-white/[0.04] shadow-xl shadow-black/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Charities</CardTitle>
                <CardDescription className="text-white/60">
                  Manage charity listings, active state, and contribution
                  distribution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {charities.map((charity) => (
                    <div
                      key={charity.name}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div>
                        <p className="font-medium">{charity.name}</p>
                        <p className="mt-1 text-sm text-white/55">
                          {charity.contribs} contributions · {charity.raised}{" "}
                          raised
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                          {charity.share}
                        </Badge>
                        <Button
                          variant="ghost"
                          className="h-8 px-3 text-white hover:bg-white/10"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.04] shadow-xl shadow-black/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Analytics preview</CardTitle>
                <CardDescription className="text-white/60">
                  Future-ready chart space for Phase 2 reporting.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    label: "Monthly donations",
                    value: "£19,830",
                    trend: "+12%",
                  },
                  { label: "Retention rate", value: "78%", trend: "+4%" },
                  {
                    label: "Average score submissions",
                    value: "4.8 / user",
                    trend: "+0.6",
                  },
                  {
                    label: "Payout completion time",
                    value: "36 hrs",
                    trend: "-8 hrs",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-white/55">{item.label}</p>
                      <Badge className="rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">
                        {item.trend}
                      </Badge>
                    </div>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">
                      {item.value}
                    </p>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Open detailed analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
