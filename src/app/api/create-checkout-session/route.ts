import { type NextApiRequest, type NextApiResponse } from 'next';
import Stripe from 'stripe';
// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { successRedirectUrl, pricingDetails } = await req.json();

  try {
    // Create Checkout Session from body params
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true
      },
      consent_collection: {
        payment_method_reuse_agreement: {
          position: 'auto'
        }
      },
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Total Due Now', // Can be any description you prefer
          },
          unit_amount: Math.round(Number(pricingDetails.confirmationAmount)* 100), // Total amount in cents ($50.00)
        },
        quantity: 1,
      }],
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
      mode: 'payment',
      return_url: `${successRedirectUrl}&session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: false },
    });

    // Redirect to the session URL
    return new Response(
      JSON.stringify({ clientSecret: session.client_secret }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    // Handle Stripe errors
    // res.status(err.statusCode || 500).json({ message: err.message });
    console.log(err)
    return new Response(
      JSON.stringify({ message: 'Error receiving strip session url' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function GET(req: NextApiRequest) {
  const urlObj = new URL(req.url ?? "");
  const sessionId = urlObj.searchParams.get('session_id');

  try {
    const session =
      await stripe.checkout.sessions.retrieve(sessionId ?? "");
    console.log(session);
    return new Response(
      JSON.stringify({
        session
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    JSON.stringify({ message: 'Error getting session' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    }
  }
}
