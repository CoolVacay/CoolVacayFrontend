import { auth } from "~/auth";
import NavBar from "./NavBar.client";
import { getProfileInfo } from "~/app/(application)/actions";
import { isValidToken } from "~/app/(application)/actions";

export default async function NavBarWrapper() {
  const session = await auth();
  const isTokenValid = session?.user
    ? await isValidToken(session.user?.accessToken)
    : false;

  const userData = isTokenValid
    ? await getProfileInfo(session?.user?.email!)
    : null;

  return <NavBar userData={userData} isTokenValid={isTokenValid as boolean} />;
}
