/* eslint-disable no-unused-vars */
import { faTrashCan, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";


const AllUsers = () => {
    const [filterRole, setFilterRole] = useState('')
    const { user } = useAuth()
    const email = user?.email;
    console.log(email);
    const { isLoading, refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://cafe-server-wmpu.vercel.app/users?email=${user?.email}`)
            return res.json();
        }
    })

    const filteredUsers = users.filter(item =>
        filterRole === '' || item.role === filterRole
    );
    const handleMakeAdmin = (user) => {
        const id = user._id;
        const name = user.name;
        /////////
        Swal.fire({
            title: `Make ${name} an admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff0000",
            cancelButtonColor: "#D1A054",
            confirmButtonText: "Yes"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://cafe-server-wmpu.vercel.app/users/admin/${id}`, {
                        method: 'PATCH'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data?.modifiedCount) {
                                refetch();
                                Swal.fire({
                                    icon: "success",
                                    title: "Updated",
                                    text: `${name} has been updated with an admin role.`,
                                    showConfirmButton: false,
                                    position: "top-right",
                                    timer: 800
                                })
                            }
                        })
                }
            });
        ////////


    }

    const handleRemoveAdmin = (user) => {
        const name = user.name;
        const id = user._id;
        if (user.email == email) {
            Swal.fire({
                icon: 'info',
                text: 'Sorry, You can not remove your role as an admin!'
            })
        }
        /////////
        else {
            Swal.fire({
                text: `Make ${name} a normal user?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#ff0000",
                cancelButtonColor: "#D1A054",
                confirmButtonText: "Yes"
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        fetch(`https://cafe-server-wmpu.vercel.app/delete/admin/${id}`, {
                            method: 'PATCH'
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data?.modifiedCount) {
                                    refetch();
                                    Swal.fire({
                                        icon: "success",
                                        title: "Updated",
                                        text: `${name} has been updated with a user role.`,
                                        showConfirmButton: false,
                                        position: "top-right",
                                        timer: 800
                                    })
                                }
                            })
                    }
                });
        }
        /////


    }

    return (
        <>
            <Helmet>
                <title>Dashboard | All Users</title>
            </Helmet>
            <div className="card bg-white p-20 text-center">
                <div className="flex justify-between uppercase">

                    <h1 className="text-2xl font-bold">Total users: {users?.length} </h1>
                    <br />
                    <select className="bg-slate-200 text-center px-3 py-2 rounded-xl"
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                    >
                        <option className=" font-serif " value= "" >All</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <div className=" divider w-[800px]"></div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-slate-300 text-slate-700 rounded-xl">
                                <th className="text-center">#</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Role</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        {
                            isLoading ? (<tbody className="loading loading-spinner loading-md text-red-500 mx-96 mt-10"></tbody>) :
                                (

                                    <tbody>
                                        {/* row 1 */}
                                        {
                                            filterRole ? 
                                            <>
                                            {filteredUsers?.map((item, index) => <tr key={item._id}>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center"><p>{item.name}</p></td>
                                                <td className="text-center">{item.email}</td>
                                                <td className="text-center"> {
                                                    item?.role === 'admin' ? 'admin' : 'user'

                                                }
                                                </td>

                                                <td className="text-center"> {
                                                    item?.role === 'admin' ?
                                                        <FontAwesomeIcon onClick={() => handleRemoveAdmin(item)} className={` ${item?.email == email ? 'bg-slate-200 line-through' : 'bg-red-600'}   p-2 rounded-xl text-white `} icon={faTrashCan} /> :
                                                        <FontAwesomeIcon onClick={() => handleMakeAdmin(item)} className=" bg-yellow-600 p-2 rounded-xl text-white" icon={faUsersViewfinder} />
                                                } </td>
                                            </tr>)}
                                            </> : 
                                            <>
                                                {users?.map((item, index) => <tr key={item._id}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td className="text-center"><p>{item.name}</p></td>
                                                    <td className="text-center">{item.email}</td>
                                                    <td className="text-center"> {
                                                        item?.role === 'admin' ? <div className="badge  badge-ghost">Admin</div> : <div className="badge badge-outline">User</div>

                                                    }
                                                    </td>

                                                    <td className="text-center"> {
                                                        item?.role === 'admin' ?
                                                            <FontAwesomeIcon onClick={() => handleRemoveAdmin(item)} className={` ${item?.email == email ? 'bg-slate-200 line-through' : 'bg-red-600'}   p-2 rounded-xl text-white `} icon={faTrashCan} /> :
                                                            <FontAwesomeIcon onClick={() => handleMakeAdmin(item)} className=" bg-yellow-600 p-2 rounded-xl text-white" icon={faUsersViewfinder} />
                                                    } </td>
                                                </tr>)}</>
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

export default AllUsers;