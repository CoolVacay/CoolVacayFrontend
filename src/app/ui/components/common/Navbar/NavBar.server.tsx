import { auth } from "~/auth";
import NavBar from "./NavBar.client";
import { getProfileInfo } from "~/app/(application)/actions";

export default async function NavBarWrapper() {
  const session = await auth();
  const userData = session?.user
    ? await getProfileInfo(session.user.email!)
    : null;
  return <NavBar session={userData} />;
}
