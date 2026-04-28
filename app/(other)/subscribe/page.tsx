"use client";

import { SubscriptionButton } from "./_components/SubscriptionButton";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PricingPage() {
  const [charityPercent, setCharityPercent] = useState<number>(10);

  const { data: session } = authClient.useSession();
  const email = session?.user.email;
  const name = session?.user.name;

  return (
    <>
      <section>
        {/* List of all charities */}
        <h1>Charity %</h1>
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={charityPercent}
              type="number"
              max={50}
              min={10}
              required
              onChange={(e) => setCharityPercent(Number(e.target.value))}
              onBlur={() =>
                setCharityPercent((prev) => {
                  if (prev < 10) return 10;
                  if (prev > 50) return 50;
                  return prev;
                })
              }
              defaultValue={charityPercent}
            />
          </div>
        </div>
      </section>
      <div className="flex gap-8 p-10">
        <SubscriptionButton
          plan="MONTHLY"
          userName={name ?? ""}
          userEmail={email ?? ""}
        />
        <SubscriptionButton
          plan="YEARLY"
          userName={name ?? ""}
          userEmail={email ?? ""}
        />
      </div>
    </>
  );
}
