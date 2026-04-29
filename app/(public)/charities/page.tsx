import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const charities = [
  {
    name: "Green Future Trust",
    blurb:
      "Funding community-led environmental projects with measurable local impact.",
    impact: "£84,200 raised",
    accent: "From 10% contribution",
  },
  {
    name: "Mindful Youth UK",
    blurb:
      "Supporting accessible mental health resources for young people and families.",
    impact: "£61,750 raised",
    accent: "Member favourite",
  },
  {
    name: "Food For All Network",
    blurb:
      "Turning subscription energy into food relief, kitchens, and emergency support.",
    impact: "£102,950 raised",
    accent: "Fast-growing partner",
  },
];

export default function CharitiesPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      <div className="relative overflow-hidden">
        <div className="min-h-screen bg-[#0B0B0C] text-white px-4 py-16 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold">Charities</h1>
            <Button
              variant="outline"
              className="border-white/10 bg-white/5 text-white"
            >
              Filter
            </Button>
          </div>

          <p className="mt-4 text-white/70 max-w-2xl">
            Discover and support causes that matter. Your subscription directly
            contributes to these organizations.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {charities.map((charity) => (
              <Card key={charity.name} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">{charity.name}</h3>
                  <p className="mt-2 text-sm text-white/65">{charity.blurb}</p>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-white/50">{charity.accent}</span>
                    <span className="text-white font-medium">
                      {charity.impact}
                    </span>
                  </div>

                  <Button className="mt-5 w-full rounded-full bg-[#F6C177] text-black">
                    View charity
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
