
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure()
    const email = user?.email;
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading ,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${email}`);
            
            return res.data;
        }
    })
    return {isAdmin, isAdminLoading}
};

export default useAdmin;