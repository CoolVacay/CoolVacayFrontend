import ProfileForm from "./ProfileForm";
import { getCountries, getProfileInfo } from "~/app/(application)/actions";

export default async function PersonalInformation() {
  const profileInfo = await getProfileInfo();
  const countries = (await getCountries())!;

  return (
    <div className="p-3">
      <p className="text-[28px] font-medium">Personal Information</p>
      <div className="mt-10 flex flex-col">
        {profileInfo ? (
          <ProfileForm profileInfo={profileInfo} countries={countries} />
        ) : null}
      </div>
    </div>
  );
}
