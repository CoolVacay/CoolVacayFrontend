import PersonalInformation from "~/app/ui/components/profile/PersonalInformation/PersonalInformation";
import { auth } from "~/auth";

export default async function Page() {
  const session = (await auth())!;
  return (
    <main className="w-full">
      <PersonalInformation session={session.user} />
    </main>
  );
}
