import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";


const AdminRoute = ({children}) => {
    const {isAdmin, isAdminLoading} = useAdmin()
    const {user, loading} = useAuth()
    const location = useLocation()
    if(loading || isAdminLoading){
        return <progress className=" progress-secondary w-96"></progress>
    }
    if(isAdmin && user) {
        return children

    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;