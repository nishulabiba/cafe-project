import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const usePayment = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;

        }

    })
    return {payments, isLoading}
};

export default usePayment;