import { Card, CardContent } from "@/components/ui/card";
import { Heart, Medal, Trophy } from "lucide-react";

const steps = [
  {
    title: "Enter your scores",
    description:
      "Log Stableford scores in a clean mobile-first flow with your last 5 entries always visible.",
    icon: Medal,
  },
  {
    title: "Support a charity",
    description:
      "Pick a cause you care about and set a contribution level with a minimum 10% baseline.",
    icon: Heart,
  },
  {
    title: "Enter the draw",
    description:
      "Your rolling 5-score window powers your chance to match the draw and win prizes.",
    icon: Trophy,
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

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <SectionHeading
        eyebrow="How it works"
        title="A simple loop that feels rewarding from day one"
        description="The experience should feel premium, clear, and emotional — not like a typical golf product."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {steps.map((step, index) => (
          <Card
            key={step.title}
            className="border-white/10 bg-white/[0.04] text-white shadow-xl shadow-black/10 backdrop-blur"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6C177]/10 text-[#F6C177]">
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-sm text-white/35">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
