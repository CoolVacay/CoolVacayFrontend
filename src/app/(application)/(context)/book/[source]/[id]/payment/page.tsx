import PaymentForm from "./PaymentForm";
import { auth } from "~/auth";

export default async function Page({
  params,
}: {
  params: {
    source: string;
    id: string;
  };
}) {
  const session = (await auth())!;

  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="text-2xl font-bold">Payment</h3>
      <div className="rounded-xl border border-[#EAEAEF] p-6">
        <PaymentForm params={params} userId={Number(session.user!.id)} />
      </div>
    </div>
  );
}
