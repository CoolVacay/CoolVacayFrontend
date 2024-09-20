import SideNav from "~/app/ui/components/profile/SideNav/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex p-4 sm:p-0">
      <div className="flex w-full justify-center">
        <div className="custom-max-widths flex w-full flex-col gap-6 md:flex-row">
          <div className="flex h-min shrink-0">
            <SideNav />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
