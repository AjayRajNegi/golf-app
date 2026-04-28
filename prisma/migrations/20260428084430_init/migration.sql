/*
  Warnings:

  - You are about to drop the `Charity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CharityContribution` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Draw` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DrawEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCharity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WinnerClaim` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CharityContribution" DROP CONSTRAINT "CharityContribution_charityId_fkey";

-- DropForeignKey
ALTER TABLE "CharityContribution" DROP CONSTRAINT "CharityContribution_userId_fkey";

-- DropForeignKey
ALTER TABLE "DrawEntry" DROP CONSTRAINT "DrawEntry_drawId_fkey";

-- DropForeignKey
ALTER TABLE "DrawEntry" DROP CONSTRAINT "DrawEntry_userId_fkey";

-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCharity" DROP CONSTRAINT "UserCharity_charityId_fkey";

-- DropForeignKey
ALTER TABLE "UserCharity" DROP CONSTRAINT "UserCharity_userId_fkey";

-- DropForeignKey
ALTER TABLE "WinnerClaim" DROP CONSTRAINT "WinnerClaim_drawEntryId_fkey";

-- DropForeignKey
ALTER TABLE "WinnerClaim" DROP CONSTRAINT "WinnerClaim_userId_fkey";

-- DropTable
DROP TABLE "Charity";

-- DropTable
DROP TABLE "CharityContribution";

-- DropTable
DROP TABLE "Draw";

-- DropTable
DROP TABLE "DrawEntry";

-- DropTable
DROP TABLE "Score";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "UserCharity";

-- DropTable
DROP TABLE "WinnerClaim";

-- CreateTable
CREATE TABLE "subscription" (
    "id" TEXT NOT NULL,
    "plan" "Plan" NOT NULL,
    "status" "SubStatus" NOT NULL DEFAULT 'PENDING',
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "score" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "website" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "charity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userCharity" (
    "id" TEXT NOT NULL,
    "contributionPercent" INTEGER NOT NULL DEFAULT 10,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "charityId" TEXT NOT NULL,

    CONSTRAINT "userCharity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charityContribs" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "cycle" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "charityId" TEXT NOT NULL,

    CONSTRAINT "charityContribs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "draw" (
    "id" TEXT NOT NULL,
    "month" DATE NOT NULL,
    "status" "DrawStatus" NOT NULL DEFAULT 'DRAFT',
    "drawnNumbers" INTEGER[],
    "totalPool" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "jackpotPool" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "drawType" "DrawType" NOT NULL DEFAULT 'RANDOM',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "draw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drawEntry" (
    "id" TEXT NOT NULL,
    "scores" INTEGER[],
    "matchCount" INTEGER NOT NULL,
    "tier" "MatchTier",
    "prizeAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "drawId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "drawEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "winnerClaim" (
    "id" TEXT NOT NULL,
    "proofUrl" TEXT,
    "status" "ClaimStatus" NOT NULL DEFAULT 'PENDING_UPLOAD',
    "adminNote" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "drawEntryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "winnerClaim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_userId_key" ON "subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "score_userId_date_key" ON "score"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "charity_slug_key" ON "charity"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "userCharity_userId_key" ON "userCharity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "drawEntry_drawId_userId_key" ON "drawEntry"("drawId", "userId");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCharity" ADD CONSTRAINT "userCharity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCharity" ADD CONSTRAINT "userCharity_charityId_fkey" FOREIGN KEY ("charityId") REFERENCES "charity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charityContribs" ADD CONSTRAINT "charityContribs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charityContribs" ADD CONSTRAINT "charityContribs_charityId_fkey" FOREIGN KEY ("charityId") REFERENCES "charity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drawEntry" ADD CONSTRAINT "drawEntry_drawId_fkey" FOREIGN KEY ("drawId") REFERENCES "draw"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drawEntry" ADD CONSTRAINT "drawEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "winnerClaim" ADD CONSTRAINT "winnerClaim_drawEntryId_fkey" FOREIGN KEY ("drawEntryId") REFERENCES "drawEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "winnerClaim" ADD CONSTRAINT "winnerClaim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
