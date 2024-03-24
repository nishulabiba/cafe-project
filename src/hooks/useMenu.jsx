import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useMenu = () => {
    const [menuData, setMenuData] = useState({
        salads: [],
        soups: [],
        offers: [],
        popular: [],
        pizzas: []
    });

    const { data: menu = [], refetch, isLoading } = useQuery({
        queryKey: ["menu"],
        queryFn: async () => {
            const res = await fetch(`https://cafe-server-wmpu.vercel.app/menu`);
            return res.json();
        }
    });

    useEffect(() => {
        if (menu && menu.length > 0) {
            const groupedMenu = menu.reduce((acc, item) => {
                acc[item.category] = [...(acc[item.category] || []), item];
                return acc;
            }, {});

            setMenuData(prevState => ({
                ...prevState,
                salads: groupedMenu["salad"] || [],
                soups: groupedMenu["soup"] || [],
                pizzas: groupedMenu["pizza"] || [],
                offers: groupedMenu["offered"] || [],
                popular: groupedMenu["popular"] || []
            }));
        }
    }, [menu]);

    return [menu, refetch, isLoading, menuData.offers, menuData.pizzas, menuData.salads, menuData.soups, menuData.popular];
};

export default useMenu;