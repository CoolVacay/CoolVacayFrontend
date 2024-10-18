import Stripe from "stripe";
import { type IPricingDetails } from "~/app/ui/components/listing/BookNow/BookNowCard.client";
import { type NextRequest, NextResponse } from "next/server";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface CheckoutRequest {
  successRedirectUrl: string;
  pricingDetails: IPricingDetails;
  quoteId?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Create Checkout Session from body params
    const { successRedirectUrl, pricingDetails, quoteId } =
      (await req.json()) as CheckoutRequest;

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      consent_collection: {
        payment_method_reuse_agreement: {
          position: "auto",
        },
      },
      payment_intent_data: {
        setup_future_usage: "off_session",
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Total Due Now", // Can be any description you prefer
            },
            unit_amount: Math.round(
              Number(
                pricingDetails?.confirmationAmount
                  ? pricingDetails.confirmationAmount
                  : pricingDetails.totalPrice,
              ) * 100,
            ), // Total amount in cents ($50.00)
          },
          quantity: 1,
        },
      ],
      // line_items: pricingDetails?.components.map(component => ({
      //   price_data: {
      //     currency: 'usd',
      //     product_data: {
      //       name: component.name
      //     },
      //     unit_amount: Number(component.total.toFixed(2))*100,
      //     },
      //     quantity: 1, // Assuming 1 quantity for the session
      // })),
      mode: "payment",
      payment_method_options: {
        card: {
          setup_future_usage: "off_session",
        },
      },
      return_url: `${successRedirectUrl}&quote_id=${quoteId}&session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: false },
    });

    // Redirect to the session URL
    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err: any) {
    // Handle Stripe errors
    console.log("Error:", err);
    return NextResponse.json(
      { error: `Internal Server Error: ${err}` },
      { status: 500 },
    );
  }
}
