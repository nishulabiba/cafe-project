import { Helmet } from "react-helmet-async";
import Title from "../../Shared/Title/Title";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";


const MyBookings = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reservations?email=${user?.email}`)
            return res.data;
        }
    })
    console.log(bookings);
    const total = bookings.reduce((sum, item) => item.price + sum, 0)
    const handleDelete = (id) => {
        Swal.fire({
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff0000",
            cancelButtonColor: "#D1A054",
            confirmButtonText: "Yes, delete"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://cafe-server-wmpu.vercel.app/delete/booking/${id}`, {
                        method: 'DELETE',
                        headers: { "Content-Type": "application/json" }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data?.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    icon: "success",
                                    title: "DELETE",
                                    text: "Booking cancelled successfully!!",
                                    showConfirmButton: false,
                                    position: "top-right",
                                    timer: 800
                                })
                            }
                        })
                }
            });
    }
    
    return (
        <div>
            <Helmet title="Dashboard | Bookings" />
            <Title heading="My bookings" subHeading=" Here are " />
            <div className="card bg-white p-20">
                <div className="flex justify-between uppercase">

                    <h1 className="text-2xl font-bold">Total Bookings: {bookings.length} </h1>
                    <h1 className="text-2xl font-bold">Total Price: ${total} </h1>

                </div>
                <div className=" divider w-[800px]"></div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-slate-300 text-slate-700 rounded-xl">
                                <th>#</th>
                                <th>Name</th>
                                <th className="text-center">Date</th>
                                <th>Time</th>
                                <th>Guest Number</th>
                                <th>Price</th>
                                <th className="text-center">State</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        {
                            isLoading ? (<tbody className="loading loading-spinner loading-md text-red-500 mx-96 mt-10"></tbody>) :
                                (

                                    <tbody>
                                        {/* row 1 */}
                                        {bookings.map((item, index) => <tr key={item._id}>
                                            <td>{index + 1}</td>

                                            <td>
                                                <p>{item.name}</p>
                                            </td>
                                            <td className="text-center">{item.date}</td>
                                            <td>{item.time}</td>

                                            <td className="text-center">{item.guests}</td>
                                            <td>$ {item.price}</td>
                                            <td>
                                                {item.state === "pending" ? (
                                                    <span className="badge badge-warning">pending</span>
                                                ) : item.state === "confirmed" ? (
                                                    <span className="badge badge-success">confirmed</span>
                                                    
                                                ) : (
                                                    <span className="badge badge-danger">declined</span>
                                                )}
                                            </td>
                                            <td className="text-center"> {item.state === "pending" ? (
                                                <FontAwesomeIcon
                                                    onClick={() => handleDelete(item._id)}
                                                    className="bg-red-600 p-2 rounded-xl text-white"
                                                    icon={faTrashCan}
                                                />
                                            ) : (
                                                <Link to="payment" className="badge badge-warning">Pay</Link>
                                            )}
                                            </td>
                                        </tr>)}
                                    </tbody>
                                )
                        }

                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyBookings;