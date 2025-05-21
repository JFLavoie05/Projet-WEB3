import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2025-04-30.basil",
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const items = body.items || []

    const line_items = items.map(item => ({
      price_data: {
        currency: 'cad',
        product_data: {
          name: item.nom,
        },
        unit_amount: parseInt(item.prix) * 100,
      },
      quantity: 1,
    }))

    const origin = request.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/panier`,
      cancel_url: `${origin}/cancel`,
    })

    return NextResponse.json({ id: session.id })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
