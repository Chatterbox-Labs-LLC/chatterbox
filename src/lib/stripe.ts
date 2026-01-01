import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY is missing. Payment features will not work.')
}

export const stripe = new Stripe(stripeSecretKey || 'sk_placeholder', {
  typescript: true,
})
