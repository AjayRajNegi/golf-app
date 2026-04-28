import prisma from "@/lib/db";
import PricingPage from "./_components/PricingPage";

export default async function Page() {
  const charities = await prisma.charity.findMany({ where: { active: true } });
  return (
    <>
      <PricingPage charities={charities} />
    </>
  );
}
