import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@base-ui/react/button";
import { Badge, BadgeCheck } from "lucide-react";

const pricing = [
  {
    name: "Monthly",
    price: "£12",
    note: "Flexible entry point",
    highlight: false,
    features: [
      "1 monthly draw entry",
      "Choose any charity",
      "Score tracking dashboard",
    ],
  },
  {
    name: "Yearly",
    price: "£120",
    note: "Best value for committed members",
    highlight: true,
    features: [
      "2 months free",
      "Priority draw reminders",
      "Best visibility in impact totals",
    ],
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-white/68 md:text-base">
        {description}
      </p>
    </div>
  );
}

export default function Pricing({ className }: { className: string }) {
  return (
    <div className={`bg-[#0B0B0C] text-white ${className}`}>
      <section
        id="pricing"
        className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <SectionHeading
          eyebrow="Pricing"
          title="Two plans, one clear next step"
          description="The plan cards should feel premium and decisive, with one subtle emphasis on the best-value choice."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {pricing.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlight
                  ? "border-[#F6C177]/30 bg-[#F6C177]/10 text-white shadow-2xl shadow-[#F6C177]/10"
                  : "border-white/10 bg-white/[0.04] text-white shadow-xl shadow-black/10"
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  {plan.highlight && (
                    <Badge className="rounded-full bg-white text-black hover:bg-white">
                      Best value
                    </Badge>
                  )}
                </div>
                <CardDescription
                  className={plan.highlight ? "text-white/70" : "text-white/60"}
                >
                  {plan.note}
                </CardDescription>
                <div className="pt-4">
                  <p className="text-5xl font-semibold tracking-tight">
                    {plan.price}
                  </p>
                  <p className="mt-2 text-sm text-white/55">
                    per month equivalent
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 p-6 pt-0">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3"
                  >
                    <BadgeCheck className="h-4 w-4 text-[#F6C177]" />
                    <span className="text-sm text-white/72">{feature}</span>
                  </div>
                ))}
                <Button
                  className={
                    plan.highlight
                      ? "mt-3 w-full rounded-full bg-white text-black hover:bg-white/90"
                      : "mt-3 w-full rounded-full bg-[#F6C177] text-black hover:bg-[#f1b55d]"
                  }
                >
                  Choose {plan.name.toLowerCase()}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
