

import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import {  useLocation, useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";


const CardComponent = ({item}) => {
    const [refetch] = useCart()
    const navigate = useNavigate()
    const location = useLocation()
    const  {name, _id, image, price} = item;
    const {user} = useContext(AuthContext)
    const handleCart = ()=>{
        if(user && user.email){
            const cartItem = {foodId: _id, name, price, image, email: user.email } 
            fetch("https://cafe-server-wmpu.vercel.app/carts", {
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
            .then(res=> res.json())
            .then(data=>{
                 console.log(data.insertedId);
                if(data.insertedId){
                    refetch();
                    Swal.fire({
                        icon: "success",
                        text: "Item added to cart successfully",
                    })
                } 
            } )
        }
        else{
                    Swal.fire({
                        title: "Please, login to add items to the cart",
                         icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Login Now" })
                      .then((result) => {
                        if (result.isConfirmed) {
                         navigate("/login", {state: {from:location}})
                        }
                      });
                }
            
        }
            
        

    
    return (
        <div className="card w-[280px] bg-slate-100 flex-col items-center justify-center shadow-2xl rounded-xl my-10">
             <figure><img className="mx-5 mb-16 " src={image} alt="" /></figure>
             <p className="absolute right-0 top-0 mt-4 mr-4 rounded-xl px-2 bg-slate-800 text-white">${price}</p>
            <div className="-mt-16 text-slate-700 text-center">
            <h3 className="uppercase text-xl">{name}</h3>
             <p className=" text-sm">Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets. </p>
             <button onClick={()=> handleCart(item)} className="btn hover:text-yellow-500 w-30 bg-slate-400 uppercase my-5 border-b-4 border-yellow-700  hover:border-yellow-700 hover:bg-slate-700 bg-transparent text-yellow-700 border-t-0 border-x-0">Add to Cart</button>
            </div>
        </div>
    );
};

export default CardComponent;