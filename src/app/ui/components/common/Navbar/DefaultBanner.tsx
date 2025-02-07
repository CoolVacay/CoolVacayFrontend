import Link from "next/link";

export const DEFAULT_BANNER = {
  allowMasterOverride: false,
  text: "Book Early & Save 25% on Longboat Bay Club",
  ctaButton: {
    href: "/hot-deals",
    label: "Go now!",
  },
};

export const DefaultBanner = () => {
  return (
    <>
      <p className="mt-2 text-xl text-black">{DEFAULT_BANNER.text}</p>
      {DEFAULT_BANNER?.ctaButton && (
        <Link href={DEFAULT_BANNER.ctaButton.href}>
          <button className="transform rounded-xl bg-white px-2 py-1 font-bold text-black transition duration-100 hover:bg-blue-500 hover:text-white">
            {DEFAULT_BANNER.ctaButton.label}
          </button>
        </Link>
      )}
    </>
  );
};
