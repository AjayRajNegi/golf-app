"use server";

import prisma from "@/lib/db";

type actionResponse =
  | { success: true; message: string }
  | { success: false; error: string };

export async function createUserCharityWhileSignup(
  userId: string,
  charityId: string,
  charityPercent: number,
): Promise<actionResponse> {
  if (!userId || !charityId || !charityPercent) {
    return { success: false, error: "Missing requirements." };
  }

  try {
    await prisma.$transaction([
      prisma.userCharity.create({
        data: { contributionPercent: charityPercent, userId, charityId },
      }),
      // TODO: add dynamic amount
      prisma.charityContribution.create({
        data: {
          amount: 500,
          cycle: new Date(),
          userId: userId,
          charityId: charityId,
        },
      }),
    ]);

    return { success: true, message: "Charity updated successfully." };
  } catch (error) {
    console.error("Charity updation error:", JSON.stringify(error));
    throw error;
  }
}

export async function getAllCharity() {
  try {
    const result = await prisma.charity.findMany({
      where: {
        active: true,
      },
    });

    if (!result) {
      return { success: false, error: "Internal server error." };
    }

    return result;
  } catch (error) {
    console.error("GetAllCharity error", error);
    throw error;
  }
}
