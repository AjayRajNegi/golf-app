"use client";

import { useState } from "react";
import { useRazorpay } from "@/hooks/useRazorpay";
import {
  createSubscriptionOrder,
  verifyAndActivateSubscription,
} from "@/app/actions/payment.actions";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createUserCharityWhileSignup } from "@/app/actions/charity.actions";
import { cn } from "@/lib/utils";

interface Props {
  plan: "MONTHLY" | "YEARLY";
  userName: string;
  userEmail: string;
  charityPercent: number;
  charityId: string;
}

export function SubscriptionButton({
  plan,
  userName,
  userEmail,
  charityPercent,
  charityId,
}: Props) {
  const router = useRouter();
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

      const { orderId, amount, currency, keyId } =
        await createSubscriptionOrder(plan, userId);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            toast.success("Payment successfull!!");
            await createUserCharityWhileSignup(
              userId,
              charityId,
              charityPercent,
            );
            toast.success("Charity updated successfully!!");
            router.push("/dashboard");
          } catch {
            toast.error("Something went wrong.");
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
  const isYearly = false;

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className={cn(
        "w-full py-2.5 rounded-lg text-sm font-semibold font-[var(--font-sans)] transition-all duration-150",
        isYearly
          ? "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 active:scale-[0.98]"
          : "bg-transparent border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)] active:scale-[0.98]",
      )}
    >
      {loading ? "Processing..." : `Subscribe ${plan}`}
    </button>
  );
}
