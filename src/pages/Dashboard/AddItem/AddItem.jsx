import { Controller, useForm } from "react-hook-form";
import Title from "../../Shared/Title/Title";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const img_hosting_token = import.meta.env.VITE_image_upload_token;
const AddItem = () => {
    const {user} = useAuth()
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
    const {
        reset,
        register,
        handleSubmit, control,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append('image', data.image[0])
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res=> res.json())
        .then(imgRes=>{
            if(imgRes.success){
                const img = imgRes.data.display_url;
                const {name, recipe, category, price} = data;
                const newItem ={name, recipe, image:img, category, price: parseFloat(price)}
                console.log(newItem);
                fetch(`https://cafe-server-wmpu.vercel.app/menu?email=${user?.email}`,{
                    method: 'POST',
                    headers: {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify(newItem)
                })
                .then(res=> res.json())
                .then(data=>{
                    if(data.insertedId){
                        Swal.fire({
                            icon: 'success',
                            titleText: 'You have added an item successfully!',
                            timer: 600,
                            showConfirmButton: false
                        })
                        reset();
                    }
                })
            }
        })
    }
    return (
        <>
            <Helmet title="Dashboard | Add Item">

            </Helmet>
            <div className=" w-full text-slate-400">

                <Title heading={'add an item'} subHeading={"What's new?"}></Title>

                <div className="bg-white card w-4/5 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body p-10">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipe Name</span>
                            </label>
                            <input type="text" placeholder="name" {...register("name", { required: true })} className="input input-bordered" />
                            {errors.name && <small className="text-red-500">This field is required</small>}
                        </div>
                        <div className=" flex justify-between items-center">
                            <div className=" form-control w-[350px]">
                                <label className="label ">
                                    <span className="label-text">Category*</span>
                                </label>
                                <Controller
                                    name="category"
                                    control={control}
                                    defaultValue="pizza"
                                    

                                    render={({ field }) => (
                                        <select className=" rounded-lg input" required {...field}>
                                            <option disabled >Pick One</option>
                                            <option value="pizza">Pizza</option>
                                            <option value="salad">Salad</option>
                                            <option value="soup">Soup</option>
                                            <option value="dessert">Dessert</option>
                                            <option value="drinks">Drinks</option>
                                        </select>
                                    )}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="number" step={0.01} placeholder="price" {...register("price", { required: true, min: 0 })} className="input input-bordered w-[350px]" />
                                {errors.price && <small className="text-red-500">The price must be a number</small>}
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipe Details</span>
                            </label>
                            <input type="text" placeholder="recipe details" {...register("recipe", { required: true })} className="input input-bordered input-lg pt-5 pb-20" />
                            {errors.recipe && <small className="text-red-500">This field is required</small>}
                        </div>
                        <input
                            className=" file-input-bordered rounded-xl mt-4 bg-slate-200 pe-20"
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            {...register('image')}
                        />

                        <div className="form-control mt-6 w-44 mx-auto">
                            <input type="submit" value="Add" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddItem;