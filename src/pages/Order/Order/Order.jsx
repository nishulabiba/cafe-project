/* eslint-disable no-unused-vars */
import Cover from "../../Shared/Cover/Cover";
import coverImg from "../../../assets/shop/banner2.jpg"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import CardComponent from "../../Shared/CardComonent/CardComponent";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const Order = () => {
    const categories = ["salads", "pizza", "soups", "dessert", "drinks"]
    const category = useParams()
    const initialIndex = categories.indexOf(category.category)
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const [menu, offers, pizzas, salads, soups, loading ] = useMenu()
    
    
    const drinks = menu?.filter(item=> item.category==="drinks")
    const desserts = menu?.filter(item=> item.category==="dessert")
    return (
        <div>
            <Helmet>
            <title>Cafeteria | Order Food</title>
            </Helmet>
            <Cover img={coverImg} title={"Our Shop"}/>
            <Tabs className=""  defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList >
                <Tab >SALAD</Tab>
                <Tab >PIZZA</Tab> 
                <Tab >SOUP</Tab> 
                <Tab >DESSERT</Tab> 
                <Tab >DRINKS</Tab> 
                </TabList>

                <TabPanel><OrderTab items={salads}/></TabPanel>
                <TabPanel><OrderTab items={pizzas}/></TabPanel>
                <TabPanel><OrderTab items={soups}/></TabPanel>
                <TabPanel><OrderTab items={desserts}/></TabPanel>
                <TabPanel><OrderTab items={drinks}/></TabPanel>
            </Tabs>
            
        </div>
    );
};

export default Order;