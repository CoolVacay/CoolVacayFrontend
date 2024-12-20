import BillingAddressForm from "./BillingAddressForm";
import { getCountries } from "~/app/(application)/actions";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing Address Step | Payment Process",
  description: "Billing Address Step | Payment Process",
};

export default async function Page({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const allCountries = (await getCountries()) ?? [];

  return (
    <div className="flex w-full flex-col gap-6">
      {params.source === "Lodgix" || params.source === "HostAway" ? (
        <div>
          <p className="text-wrap py-10 text-center text-xl text-[#676D73]">
            {
              "Oops! It looks like this listing isn't available for online booking right now. No worries, though! Just give us a call at 302-581-9342, and we'll be happy to assist you in finding the Perfect Vacation. We're here to help!"
            }
          </p>
          <p className="text-wrap text-center text-5xl font-bold text-primary">
            <a href="tel:302-581-9342">(302) 581-9342</a>
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Billing Address</h1>
          <div className="rounded-xl border border-[#EAEAEF] p-6">
            <BillingAddressForm params={params} allCountries={allCountries} />
          </div>
        </>
      )}
    </div>
  );
}
