
// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({item, menuImg, title}) => {
    
    return (
        <div className="">
            {title && <Cover img={menuImg} title={title}/>}
            <div className="flex flex-col justify-center items-center">
            <div className="grid grid-cols-2 gap-2 mt-20">
            {
                (item && item.map(item=> <MenuItem item={item} key={item._id}/>))
            }
            </div>
            <Link to={`/order/${title}`} className="my-10 uppercase text-center btn border-b-4 hover:bg-slate-300 bg-transparent text-black border-t-0 border-x-0 btn-outline">order your favorite food</Link>
            </div>
        </div>
    );
};

export default MenuCategory;