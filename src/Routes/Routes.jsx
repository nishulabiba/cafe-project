import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import PrivateRoute from "./PrivateRoute";
import NotAllowed from "./NotAllowed";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AdminRoute from "./AdminRoute";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/ManageItems/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
  
  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <ErrorPage/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/menu",
          element: <Menu/>
        },
        {
          path: "/order/:category",
          element: <Order/>
        },
        {
          path:"/login",
          element: <NotAllowed><Login/></NotAllowed>
        },
        {
          path: "/signup",
          element: <NotAllowed><SignUp/></NotAllowed>
        }
      ]
    },
    {
      path: "dashboard",
      element: <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>,
      errorElement: <ErrorPage/>,
      children: [
        //user routes
        {
          path: "userhome",
          element: <UserHome/>

        },
        {
          path: "mycart",
          element: <MyCart></MyCart>
        },
        {
          path: "mycart/payment",
          element: <Payment/>
        },{
          path: "payment-history",
          element: <PaymentHistory/>
        },
        ///admin routes
        {
          path: "adminhome",
          element: <AdminRoute>
            <AdminHome/>
          </AdminRoute>
        },
        {
          path: "all-users",
          element: <AdminRoute>
            <AllUsers/>
          </AdminRoute>
        },
        {
          path: "add-item",
          element: <AdminRoute>
            <AddItem/>
          </AdminRoute>
        },
        {
          path: "manage-items",
          element: <AdminRoute>
            <ManageItems/>
          </AdminRoute>
        },{
          path: "manage-items/:id",
          element: <AdminRoute>
            <UpdateItem/>
          </AdminRoute>
        },
      ]
    }
  ]);
