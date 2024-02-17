import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useMenu from "../../../hooks/useMenu";



const ManageItems = () => {
    const [filterCategory, setFilterCategory] = useState('')
    const [menu, refetch, isLoading] = useMenu()
    const filteredItems = menu?.filter(item => item.category === filterCategory)
    const handleDeleteItem = (id) => {
        Swal.fire({
            text: `Are you sure?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff0000",
            cancelButtonColor: "#D1A054",
            confirmButtonText: "Yes, Delete"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://cafe-server-wmpu.vercel.app/delete/item/${id}`, {
                        method: 'DELETE'
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
                        }
                        )
                }
            });
    }


    return (
        <>
            <Helmet>
                <title>Dashboard | All Users</title>
            </Helmet>
            <div className="card bg-white p-20 text-center">
                <div className="flex justify-between uppercase">

                    {
                        filterCategory ? <h1 className="text-2xl font-bold">Total {filterCategory} Items: {filteredItems?.length} </h1> :
                            <h1 className="text-2xl font-bold">Total Items: {menu?.length} </h1>
                    }
                    <br />
                    <select className="bg-slate-200 text-center px-3 py-2 rounded-xl"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option className=" font-serif " value="" >All</option>
                        <option value="salad">Salad</option>
                        <option value="soup">Soup</option>
                        <option value="dessert">Dessert</option>
                        <option value="pizza">Pizza</option>
                        <option value="drinks">Drinks</option>
                        <option value="offered">Offered</option>
                        <option value="popular">Popular</option>


                    </select>
                </div>
                <div className=" divider w-[800px]"></div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-slate-300 text-slate-700 rounded-xl">
                                <th className="text-center">#</th>

                                <th className="text-start">Food</th>
                                <th className="text-start">Name</th>
                                <th className=" text-start">Category</th>
                                <th className="text-center">Update</th>
                                <th className="text-center">Delete</th>
                            </tr>
                        </thead>
                        {
                            isLoading ? (<tbody className="loading loading-spinner loading-md text-red-500 mx-96 mt-10"></tbody>) :
                                (

                                    <tbody>
                                        {/* row 1 */}
                                        {
                                            filterCategory ?
                                                <>
                                                    {filteredItems?.map((item, index) => <tr key={item._id}>
                                                        <td className="text-center">{index + 1}</td>
                                                        <td className="text-center"><img style={{ borderRadius: '0 200px 0px 300px' }} className=" w-[100px]" src={item.image} alt="" /></td>
                                                        <td className="text-start"><p>{item.name}</p></td>
                                                        <td className="text-start"><p>{item.category}</p></td>
                                                        <td className="text-center"> <Link to={item._id}><label htmlFor="my_modal_6" className=""><FontAwesomeIcon className=" bg-yellow-600 p-2 rounded-xl text-white" icon={faEdit} /></label></Link>
                                                                    </td>

                                                        <td onClick={() => handleDeleteItem(item._id)} className="text-center"><FontAwesomeIcon className={`bg-red-600   p-2 rounded-xl text-white `} icon={faTrashCan} /></td>
                                                    </tr>)}
                                                </> :
                                                <>
                                                    {menu?.map((item, index) =>
                                                        <tr key={item._id}>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td className="text-center"><img style={{ borderRadius: '0 200px 0px 300px' }} className=" w-[100px]" src={item.image} alt="" /></td>
                                                            <td className="text-start"><p>{item.name}</p></td>
                                                            <td className="text-start"><p>{item.category}</p></td>
                                                            <td className="text-center"><Link to={item._id}><label htmlFor="my_modal_6" className=""><FontAwesomeIcon className=" bg-yellow-600 p-2 rounded-xl text-white" icon={faEdit} /></label></Link></td>

                                                            <td onClick={() => handleDeleteItem(item._id)} className="text-center"><FontAwesomeIcon className={`bg-red-600   p-2 rounded-xl text-white `} icon={faTrashCan} /></td>
                                                        </tr>
                                                    )
                                                    }
                                                </>
                                        }

                                    </tbody>
                                )
                        }

                    </table>
                </div>
            </div>



        </>
    );
};

export default ManageItems;