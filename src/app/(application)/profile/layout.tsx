import SideNav from "~/app/ui/components/profile/SideNav/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex flex-col">
      <div className="flex justify-center">
        <div className="flex max-w-[1220px] grow gap-12">
          <div className="flex-none">
            <SideNav />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
