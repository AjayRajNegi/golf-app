import { Card, CardContent } from "@/components/ui/card";
import HowItWorks from "../_components/HowItWorks";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0B0B0C] text-white pt-10">
        <HowItWorks />
        <section
          id="how-it-works"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div>
            <h2 className="text-2xl font-semibold">Draw Mechanics</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { tier: "5 Match", pct: "40%", note: "Jackpot (rollover)" },
                { tier: "4 Match", pct: "35%", note: "Mid-tier payout" },
                { tier: "3 Match", pct: "25%", note: "Wider distribution" },
              ].map((item) => (
                <Card
                  key={item.tier}
                  className="border-white/10 bg-white/[0.04] text-white shadow-xl shadow-black/10 backdrop-blur"
                >
                  <CardContent className="p-5">
                    <p className="text-lg font-semibold">{item.tier}</p>
                    <p className="text-[#F6C177] mt-2">{item.pct}</p>
                    <p className="text-sm text-white/60 mt-2">{item.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
