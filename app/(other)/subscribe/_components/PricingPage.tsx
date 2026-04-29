"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { SubscriptionButton } from "./SubscriptionButton";
import { Input } from "@/components/ui/input";
import Navbar from "@/app/(public)/_components/Navbar";
import Footer from "@/app/(public)/_components/Footer";

interface Charity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  website: string | null;
  featured: boolean;
  active: boolean;
}

const MONTHLY_PRICE = 12;
const YEARLY_PRICE = 99;

function CharityCard({
  charity,
  selected,
  onSelect,
}: {
  charity: Charity;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left rounded-xl border p-4 transition-all duration-200 cursor-pointer group",
        "bg-[var(--card)] text-[var(--card-foreground)]",
        selected
          ? "border-[var(--primary)] ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--background)]"
          : "border-[var(--border)] hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)]",
      )}
    >
      <div className="flex items-start gap-3">
        {charity.imageUrl ? (
          <img
            src={charity.imageUrl}
            alt={charity.name}
            className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
            <span className="text-[var(--accent-foreground)] text-sm font-semibold font-[var(--font-sans)]">
              {charity.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm font-[var(--font-sans)] text-[var(--foreground)] truncate">
              {charity.name}
            </span>
            {charity.featured && (
              <Badge
                variant="secondary"
                className="text-[10px] px-1.5 py-0 bg-[var(--accent)] text-[var(--accent-foreground)] border-0 flex-shrink-0"
              >
                Featured
              </Badge>
            )}
          </div>
          <p className="text-xs text-[var(--muted-foreground)] mt-0.5 line-clamp-2 font-[var(--font-sans)]">
            {charity.description}
          </p>
        </div>
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors duration-150",
            selected
              ? "border-[var(--primary)] bg-[var(--primary)]"
              : "border-[var(--border)] group-hover:border-[var(--primary)]",
          )}
        >
          {selected && (
            <svg viewBox="0 0 20 20" fill="white" className="w-full h-full">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}

function PlanCard({
  plan,
  price,
  yearlyPrice,
  charityPercent,
  charityAmount,
  userName,
  userEmail,
  charityId,
}: {
  plan: "MONTHLY" | "YEARLY";
  price: number;
  yearlyPrice: number;
  charityPercent: number;
  charityAmount: number;
  userName: string;
  userEmail: string;
  charityId: string;
}) {
  const isYearly = plan === "YEARLY";
  const monthlySavings = MONTHLY_PRICE * 12 - yearlyPrice;
  const displayPrice = isYearly
    ? (yearlyPrice / 12).toFixed(2)
    : price.toFixed(2);

  return (
    <Card
      className={cn(
        "relative flex-1 rounded-2xl overflow-hidden transition-all duration-200",
        "bg-[var(--card)] border-[var(--border)]",
        isYearly
          ? "border-[var(--primary)] shadow-[var(--shadow-lg)] ring-1 ring-[var(--primary)]"
          : "hover:border-[var(--primary)] hover:shadow-[var(--shadow-md)]",
      )}
    >
      {isYearly && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--primary)]" />
      )}
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] font-[var(--font-sans)]">
              {isYearly ? "Annual" : "Monthly"}
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-bold text-[var(--foreground)] font-[var(--font-sans)]">
                ${displayPrice}
              </span>
              <span className="text-sm text-[var(--muted-foreground)] font-[var(--font-sans)]">
                /mo
              </span>
            </div>
            {isYearly && (
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5 font-[var(--font-sans)]">
                Billed ${yearlyPrice}/year
              </p>
            )}
          </div>
          {isYearly && (
            <Badge className="bg-[var(--primary)] text-[var(--primary-foreground)] border-0 text-xs px-2 py-0.5">
              Save ${monthlySavings}
            </Badge>
          )}
        </div>

        <div className="border-t border-[var(--border)] pt-4 mb-5">
          <div className="flex items-center gap-2 py-1.5">
            <div className="w-4 h-4 rounded-full bg-[var(--accent)] flex items-center justify-center">
              <svg viewBox="0 0 16 16" className="w-2.5 h-2.5" fill="none">
                <path
                  d="M8 3.5C8 3.5 4 6 4 9C4 11.2 5.8 13 8 13C10.2 13 12 11.2 12 9C12 6 8 3.5 8 3.5Z"
                  fill="var(--accent-foreground)"
                />
              </svg>
            </div>
            <span className="text-sm text-[var(--foreground)] font-[var(--font-sans)]">
              <span className="font-semibold text-[var(--primary)]">
                {charityPercent}%
              </span>{" "}
              donated to charity
            </span>
          </div>
          <div className="flex items-center gap-2 py-1.5">
            <div className="w-4 h-4 rounded-full bg-[var(--accent)] flex items-center justify-center">
              <svg
                viewBox="0 0 16 16"
                className="w-2.5 h-2.5"
                fill="var(--accent-foreground)"
              >
                <path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z" />
              </svg>
            </div>
            <span className="text-sm text-[var(--foreground)] font-[var(--font-sans)]">
              ${charityAmount.toFixed(2)}/mo to your cause
            </span>
          </div>
          <div className="flex items-center gap-2 py-1.5">
            <div className="w-4 h-4 rounded-full bg-[var(--accent)] flex items-center justify-center">
              <svg
                viewBox="0 0 16 16"
                className="w-2.5 h-2.5"
                fill="none"
                stroke="var(--accent-foreground)"
                strokeWidth="1.5"
              >
                <rect x="2" y="4" width="12" height="9" rx="1.5" />
                <path d="M5 4V3a3 3 0 016 0v1" />
              </svg>
            </div>
            <span className="text-sm text-[var(--foreground)] font-[var(--font-sans)]">
              Cancel anytime
            </span>
          </div>
        </div>

        {/* SubscriptionButton slot — keep your existing component */}
        <SubscriptionButtonSlot
          plan={plan}
          userName={userName}
          userEmail={userEmail}
          charityPercent={charityPercent}
          charityId={charityId}
          isYearly={isYearly}
        />
      </CardContent>
    </Card>
  );
}

