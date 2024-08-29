import BillingAddressForm from "./BillingAddressForm";
import { getCountries } from "~/app/(application)/actions";

export default async function Page({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const allCountries = (await getCountries())!;

  return (
    <div className="flex w-full flex-col gap-6">
      {params.source === "Lodgix" || params.source === "HostAway" ? (
        <div> 
          <p className="text-wrap text-2xl text-center text-[#676D73] py-10">Items coming from {params.source} currently can not be booked online. Please call this number to make a reservation:</p>
          <p className="text-wrap text-center text-primary text-5xl font-bold"><a href="tel:302-581-9342">(302) 581-9342</a></p>
        </div>  
      )
    : 
      <>
        <h1 className="text-2xl font-bold">Billing Address</h1>
        <div className="rounded-xl border border-[#EAEAEF] p-6">
          <BillingAddressForm params={params} allCountries={allCountries} />
        </div>
      </>
    }
    </div>
  );
}
