import { StaticPageWrapper } from "~/app/ui/components/common";
import { getStaticPage } from "../actions";
import parse from "html-react-parser";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: 'CoolVacay | Terms and Conditions',
  description: 'Terms and Conditions page',
};
export default async function Page() {
  const termsAndConditionsHTML = await getStaticPage("terms_and_conditions");

  return (
    <StaticPageWrapper
      img={{
        alt: "Terms and conditions picture",
        src: "/terms-conditions.jpeg",
      }}
      title="Terms and Conditions"
      subtitle="Last modified: May 15, 2024"
    >
      {termsAndConditionsHTML
        ? parse(termsAndConditionsHTML)
        : "Under construction"}
    </StaticPageWrapper>
  );
}
