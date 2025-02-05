import { auth } from "~/auth";
import { getProfileInfo, isValidToken } from "~/app/(application)/actions";
import NavBar from "./NavBar.client";
import Banner from "./Banner";

export default async function NavBarWrapper() {
  const session = await auth();
  const isTokenValid = session && (await isValidToken());
  const userData = isTokenValid ? await getProfileInfo() : undefined;

  return (
    <>
      <Banner />
      <NavBar userData={userData} session={session} />
    </>
  );
}
