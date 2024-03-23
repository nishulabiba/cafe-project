/* eslint-disable react-hooks/exhaustive-deps */
import { CardElement, useElements, useStripe, } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import './Checkout.css'
import useCart from "../../../hooks/useCart";


const CheckoutForm = ({ price, cart }) => {
    const { user } = useAuth()
    const [refetch] = useCart()
    const stripe = useStripe()
    const elements = useElements();
    const [err, setErr] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')


    useEffect(() => {

        if (price > 0) {
            const fetchFunc = async () => {
                try {
                    if (price) {
                        const response = await fetch('https://cafe-server-wmpu.vercel.app/create-payment-intent', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                // You might need to include additional headers if required by your API
                            },
                            body: JSON.stringify({
                                price
                            }),
                        });

                        const result = await response.json();
                        setClientSecret(result.clientSecret);
                    }
                } catch (error) {
                    console.error('Error posting data:', error);
                }
            };

            fetchFunc();
        }

    }, [])

    console.log('client secret', clientSecret);



    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        console.log('card', card);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card', card
        })
        console.log(
            paymentMethod
        );
        if (error) {
            console.log('error', error);
            setErr(error)
        }
        else {
            setErr('')
        }
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user.email || 'Unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        )
        if (confirmError) {
            console.log('confirm error', confirmError);
        }


        setProcessing(false)
        if (paymentIntent && paymentIntent?.status == 'succeeded') {
            setTransactionId(paymentIntent.id)

            //save payment history

            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                status: 'service pending',
                quantity: cart?.length,
                items: cart?.map(item => item.foodId),
                itemNames: cart?.map(item => item.name)

            }

            fetch('https://cafe-server-wmpu.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // You might need to include additional headers if required by your API
                },
                body: JSON.stringify(payment),

            })
                .then(res => res.json())
                .then(data => {
                    if (data.paymentResult.insertedId) {
                      fetch(`https://cafe-server-wmpu.vercel.app/carts/${user?.email}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                // You might need to include additional headers if required by your API
                            }
                        })
                            .then(res=> res.json())
                            .then(data=> {
                                refetch()
                                console.log(data);
                            })
                        Swal.fire({
                            icon: 'success',
                            title: 'Your transaction process has been completed'
                        })
                    }
                })

        }
        if (!paymentIntent) {
            console.log('paymentIntent', paymentIntent);
            Swal.fire({
                icon: 'error',
                title: 'Your transaction process has some problem'
            })
        }




    }
    return (
        <div>
            <form className="w-2/3 mx-auto" onSubmit={handleSubmit}>
                <CardElement className=" bg-slate-100 h-8 pt-2 shadow-2xl rounded-lg"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary btn-outline mt-4" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {err && <p className="text-red-600 mx-44">{err.message}</p>}

            {transactionId && <p className="text-green-600 mx-44">Transaction has been completed with id : {transactionId}</p>}




        </div >
    );
};

export default CheckoutForm;