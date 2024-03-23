import { useQuery } from "@tanstack/react-query";


const usePayment = () => {
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await fetch(`https://cafe-server-wmpu.vercel.app/payments`);
            return res.json();

        }

    })
    return {payments, isLoading}
};

export default usePayment;