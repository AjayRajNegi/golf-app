"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateSingleScore(
  userId: string,
  value: number,
  date: Date,
) {
  await prisma.$transaction(async (tx) => {
    await tx.score.upsert({
      where: { userId_date: { userId, date } },
      update: { value },
      create: { value, date, userId },
    });

    const totalScores = await tx.score.count({ where: { userId } });

    if (totalScores > 5) {
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

export async function updateAllScore(
  userId: string,
  entries: { value: number; date: Date }[],
) {
  await prisma.$transaction(async (tx) => {
    for (const entry of entries) {
      await tx.score.upsert({
        where: { userId_date: { userId, date: entry.date } },
        update: { value: entry.value },
        create: { value: entry.value, date: entry.date, userId },
      });
    }

    const total = await tx.score.count({ where: { userId } });

    if (total > 5) {
      const excess = total - 5;
      const oldestScores = await tx.score.findMany({
        where: { userId },
        orderBy: { date: "asc" },
        take: excess,
      });

      if (oldestScores.length > 0) {
        await tx.score.deleteMany({
          where: { id: { in: oldestScores.map((s) => s.id) } },
        });
      }
    }
  });

  revalidatePath("/dashboard");
}
