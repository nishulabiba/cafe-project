import { useQuery } from "@tanstack/react-query";


const useReview = () => {
    
    const {  data: reviews = [], } = useQuery({
        queryKey: ['reviews'],
        queryFn: async() => {
            const res = await fetch(`https://cafe-server-wmpu.vercel.app/reviews`);
            return res.json();
            
        }
       
    })
    return reviews;
};

export default useReview;