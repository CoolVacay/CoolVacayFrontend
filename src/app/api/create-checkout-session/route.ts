import Stripe from "stripe";
import { type IPricingDetails } from "~/app/ui/components/listing/BookNow/BookNowCard.client";
import { NextResponse } from "next/server";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface CheckoutRequest {
  successRedirectUrl: string;
  currency: "USD";
  paymentMethodId: string;
  pricingDetails: IPricingDetails;
}

export async function POST(req: Request) {
  const body: CheckoutRequest = (await req.json()) as CheckoutRequest;

  const { successRedirectUrl, currency, pricingDetails, paymentMethodId } =
    body;
  console.log(successRedirectUrl, "ss");
  try {
    // Create Checkout Session from body params
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.floor(pricingDetails.confirmationAmount),
      currency,
      payment_method: paymentMethodId,
      confirm: true,
      return_url: `${successRedirectUrl}&session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({
      paymentIntentId: paymentIntent.id,
      paymentMethodId: paymentIntent.payment_method,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    // Handle Stripe errors
    //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const urlObj = new URL(req.url ?? "");
  const sessionId = urlObj.searchParams.get("session_id");

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId ?? "");
    console.log(session);
    return new Response(
      JSON.stringify({
        session,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    JSON.stringify({ message: "Error getting session" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      };
  }
}
