import type { Session } from "next-auth";
import Image from "next/image";
import ProfileForm from "./ProfileForm";
import { getCountries, getProfileInfo } from "~/app/(application)/actions";
import UploadButton from "./UploadButton";

export default async function PersonalInformation({
  session,
}: {
  session: Session["user"];
}) {
  const profileInfo = session && (await getProfileInfo(session.email!))!;
  const countries = (await getCountries())!;
  return (
    <div className="p-3">
      <p className="text-[28px] font-medium">Personal Information</p>
      <div className="mt-10 flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-10">
            <div>
              <Image
                alt="avatar icon"
                src={`${session?.image ?? `/avatar_blue.svg`}`}
                width={80}
                height={80}
                className="h-[80px] w-[80px] rounded-full"
              />
            </div>
            <div className="flex flex-col font-medium">
              <p className="text-[20px]">
                {profileInfo?.firstName} {profileInfo?.lastName}
              </p>
              <UploadButton />
            </div>
          </div>
        </div>
        <ProfileForm profileInfo={profileInfo} countries={countries} />
      </div>
    </div>
  );
}
