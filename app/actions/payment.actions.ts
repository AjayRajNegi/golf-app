"use server";

import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { razorpay, PLAN_PRICES } from "@/lib/razorpay";
import prisma from "@/lib/db";

// ─── Step 1: Create Razorpay Order ───────────────────────────────────────────
export async function createSubscriptionOrder(
  plan: "MONTHLY" | "YEARLY",
  userId: string,
) {
  console.log("KEY_ID present:", !!process.env.RAZORPAY_KEY_ID);
  console.log("KEY_SECRET present:", !!process.env.RAZORPAY_KEY_SECRET);
  console.log("KEY_ID prefix:", process.env.RAZORPAY_KEY_ID?.slice(0, 12));
  console.log("Hello");

  try {
    const amount = PLAN_PRICES[plan];
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${userId.slice(-8)}_${Date.now().toString().slice(-8)}`,
      notes: { userId, plan },
    });

    await prisma.subscription.upsert({
      where: { userId },
      create: {
        userId,
        plan,
        status: "PENDING",
        razorpayOrderId: order.id,
      },
      update: {
        plan,
        status: "PENDING",
        razorpayOrderId: order.id,
      },
    });

    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID!,
    };
  } catch (err) {
    console.error("Razorpay error:", JSON.stringify(err, null, 2));
    throw err;
  }
}

// ─── Step 2: Verify Payment & Activate Subscription ──────────────────────────
export async function verifyAndActivateSubscription(
  payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  },
  userId: string,
) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    payload;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSig = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSig !== razorpay_signature) {
    throw new Error("Invalid payment signature");
  }

  const payment = await razorpay.payments.fetch(razorpay_payment_id);
  const plan = payment.notes?.plan as "MONTHLY" | "YEARLY";

  const now = new Date();
  const currentPeriodEnd = new Date(now);
  if (plan === "MONTHLY") currentPeriodEnd.setMonth(now.getMonth() + 1);
  else currentPeriodEnd.setFullYear(now.getFullYear() + 1);

  // Activate subscription
  await prisma.subscription.update({
    where: { userId },
    data: {
      status: "ACTIVE",
      razorpaySubscriptionId: razorpay_payment_id,
      currentPeriodEnd,
    },
  });

  revalidatePath("/");
  return { success: true };
}

// ─── Cancel Subscription ──────────────────────────────────────────────────────
export async function cancelSubscription(userId: string) {
  await prisma.subscription.update({
    where: { userId },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
    },
  });

  revalidatePath("/");
  return { success: true };
}
