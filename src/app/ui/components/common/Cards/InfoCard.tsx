import { IconGenerator } from "../IconGenerator";

export default function InfoCard({
  icon,
  name,
  value,
}: {
  icon: React.ReactElement;
  name: string;
  value: string;
}) {
  return (
    <div
      className="flex items-center gap-4 rounded-[8px] bg-white p-2 sm:gap-6 sm:p-6 md:w-full lg:p-2 xl:w-[276px] xl:p-4"
      style={{
        boxShadow: "0px 2px 6px 0px rgba(16, 24, 40, 0.06)",
      }}
    >
      <div className="h-min rounded-[6px] bg-primary/[0.10] p-2 sm:p-3">
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="text-center text-[24px] font-semibold leading-8 sm:text-[32px] sm:leading-10 xl:text-left">
          {value}
        </p>
        <p className="text-center text-xs text-[#676D73] sm:text-sm">
          {name}
        </p>
      </div>
    </div>
  );
}
