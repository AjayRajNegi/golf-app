import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@base-ui/react/button";

export default function DrawsPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      <div className="relative overflow-hidden">
        <div className="min-h-screen bg-[#0B0B0C] text-white px-4 py-16 max-w-6xl mx-auto">
          <h1 className="text-4xl font-semibold">Draw results</h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            Transparent history of all previous draws, winners, and prize
            distribution.
          </p>

          <div className="mt-10 space-y-6">
            {[1, 2, 3].map((draw) => (
              <Card key={draw} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">March 2026 Draw</p>
                      <p className="text-sm text-white/60">
                        Total pool: £30,000
                      </p>
                    </div>
                    <Badge className="bg-[#F6C177]/10 text-[#F6C177]">
                      Published
                    </Badge>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {[
                      { tier: "5 Match", winner: "1 winner", prize: "£12,000" },
                      {
                        tier: "4 Match",
                        winner: "5 winners",
                        prize: "£2,100 each",
                      },
                      {
                        tier: "3 Match",
                        winner: "20 winners",
                        prize: "£375 each",
                      },
                    ].map((tier) => (
                      <div
                        key={tier.tier}
                        className="rounded-2xl border border-white/10 p-4"
                      >
                        <p className="font-medium">{tier.tier}</p>
                        <p className="text-sm text-white/60 mt-1">
                          {tier.winner}
                        </p>
                        <p className="mt-2 text-[#F6C177] font-semibold">
                          {tier.prize}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Button className="mt-6 text-white">
                    View full details →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
