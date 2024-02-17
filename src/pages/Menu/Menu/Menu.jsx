/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "./../../../assets/menu/banner3.jpg"
import dessertImg from "../../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../../assets/menu/pizza-bg.jpg"
import soupImg from "../../../assets/menu/soup-bg.jpg"
import saladImg from "../../../assets/menu/salad-bg.jpg"
import MenuCategory from "../MenuCategory/MenuCategory";
import useMenu from "../../../hooks/useMenu";
import Title from "../../Shared/Title/Title";
import { useParams } from "react-router-dom";

const Menu = () => {
    const [menu, refetch, isLoading, desserts, offers, pizzas, salads, soups, popular,]= useMenu()
    
    return (
        <div>
            <Helmet>
            <title>Cafeteria | Menu</title>
            </Helmet>
            <Cover img={menuImg} title={"Our menu"}/>
            <Title heading={"Today's offer"} subHeading={"Don't miss"} />
            
            <MenuCategory item={offers} />
            <MenuCategory item={desserts} menuImg={dessertImg} title={"desserts"}/>
            <MenuCategory item={salads} menuImg={saladImg} title={"salads"}/>
            <MenuCategory item={pizzas} menuImg={pizzaImg} title={"pizza"}/>
            <MenuCategory item={soups} menuImg={soupImg} title={"soups"}/>
            
        </div>
    );
};

export default Menu;