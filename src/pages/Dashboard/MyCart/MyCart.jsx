import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import Title from "../../Shared/Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill1Wave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const MyCart = () => {
    const [refetch, cart, isLoading] = useCart()
    console.log(cart);
    const total = cart.reduce((sum, item) => item.price + sum, 0)

    





    //perform delete function
    const handleDelete = (id) => {
        console.log(id);
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
                    fetch(`https://cafe-server-wmpu.vercel.app/delete/${id}`, {
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
                                    text: "Item deleted successfully!!",
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
        <>
            <Helmet>
                <title>Dashboard | My Cart</title>
            </Helmet>
            <div className="">
                <Title className='' heading={"wanna add more?"} subHeading={"My Cart"}></Title>
                <div className="card bg-white p-20">
                    <div className="flex justify-between uppercase">

                        <h1 className="text-2xl font-bold">Total Orders: {cart.length} </h1>
                        <h1 className="text-2xl font-bold">Total Price: $ {total} </h1>
                        {
                            total? <Link to="payment"  className="btn btn-sm btn-warning"> <FontAwesomeIcon icon={faMoneyBill1Wave} /> Pay</Link>:
                            <Link aria-disabled   className=" disabled:btn p-1 rounded-xl line-through border-slate-300 bg-slate-300"> <FontAwesomeIcon icon={faMoneyBill1Wave} /> Pay</Link>
                        }
                    </div>
                    <div className=" divider w-[800px]"></div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="bg-slate-300 text-slate-700 rounded-xl">
                                    <th>#</th>
                                    <th>Food</th>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {
                                isLoading ? (<tbody className="loading loading-spinner loading-md text-red-500 mx-96 mt-10"></tbody>) :
                                    (

                                        <tbody>
                                            {/* row 1 */}
                                            {cart.map((item, index) => <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>

                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={item.image} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p>{item.name}</p>
                                                </td>
                                                <td>$ {item.price}</td>
                                                <td> <FontAwesomeIcon onClick={() => handleDelete(item._id)} className=" bg-red-600 p-2 rounded-xl text-white" icon={faTrashCan} /> </td>
                                            </tr>)}

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

export default MyCart;