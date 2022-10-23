import { loadStripe } from '@stripe/stripe-js';


export async function checkout({lineItems}, user, id) { 
    try {

        let options = {
            method: 'POST',
            cache: 'default'
        }
        const res = await fetch(`http://localhost:3000/api/orders/createOrder?userId=${user.email}&id=${id}`,options)
        const order = await res.json()
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_API_KEY)        
        await stripe.redirectToCheckout({
            mode: 'payment',
            lineItems,
            successUrl: `${window.location.origin}/payment/success?orderId=${order}`,
            cancelUrl: `${window.location.origin}/payment/cancel?orderId=${order}`
        })
    } catch (error) {
        console.log(error)
    }

}