import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    if(loading) {
        return <progress className="progress w-[1400px] ms-500"></progress>
    }
    if(user) {
        return children;
    }
    return <Navigate to="/login"></Navigate>
};

export default PrivateRoute;