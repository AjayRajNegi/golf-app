"use client";

import { SubscriptionButton } from "./SubscriptionButton";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface charity {
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

export default function PricingPage(charities: { charities: charity[] }) {
  const [charityPercent, setCharityPercent] = useState<number>(10);
  const [charityId, setCharityId] = useState<string>("fffffff");

  const { data: session } = authClient.useSession();
  const email = session?.user.email;
  const name = session?.user.name;

  return (
    <>
      <section className="p-10">
        {charities.charities.map((charity, id) => (
          <div
            key={id}
            className="bg-muted-foreground w-fit rounded p-2"
            onClick={() => setCharityId(charity.id)}
          >
            <h1>{charity.name}</h1>
            <p>{charity.description}</p>
          </div>
        ))}
        <div className="grid gap-3">
          <div className="grid gap-2">
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
          charityPercent={charityPercent}
          charityId={charityId}
        />
        <SubscriptionButton
          plan="YEARLY"
          userName={name ?? ""}
          userEmail={email ?? ""}
          charityPercent={charityPercent}
          charityId={charityId}
        />
      </div>
    </>
  );
}
