import Stripe from 'stripe';
// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
  const urlObj = new URL(req.url ?? "");
  const paymentIntentId = urlObj.searchParams.get('payment_intent_id');

  try {
    const paymentIntent =
      await stripe.paymentIntents.retrieve(paymentIntentId ?? "");
    return new Response(
      JSON.stringify({
        paymentIntent
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    JSON.stringify({ message: 'Error getting payment intent' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    }
  }
}
