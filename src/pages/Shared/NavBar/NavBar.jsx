/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";


const NavBar = () => { 
    const {isAdmin} = useAdmin()
    const {user, logOut} = useContext(AuthContext)
    const [refetch, cart, isLoading] = useCart()
    const handleLogOut=()=>{
        logOut()
         .then(()=>{ 
            Swal.fire({
                icon: "success",
                title: "Logged out successfully!",
                showConfirmButton: false,
                timer: 600
              });
         })
    }
    const navOp = <>
                <li className="hover:bg-slate-700 hover:text-yellow-500 hover:rounded-2xl bg-transparent border-0"><Link to="/">Home</Link></li>
                <li className="hover:bg-slate-700 hover:text-yellow-500 hover:rounded-2xl bg-transparent border-0"><Link to="/menu">Our Menu</Link></li>
                
                <li className="hover:bg-slate-700 hover:text-yellow-500 hover:rounded-2xl bg-transparent border-0"><Link to="/order/salads">Order Food</Link></li>
                {
                    user? <>
                    {
                        isAdmin? <></>: <Link to="dashboard/userhome" className="p-2 hover:bg-slate-700 hover:text-yellow-500 hover:rounded-2xl bg-transparent border-0">Dashboard</Link>
                         
                    }
                    
                    <li className="p-2 hover:bg-slate-700 hover:text-yellow-500 hover:rounded-2xl bg-transparent border-0" onClick={handleLogOut}>Log Out</li></> : <li className="hover:bg-slate-700 hover:text-yellow-500 hover:rounded-2xl bg-transparent border-0"><Link to="/login">Login</Link></li>
                }
                
                </>
    return (
        <div className="navbar bg-transparent bg-opacity-10 fixed z-40 text-slate-100 ">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
               {navOp}
            </ul>
            </div>
            <a className="btn btn-ghost text-white font-sherif hover:bg-slate-400 text-xl">Umbra Cafeteria</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
            {navOp}
            </ul>
        </div>
        <div className="navbar-end">
        {
            isAdmin? <Link to="/dashboard/adminhome" className="p-2 text-slate-400 py-3 hover:bg-slate-700 bg-black hover:text-yellow-500 hover:rounded-2xl rounded-lg border-0" >Dashboard</Link> : <Link to="/dashboard/mycart" className="btn"><FontAwesomeIcon icon={faShoppingCart}/><div className="badge badge-secondary">+{cart?.length || 0}</div></Link>
        }
           
        </div>
        </div>
    );
};

export default NavBar;