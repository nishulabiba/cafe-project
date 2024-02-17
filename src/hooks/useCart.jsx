/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useCart = ()=>{
    

    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('access_token')
    const { refetch, data: cart = [], isLoading } = useQuery({
      queryKey: ['cart', token],
      queryFn: async() => {
          const res = await fetch(`https://cafe-server-wmpu.vercel.app/carts?email=${user?.email}`);
          
          return res.json();
          
      }
  })

  return [ refetch, cart, isLoading,]

    }

export default useCart;