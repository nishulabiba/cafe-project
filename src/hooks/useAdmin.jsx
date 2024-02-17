
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";


const useAdmin = () => {
    const {user, loading} = useAuth()
    const email = user?.email;
    const { data: isAdmin = [], isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading ,
        queryFn: async () => {
            const res = await fetch(`https://cafe-server-wmpu.vercel.app/users/admin/${email}`);
            const y = await res.json()
            return y;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;