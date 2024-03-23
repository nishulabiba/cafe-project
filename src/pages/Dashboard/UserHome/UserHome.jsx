import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "../../Shared/Title/Title";
import { faCartShopping, faPhone, faStar, faWallet } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import useReview from "../../../hooks/useReview";
import usePayment from "../../../hooks/usePayment";
import useCart from "../../../hooks/useCart";


const UserHome = () => {

    const { user } = useAuth()
    const reviews = useReview()
    const {payments} = usePayment()
    const [, cart] = useCart()

    const payment = payments.reduce((count, item) => {
        if (item.email === user?.email) {
            return count + 1;
        }
        return count;
    }, 0);
    const paid = payments.reduce((count, item) => {
        if (item.email === user?.email) {
            return item.price+count;
        }
        return count;
    }, 0);
    console.log(paid);
    const review = reviews.reduce((count, item) => {
        if (item.email === user?.email) {
            return count + 1;
        }
        return count;
    }, 0);
    const shop = cart.reduce((count, item) => {
        if (item.email === user?.email) {
            return count + 1;
        }
        return count;
    }, 0);


    const emailItemTotal = payments.reduce((total, item) => {
        if (item.email === user?.email) {
            return total + item.items.length;
        }
        return total;
    }, 0);
    console.log(emailItemTotal);
    return (
        <div className=" flex flex-col justify-center items-center">
            <Title heading={"Welcome"} subHeading={"Hi"} />
            <div className="stats shadow bg-opacity-60 w-[800px]">

                <div className="stat ">
                    <div className="stat-figure text-secondary">
                        <FontAwesomeIcon icon={faWallet} />
                    </div>
                    <div className="stat-value">{paid}</div>
                    <div className="stat-desc">Total spent</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                    <div className="stat-value">{shop}</div>
                    <div className="stat-desc">Shop</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div className="stat-value">{payment}</div>
                    <div className="stat-desc">Contact</div>
                </div>

            </div>
            <div className="-mt-20">
                <div className="hero min-h-screen bg-transparent">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="flex flex-col items-center">
                            <img src={user?.photoURL} className="rounded-full w-[150px]" />
                            <h1 className="text-3xl font-serif">{user?.displayName}</h1>
                        </div>
                        <div className="w-[2px] h-[200px] mx-40 bg-black bg-opacity-30"></div>
                        <div className="flex flex-col gap-3">
                            <h1 className=" text-blue-500"> <FontAwesomeIcon icon={faCartShopping} /> Orders: {emailItemTotal } </h1>
                            <h1 className=" text-teal-500"> <FontAwesomeIcon icon={faStar} /> Reviews: {review} </h1>
                            <h1 className=" text-orange-400"> <FontAwesomeIcon icon={faCalendar} /> Bookings: loading... </h1>
                            <h1 className=" text-red-500"> <FontAwesomeIcon icon={faWallet} /> Payment: {payment} </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;