import SideNav from "~/app/ui/components/profile/SideNav/SideNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex flex-col">
      <div className="flex-col lg:flex-row justify-center">
        <div className="flex w-full max-w-[1220px] flex-col gap-6 lg:flex-row lg:gap-12">
          <div className="lg:flex-none">
            <SideNav />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
