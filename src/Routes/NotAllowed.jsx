import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate } from "react-router-dom";

const NotAllowed = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    if(loading) {
        return <progress className="progress w-[1400px]"></progress>
    }
    if(user) {
        return <Navigate to="/"></Navigate> 
    }
    return children;
};

export default NotAllowed;