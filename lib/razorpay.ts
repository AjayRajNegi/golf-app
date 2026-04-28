import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  throw new Error(
    `Missing Razorpay env vars. keyId: ${!!keyId}, keySecret: ${!!keySecret}`,
  );
}

export const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export const PLAN_PRICES: Record<"MONTHLY" | "YEARLY", number> = {
  MONTHLY: 49900,
  YEARLY: 399900,
};