function SubscriptionButtonSlot({
  plan,
  userName,
  userEmail,
  charityPercent,
  charityId,
}: {
  plan: "MONTHLY" | "YEARLY";
  userName: string;
  userEmail: string;
  charityPercent: number;
  charityId: string;
  isYearly: boolean;
}) {
  return (
    <SubscriptionButton
      plan={plan}
      userName={userName}
      userEmail={userEmail}
      charityPercent={charityPercent}
      charityId={charityId}
    />
  );
}

export default function PricingPage({ charities }: { charities: Charity[] }) {
  const [charityPercent, setCharityPercent] = useState<number>(10);
  const [charityId, setCharityId] = useState<string>("fffffff");

  const { data: session } = authClient.useSession();
  const email = session?.user.email ?? "";
  const name = session?.user.name ?? "";

  const monthlyCharityAmount = (MONTHLY_PRICE * charityPercent) / 100;
  const yearlyCharityAmount = (YEARLY_PRICE / 12) * (charityPercent / 100);

  const selectedCharity = charities.find((c) => c.id === charityId);

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-10 bg-[var(--background)] font-[var(--font-sans)]">
        <div className="max-w-3xl mx-auto px-6 py-14">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-[var(--accent)] text-[var(--accent-foreground)] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5"
                fill="currentColor"
              >
                <path d="M8 1.5C8 1.5 3 5 3 9a5 5 0 0010 0C13 5 8 1.5 8 1.5z" />
              </svg>
              Plans that give back
            </div>
            <h1 className="text-4xl font-bold text-[var(--foreground)] tracking-tight mb-3">
              Choose your plan
            </h1>
            <p className="text-[var(--muted-foreground)] text-base max-w-md mx-auto">
              Every subscription includes a donation to a cause you care about.
              You decide how much.
            </p>
          </div>

          {/* Choose a Charity */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-6 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold flex items-center justify-center flex-shrink-0">
                1
              </span>
              <h2 className="text-base font-semibold text-[var(--foreground)]">
                Pick your charity
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {charities.map((charity) => (
                <CharityCard
                  key={charity.id}
                  charity={charity}
                  selected={charityId === charity.id}
                  onSelect={() => setCharityId(charity.id)}
                />
              ))}
            </div>
          </section>

          {/* Choose donation % */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-6 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold flex items-center justify-center flex-shrink-0">
                2
              </span>
              <h2 className="text-base font-semibold text-[var(--foreground)]">
                Set your donation
              </h2>
            </div>
            <div className="bg-[var(--muted)] rounded-2xl p-6 border border-[var(--border)]">
              <div className="flex items-center justify-between gap-4">
                <Label className="text-sm text-[var(--muted-foreground)]">
                  Percentage of subscription donated
                </Label>
                <div className="flex items-center gap-1.5">
                  <Input
                    type="number"
                    min={10}
                    max={50}
                    value={charityPercent}
                    onChange={(e) => setCharityPercent(Number(e.target.value))}
                    onBlur={() =>
                      setCharityPercent((prev) => {
                        if (prev < 10) return 10;
                        if (prev > 50) return 50;
                        return prev;
                      })
                    }
                    className="w-20 text-center text-lg font-bold text-[var(--primary)] bg-[var(--background)] border-[var(--border)] focus-visible:ring-[var(--ring)]"
                  />
                  <span className="text-sm text-[var(--muted-foreground)]">
                    %
                  </span>
                </div>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] mt-3">
                Between 10% and 50%
              </p>
              {selectedCharity && charityId !== "fffffff" && (
                <p className="text-xs text-[var(--muted-foreground)] mt-2">
                  <span className="text-[var(--primary)] font-medium">
                    {charityPercent}%
                  </span>{" "}
                  of your subscription goes to{" "}
                  <span className="font-medium text-[var(--foreground)]">
                    {selectedCharity.name}
                  </span>
                </p>
              )}
            </div>
          </section>

          {/* Choose plan */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-6 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold flex items-center justify-center flex-shrink-0">
                3
              </span>
              <h2 className="text-base font-semibold text-[var(--foreground)]">
                Select a plan
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <PlanCard
                plan="MONTHLY"
                price={MONTHLY_PRICE}
                yearlyPrice={YEARLY_PRICE}
                charityPercent={charityPercent}
                charityAmount={monthlyCharityAmount}
                userName={name}
                userEmail={email}
                charityId={charityId}
              />
              <PlanCard
                plan="YEARLY"
                price={MONTHLY_PRICE}
                yearlyPrice={YEARLY_PRICE}
                charityPercent={charityPercent}
                charityAmount={yearlyCharityAmount}
                userName={name}
                userEmail={email}
                charityId={charityId}
              />
            </div>
          </section>

          <p className="text-center text-xs text-[var(--muted-foreground)] mt-8">
            Payments are processed securely. You can cancel or change your plan
            at any time.
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
