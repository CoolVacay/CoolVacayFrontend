import { Suspense } from "react";
import { type Metadata } from "next";
import PersonalInformation from "~/app/ui/components/profile/PersonalInformation/PersonalInformation";
import { PersonalInformationSkeleton } from "~/app/ui/components/common";

export const metadata: Metadata = {
  title: "CoolVacay | Profile",
  description: "Profile for logged in users",
};
export default async function Page() {
  return (
    <main className="w-full">
      <Suspense fallback={<PersonalInformationSkeleton />}>
        <PersonalInformation />
      </Suspense>
    </main>
  );
}
