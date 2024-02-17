import { Elements } from "@stripe/react-stripe-js";
import Title from "../../Shared/Title/Title";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";


const Payment = () => {
    
    const [ , cart] = useCart()
    const total = cart.reduce((sum, item) => item.price + sum, 0);
    const price = parseFloat(total.toFixed(2))
    const publishable_key = import.meta.env.VITE_publishable_key ;
    const stripePromise= loadStripe(publishable_key)
    return (
        <div className="w-full mx-auto">
        <Helmet title="Dashboard | Payment" />
            <Title heading='Payment' subHeading='Please, process'></Title>

            <Elements stripe={stripePromise}>
                <CheckoutForm cart={cart} price={price}/>
            </Elements>
        </div>
        
    );
};

export default Payment;