import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Heart, TrendingUp, Star } from "lucide-react";

export default function Results() {
  return (
    <section
      id="results"
      className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8"
    >
      <Card className="overflow-hidden border-white/10 bg-white/[0.04] text-white shadow-2xl shadow-black/10">
        <CardContent className="grid gap-10 p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <div>
            <Badge className="rounded-full bg-white/10 text-white hover:bg-white/10">
              Social proof
            </Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">
              Designed to feel premium, trusted, and emotionally clear.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/68">
              The visual system combines editorial typography, warm contrast,
              rounded cards, and subtle motion so the product feels like a
              modern membership experience rather than a standard sports app.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm text-white/55">
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Mobile-first
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Shadcn-ready
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Charity-first
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                Not golf-cliché
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Member trust",
                value:
                  "Verification flows and payout clarity are surfaced early.",
                icon: ShieldCheck,
              },
              {
                title: "Emotional hook",
                value:
                  "The charity story carries the conversion, not golf imagery.",
                icon: Heart,
              },
              {
                title: "Engagement engine",
                value: "Rolling scores and monthly draws create repeat visits.",
                icon: TrendingUp,
              },
              {
                title: "Premium feel",
                value: "Dark luxury palette with warm highlight accents.",
                icon: Star,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-black/20 p-4"
              >
                <item.icon className="h-5 w-5 text-[#F6C177]" />
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
