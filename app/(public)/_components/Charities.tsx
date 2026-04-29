import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function Charities({ className }: { className: string }) {
  const charities = await prisma.charity.findMany({
    where: { active: true },
    include: {
      charityContribs: {
        select: {
          amount: true,
          charityId: true,
        },
      },
    },
  });

  return (
    <div className={`${className} bg-[#0B0B0C] text-white`}>
      <div className="relative overflow-hidden">
        <div
          className={` ${className} bg-[#0B0B0C] text-white px-4 py-16 max-w-7xl mx-auto`}
        >
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
                  <p className="mt-2 text-sm text-white/65">
                    {charity.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-white/50">{}</span>
                    <span className="text-white font-medium">
                      ₹{" "}
                      {charity.charityContribs
                        .filter((contrib) => contrib.charityId === charity.id)
                        .map((contrib) => contrib.amount)}{" "}
                      raised
                    </span>
                  </div>

                  <Link
                    href={`charities/${charity.id}`}
                    className="mt-5 w-full rounded-full bg-primary text-black"
                  >
                    View charity
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
