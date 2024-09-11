import { Suspense } from "react";
import PersonalInformation from "~/app/ui/components/profile/PersonalInformation/PersonalInformation";
import { auth } from "~/auth";
import { PersonalInformationSkeleton } from "~/app/ui/components/common";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: 'CoolVacay | Profile',
  description: 'Profile for logged in users',
};
export default async function Page() {
  const session = (await auth())!;

  return (
    <main className="w-full">
      <Suspense fallback={<PersonalInformationSkeleton />}>
        <PersonalInformation session={session.user} />
      </Suspense>
    </main>
  );
}
