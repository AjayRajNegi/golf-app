import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import { Button } from "@base-ui/react/button";
import { ExternalLink, Heart } from "lucide-react";
import Navbar from "../../_components/Navbar";
import Footer from "../../_components/Footer";

type Params = Promise<{ charityId: string }>;

export default async function CharityContentPage({
  params,
}: {
  params: Params;
}) {
  const { charityId } = await params;

  const charity = await prisma.charity.findFirst({
    where: {
      id: charityId,
      active: true,
    },
    select: {
      name: true,
      slug: true,
      description: true,
      imageUrl: true,
      website: true,
      charityContribs: {
        select: {
          id: true,
          amount: true,
          cycle: true,
        },
      },
    },
  });

  if (!charity) {
    return <div className="text-white p-10">Charity not found</div>;
  }

  const totalRaised =
    charity.charityContribs.reduce((sum, c) => sum + c.amount, 0) || 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0B0B0C] text-white pt-10">
        {/* HERO */}
        <div className="relative h-[320px] w-full overflow-hidden">
          {charity.imageUrl && (
            <img
              src={charity.imageUrl}
              alt={charity.name}
              className="h-full w-full object-cover opacity-70"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-black/60 to-transparent" />

          <div className="absolute bottom-6 left-1/2 w-full max-w-6xl -translate-x-1/2 px-4">
            <Badge className="bg-[#F6C177]/10 text-[#F6C177] mb-3">
              Charity Partner
            </Badge>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              {charity.name}
            </h1>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* LEFT */}
          <div>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">About this charity</h2>
                <p className="mt-4 text-white/70 leading-7">
                  {charity.description}
                </p>

                {charity.website && (
                  <a
                    href={charity.website}
                    target="_blank"
                    className="inline-flex items-center mt-6 text-[#F6C177] text-sm"
                  >
                    Visit official website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                )}
              </CardContent>
            </Card>

            {/* IMPACT */}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <p className="text-sm text-white/60">Total raised</p>
                  <p className="mt-2 text-3xl font-semibold text-[#F6C177]">
                    £{totalRaised.toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    From all member contributions
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <p className="text-sm text-white/60">Contributions</p>
                  <p className="mt-2 text-3xl font-semibold">
                    {charity.charityContribs.length}
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    Total recorded entries
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* RECENT CONTRIBUTIONS */}
            <Card className="mt-8 bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Recent contributions</h3>

                <div className="mt-4 space-y-3">
                  {charity.charityContribs.slice(0, 5).map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between border border-white/10 rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="h-4 w-4 text-[#F6C177]" />
                        <span className="text-sm text-white/70">
                          Contribution
                        </span>
                      </div>
                      <span className="text-sm font-medium">£{c.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-4">
            <Card className="bg-white/5 border-white/10 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold">Support this charity</h3>
                <p className="mt-2 text-sm text-white/60">
                  Choose this charity and set your contribution percentage.
                </p>

                <Button className="mt-6 w-full bg-[#F6C177] text-black hover:bg-[#f1b55d]">
                  Select this charity
                </Button>

                <p className="mt-3 text-xs text-white/50 text-center">
                  Minimum contribution: 10%
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
