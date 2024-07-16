import Image from "next/image";
import { auth } from "~/auth";
import NavLinks from "./NavLinks";

export default async function SideNav() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4 rounded-[8px] border border-[#EAEAEF] pt-5">
      <div className="flex items-center gap-4 px-5">
        <div className="flex w-[50px]">
          <Image
            alt="avatar icon"
            src={`${session?.user?.image ?? `/avatar_blue.svg`}`}
            width={50}
            height={50}
            className="h-[50px] w-[50px] rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>
            {session?.user?.name} {session?.user?.lastName}
          </p>
          {/* TODO: do we need this ? */}
          <p className="text-sm text-[#676D73]">Joined March 12 2020</p>
        </div>
      </div>
      <NavLinks />
    </div>
  );
}
