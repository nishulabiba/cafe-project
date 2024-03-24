/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useCart = ()=>{
    const axiosSecure = useAxiosSecure()

    const {user} = useContext(AuthContext);
    const token = localStorage.getItem('access_token')
    const { refetch, data: cart = [], isLoading } = useQuery({
      queryKey: ['cart', token],
      queryFn: async() => {
          const res = await axiosSecure.get(`/carts?email=${user?.email}`);
          
          return res.data;
          
      }
  })

  return [ refetch, cart, isLoading,]

    }

export default useCart;