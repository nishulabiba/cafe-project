import { useEffect, useState } from "react";
import Title from "../../Shared/Title/Title";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const PopularMenu = () => {
    const [data , setData ] = useState([])
    useEffect(()=>{
        fetch("/menu.json")
        .then(res=> res.json())
        .then(data=> {
            const popularItems = data.filter(item=> item.category === 'popular')
            setData(popularItems)
        })

    },[])
    return (
        <section className="mb-16 mx-16 flex flex-col items-center text-slate-500 font-serif">
            <Title heading={"From Our Menu"}
            subHeading={"Popular items"} />
            <div className=" grid grid-cols-2 gap-10">
            {
                data.map(item=>
                    <MenuItem key={item._id} item={item} />
                    )
            }
            </div>
            <button className="my-5 btn border-b-4 hover:bg-slate-300 bg-transparent text-black border-t-0 border-x-0 btn-outline">View Full Menu</button>
            <div className=" bg-black w-[1200px] h-[200px]">
                <h3 className="text-center text-4xl mt-20">Call Us : +8802374876</h3>
            </div>
        </section>
    );
};

export default PopularMenu;