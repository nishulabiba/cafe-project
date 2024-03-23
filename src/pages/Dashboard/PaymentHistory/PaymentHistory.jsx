import { Helmet } from "react-helmet-async";
import usePayment from "../../../hooks/usePayment";
import Title from "../../Shared/Title/Title";
import useAuth from "../../../hooks/useAuth";


const PaymentHistory = () => {
    const { payments, isLoading } = usePayment()
    const { user } = useAuth()
    const email = user?.email
    const history = payments.filter(item=> item.email== email)
    const spent = history.reduce((sum, item) => sum + item.price, 0);
    return (
        <>
            <Helmet>
                <title>Dashboard | Payment History</title>
            </Helmet>
            <div className="">
                <Title className='' heading={"payment history"} subHeading={"Look Here"}></Title>
                <div className="card bg-white p-20">
                    <div className="flex justify-between uppercase">

                        <h1 className="text-2xl font-bold">Total Orders: {history.length} </h1>
                        <h1 className="text-2xl font-bold">Total Spent: $ {spent} </h1>
                        {/* <h1 className="text-2xl font-bold">Total Price: $</h1> */}

                    </div>
                    <div className=" divider w-[800px]"></div>
                    <div className="overflow-x-auto">
                        <table className="table text-center table-striped table-danger">
                            {/* head */}
                            <thead>
                                <tr className="bg-slate-300 text-slate-700 rounded-xl">
                                    <th>Email</th>
                                    <th>Category</th>
                                    <th>Total Price</th>
                                    <th>Payment Date</th>
                                </tr>
                            </thead>
                            {
                                isLoading ? (<tbody className="loading loading-spinner loading-md text-red-500 mx-96 mt-10"></tbody>) :
                                    (

                                        <tbody>
                                            {/* row 1 */}
                                            {history.map((item) => 
                                                    <tr key={item._id} className="my-2">
                                                        <td>{item.email}</td>
                                                        <td>Food</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.date}</td>
                                                    </tr>
                                                
                                            )}

                                        </tbody>
                                    )
                            }


                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;