/* eslint-disable no-unexpected-multiline */


import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";



const useMenu = () => {
    const [salads, setSalads] = useState([])
    const [soups, setSoups] = useState([])
    const [offers, setOffers] = useState([])
    const [popular, setPopular] = useState([])
    const [pizzas, setPizzas] = useState([])
    const { data: menu = [], refetch, isLoading } = useQuery({
        queryKey: "menu",
        queryFn: async () => {
            const res = await fetch(`https://cafe-server-wmpu.vercel.app/menu`)
            return res.json();
        }
    })

    useEffect
        (() => {
            const salads = menu?.filter(item => item.category === "salad")
            setSalads(salads)
            const soups = menu?.filter(item => item.category === "soup")
            setSoups(soups)
            const pizzas = menu?.filter(item => item.category === "pizza")
            setPizzas(pizzas)
            const offers = menu?.filter(item => item.category === "offered")
            setOffers(offers)
            const popular = menu?.filter(item => item.category === "popular")
            setPopular(popular)
        }, [menu])
    return [menu, refetch, isLoading, offers, pizzas, salads, soups, popular,];
};

export default useMenu;