export default function ReviewCard({
  title,
  size,
  description,
  name,
  date,
}: {
  title: string;
  description: string;
  name: string;
  date: string;
  size: "small" | "medium";
}) {
  const isSmallSize = size === "small";
  return (
    <div
      className={`flex flex-col justify-between gap-5 rounded-lg border px-5 py-7 ${isSmallSize ? "bg-white" : "bg-[#F7F7F7]"}`}
    >
      <div>
        <p
          className={`${isSmallSize ? "text-lg" : "text-xl"} pb-4 font-medium`}
        >
          {title}
        </p>
        <p
          className={`${isSmallSize ? "text-sm" : "text-base"} text-[#676D73]`}
        >
          {description}
        </p>
      </div>
      <div className="flex items-center">
        <div className="ml-4">
          <p className={`${isSmallSize ? "text-base" : "text-xl"}`}>
            Name: {name}
          </p>
          <p
            className={`${isSmallSize ? "text-sm" : "text-base"}text-[#676D73]`}
          >
            Date: {date}
          </p>
        </div>
      </div>
    </div>
  );
}
