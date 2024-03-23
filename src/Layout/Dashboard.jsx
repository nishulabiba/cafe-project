/* eslint-disable no-unused-vars */
import { faBars, faBarsProgress, faBook, faCalendar, faHome, faHomeUser, faShoppingCart, faSignOut, faUsers, faUtensils, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { faSquareLetterboxd } from "@fortawesome/free-brands-svg-icons";


const Dashboard = () => {
  // const isAdmin = true;
  //TODO: isAdmin Load it from data   later;
  const [isAdmin] = useAdmin()
  const { admin } = isAdmin;
  const { user, logOut } = useAuth()
  const [refetch, cart] = useCart()
  const navigate = useNavigate()
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out successfully!",
          showConfirmButton: false,
          timer: 500
        });
        navigate("/")
      })
  }
  return (
    <div className="drawer lg:drawer-open text-slate-700 bg-slate-200 ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center ">
        <Outlet />
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><FontAwesomeIcon icon={faBars} /></label>

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-5 w-80 min-h-full bg-[#D1A054] text-slate-700 ">
          <h1 className="text-slate-800 text-3xl font-bold font-serif mb-5">Umbra Cafeteria</h1>
          {/* Sidebar content here */}
          {
            admin ?
              <>
                <li><NavLink className="" to="/dashboard/adminhome"> <FontAwesomeIcon icon={faHomeUser} />Admin Home</NavLink></li>

                <li><NavLink className="" to="/dashboard/add-item"> <FontAwesomeIcon icon={faUtensils} />Add an Item</NavLink></li>
                <li><NavLink className="" to="/dashboard/manage-items"> <FontAwesomeIcon icon={faBarsProgress} />Manage Items</NavLink></li>
                <li><NavLink className="" to="/dashboard/manage-bookings"> <FontAwesomeIcon icon={faBook} />Manage Bookings</NavLink></li>
                <li><NavLink className="" to="/dashboard/all-users"> <FontAwesomeIcon icon={faUsers} />All Users</NavLink></li>
              </> : <>
                <li><NavLink className="" to="/dashboard/userhome"> <FontAwesomeIcon icon={faHomeUser} />User Home</NavLink></li>
                <li><NavLink className="" to="/dashboard/payment-history"> <FontAwesomeIcon icon={faWallet} />Payment History</NavLink></li>
                <li><NavLink className="" to="/dashboard/mycart"> <FontAwesomeIcon icon={faShoppingCart} />My Cart <span className="badge badge-secondary">+{cart?.length || 0}</span></NavLink></li>
                <li><NavLink className="" to="/dashboard/reservations"> <FontAwesomeIcon icon={faCalendar} />Reservations</NavLink></li>
                <li><NavLink className="" to="/dashboard/review"> <FontAwesomeIcon icon={faSquareLetterboxd} />Give Review</NavLink></li>
              </>
          }

          <div className="w-72 my-10 h-[1px] bg-slate-600"></div>

          <li ><NavLink to="/"><FontAwesomeIcon icon={faHome} />Home</NavLink></li>
          <li><NavLink to="/menu"> <FontAwesomeIcon icon={faBars} />Menu</NavLink></li>

          <li ><NavLink to="/order/salads"><FontAwesomeIcon icon={faUtensils} />Order Food</NavLink></li>
          <li ><button onClick={handleLogOut}><FontAwesomeIcon icon={faSignOut} />Sign Out</button></li>

        </ul>

      </div>
    </div>
  );
};

export default Dashboard;