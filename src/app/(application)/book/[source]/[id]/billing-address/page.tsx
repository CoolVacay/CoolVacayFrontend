import BillingAddressForm from "./BillingAddressForm";

export default function Page({}) {
  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="text-2xl font-bold">Billing Address</h3>
      <div className="rounded-xl border border-[#EAEAEF] p-6">
        <BillingAddressForm />
      </div>
    </div>
  );
}
