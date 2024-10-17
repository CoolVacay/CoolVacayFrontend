"use client";

import {
  // EmbeddedCheckoutProvider,
  // EmbeddedCheckout,
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getPricingDetails } from "~/app/(application)/actions";
import { type IListingData } from "~/app/(application)/definitions";
import { useRouter } from "next/navigation"; // For navigation
import "./styles.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
);

interface GuestyPaymentFormProps {
  fromDate: string;
  toDate: string;
  source: string;
  numberOfGuests: string;
  listingInfo: IListingData;
}

interface PaymentIntentResponse {
  paymentIntentId: string;
  paymentMethodId: string;
  clientSecret: string;
  error: any;
}

// const LoadingSkeleton = () => (
//   <div className="h-[60vh] animate-pulse">
//     <div className="flex w-full flex-col items-center justify-center gap-2">
//       <div className="mb-4 h-6 w-1/3 rounded bg-gray-300"></div>
//       <div className="mb-4 h-6 w-1/3 rounded bg-gray-300"></div>
//       <div className="mb-4 h-6 w-1/3 rounded bg-gray-300"></div>
//       <div className="mb-4 h-6 w-1/2 rounded bg-gray-300"></div>
//       <div className="mb-4 h-6 w-1/4 rounded bg-gray-300"></div>
//       <div className="mb-4 h-6 w-1/3 rounded bg-gray-300"></div>
//       <div className="mb-4 h-6 w-1/3 rounded bg-gray-300"></div>
//       <div className="mb-4 h-6 w-1/2 rounded bg-gray-300"></div>
//       <div className="mb-4 h-6 w-1/4 rounded bg-gray-300"></div>
//     </div>
//   </div>
// );

function GuestyPaymentForm({
  fromDate,
  toDate,
  source,
  numberOfGuests,
  listingInfo,
}: GuestyPaymentFormProps) {
  // const [loading, setLoading] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  // const router = useRouter();
  const handlePayment = async () => {
    try {
      const details = await getPricingDetails(
        source,
        listingInfo.id,
        fromDate,
        toDate,
        numberOfGuests,
      );
      if (!stripe || !elements) return;

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)!,
      });
      if (error) {
        console.error(error.message);
        // setLoading(false);
        return;
      }

      // Fetch client secret from the server
      const resp = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency: "USD",
          pricingDetails: details,
          paymentMethodId: paymentMethod.id,
          successRedirectUrl: `${window.location.origin}/book/${source}/${listingInfo.id}/reservation-successful?numberOfGuests=${numberOfGuests}&fromDate=${fromDate}&toDate=${toDate}`,
        }),
      });

      const data = (await resp.json()) as PaymentIntentResponse;
      console.log(data, "data");
      if (data.error) {
        console.error(data.error);
        // setLoading(false);
        return;
      }

      const { clientSecret } = data;

      const { error: confirmError } =
        await stripe.confirmCardPayment(clientSecret);
      if (confirmError) {
        console.error(confirmError.message);
        // setLoading(false);
        return;
      }

      // Payment successful
      console.log(
        "Payment successful! Payment Method ID:",
        data.paymentMethodId,
      );
      // router.replace(
      //   `/book/${source}/${listingInfo.id}/reservation-successful?numberOfGuests=${numberOfGuests}&fromDate=${fromDate}&toDate=${toDate}`,
      // );
      // setLoading(false);
      // setOptions({ clientSecret: res.clientSecret });
    } catch (err) {
      console.error("Error fetching pricing details:", err);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div>
      <CardElement />
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
}

export default function GuestyPayment({
  fromDate,
  toDate,
  source,
  numberOfGuests,
  listingInfo,
}: GuestyPaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <GuestyPaymentForm
        fromDate={fromDate}
        toDate={toDate}
        source={source}
        numberOfGuests={numberOfGuests}
        listingInfo={listingInfo}
      />
    </Elements>
  );
}
