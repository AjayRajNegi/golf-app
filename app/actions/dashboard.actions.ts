"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateSingleScore(
  userId: string,
  value: number,
  date: Date,
) {
  await prisma.$transaction(async (tx) => {
    const existing = await tx.score.findUnique({
      where: { userId_date: { userId, date } },
    });

    await tx.score.upsert({
      where: { userId_date: { userId, date } },
      update: { value },
      create: { value, date, userId },
    });

    if (!existing) {
      const oldest = await tx.score.findFirst({
        where: { userId },
        orderBy: { date: "asc" },
      });

      if (oldest) {
        await tx.score.delete({ where: { id: oldest.id } });
      }
    }
  });

  revalidatePath("/dashboard");
}
