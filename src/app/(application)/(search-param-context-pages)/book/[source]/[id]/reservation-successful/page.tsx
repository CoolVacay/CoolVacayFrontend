import { IconGenerator } from "~/app/ui/components/common";
import { bookingPayment } from "~/app/(application)/actions";
import Stripe from "stripe";

interface PageProps {
  params: {
    source: string;
    id: string;
  };
  searchParams: {
    numberOfGuests: string;
    fromDate: string;
    toDate: string;
    session_id: string;
    quote_id: string;
  };
}

interface CustomerDetails {
  name?: string;
  email: string;
  phone?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

interface SessionResponse {
  payment_intent: string;
  customer_details: CustomerDetails;
}

interface PaymentIntentResponse {
  client_secret: string;
  payment_method: string;
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function getStripeSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
}

async function getPaymentIntent(paymentIntentId: string) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return paymentIntent;
}

export default async function Page({ params, searchParams }: PageProps) {
  if (params.source === "Guesty") {
    try {
      const sessionId = searchParams.session_id;
      const session = (await getStripeSession(sessionId)) as SessionResponse;
      console.log(session, "session");
      const paymentIntent = (await getPaymentIntent(
        session.payment_intent,
      )) as PaymentIntentResponse;

      console.log(paymentIntent, "payment");

      const obj = {
        quoteId: searchParams.quote_id ?? null,
        ccToken: paymentIntent.payment_method ?? null,
        firstName: session.customer_details?.name?.split(" ")[0] ?? "",
        lastName: session.customer_details?.name?.split(" ")[1] ?? "",
        email: session.customer_details.email,
        phone: session.customer_details.phone ?? "",
        address1: session.customer_details.address.line1,
        address2: session.customer_details.address.line2 ?? "",
        city: session.customer_details.address.city,
        state: session.customer_details.address.state,
        zip: session.customer_details.address.postal_code,
        country: session.customer_details.address.country,
        listingId: params.id,
        source: params.source,
        fromDate: searchParams.fromDate,
        toDate: searchParams.toDate,
      };

      console.log({ obj });

      const bookingResp = await bookingPayment(obj);

      console.log({ bookingResp });
    } catch (err) {
      console.error("Error placing Guesty reservation:", err);
    }
  }
  return (
    <div className="m-4 flex w-full flex-col items-center justify-center">
      <IconGenerator
        src="/blue_check.svg"
        width="94px"
        alt="Booking confirmed icon"
        className="my-8"
      />
      <div className="flex flex-col items-center gap-3 text-[#676D73]">
        <h1 className="text-2xl font-bold text-black">Thank you!</h1>
        <h2 className="text-[16px]">
          Your booking details have been sent to your email.
        </h2>
        <h3 className="text-[16px]">
          You can download the booking as PDF below, or check it on the
          dashboard.
        </h3>
      </div>
    </div>
  );
}
