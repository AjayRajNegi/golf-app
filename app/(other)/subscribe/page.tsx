// // "use client";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// // import { useState } from "react";
// import { EnrollmentButton } from "./_components/EnrollmentButton";
// import { authClient } from "@/lib/auth-client";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// export default async function Subscribe() {
//   // const [charityPercent, setCharityPercent] = useState<number>(10);

//   // const { data: session } = authClient.useSession();
//   // const email = session?.user.email;
//   // const name = session?.user.name;

//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });
//   const email = session?.user.email;
//   const name = session?.user.name;

//   console.log(email, name);

//   return (
//     <>
//       <section>
//         {/* List of all charities */}
//         <h1>Charity %</h1>
//         {/* <div className="grid gap-3">
//           <div className="grid gap-2">
//             <Label htmlFor="email">Email</Label>
//             <Input
//               value={charityPercent}
//               type="number"
//               max={50}
//               min={10}
//               required
//               onChange={(e) => setCharityPercent(Number(e.target.value))}
//               onBlur={() =>
//                 setCharityPercent((prev) => {
//                   if (prev < 10) return 10;
//                   if (prev > 50) return 50;
//                   return prev;
//                 })
//               }
//               defaultValue={charityPercent}
//             />
//           </div>
//         </div> */}
//       </section>
//       <section>
//         <div className="flex gap-8 p-10">
//           <EnrollmentButton
//             plan="MONTHLY"
//             userName={name ?? ""}
//             userEmail={email ?? ""}
//           />
//           <EnrollmentButton
//             plan="YEARLY"
//             userName={name ?? ""}
//             userEmail={email ?? ""}
//           />
//         </div>
//       </section>
//     </>
//   );
// }

import { auth } from "@/lib/auth";
import { EnrollmentButton } from "./_components/EnrollmentButton";
import { headers } from "next/headers";

export default async function PricingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const email = session?.user.email;
  const name = session?.user.name;

  console.log(email, name, session?.user.id);

  return (
    <div className="flex gap-8 p-10">
      <EnrollmentButton
        plan="MONTHLY"
        userName={name ?? ""}
        userEmail={email ?? ""}
      />
      <EnrollmentButton
        plan="YEARLY"
        userName={name ?? ""}
        userEmail={email ?? ""}
      />
    </div>
  );
}
