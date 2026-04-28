"use client";

import { useState } from "react";
import { useRazorpay } from "@/hooks/useRazorpay";
import {
  createSubscriptionOrder,
  verifyAndActivateSubscription,
} from "@/app/actions/payment.actions";
import { authClient } from "@/lib/auth-client";

interface Props {
  plan: "MONTHLY" | "YEARLY";
  userName: string;
  userEmail: string;
}

export function EnrollmentButton({ plan, userName, userEmail }: Props) {
  const [loading, setLoading] = useState(false);

  const { data: session } = authClient.useSession();
  const userId = session?.user.id;
  const { loadScript } = useRazorpay();

  if (!userId) {
    return;
  }

  const handleSubscribe = async () => {
    setLoading(true);

    try {
      const loaded = await loadScript();
      if (!loaded) throw new Error("Razorpay SDK failed to load");

      // 1. Create order via server action
      console.log("handleSubscribe", userId, plan);
      const { orderId, amount, currency, keyId } =
        await createSubscriptionOrder(plan, userId);

      // 2. Open Razorpay checkout
      const rzp = new (window as any).Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: "Your App Name",
        description: `${plan} Subscription`,
        prefill: { name: userName, email: userEmail },
        theme: { color: "#6366f1" },

        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await verifyAndActivateSubscription(response, userId);
            alert("Subscription activated! 🎉");
          } catch {
            alert("Payment verification failed. Contact support.");
          }
        },

        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
    >
      {loading ? "Processing..." : `Subscribe ${plan}`}
    </button>
  );
}
