
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Title from "../../../Shared/Title/Title";
import { useQuery } from "@tanstack/react-query";


const UpdateItem = () => {
    const {id} = useParams() 

    const {refetch,  data: data = [] } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await fetch(`https://cafe-server-wmpu.vercel.app/menu/${id}`)
            return res.json();
        }
    })

    console.log(data);
    const {
        register,
        handleSubmit, control,
        formState: { errors },
    } = useForm()
    refetch()
    const onSubmit = (data) => {

        console.log(data);

    }

    return (
            
                <div className=" min-w-max min-h-max max-h-3xl max-w-5xl ">
                    <Title heading="Update now" subHeading="Asking for a change?"></Title>
                    <form onSubmit={handleSubmit(onSubmit)} className=" p-10">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipe Name</span>
                            </label>
                            <input type="text" defaultValue={data?.name}  placeholder="name" {...register("name", { required: true })} className="input input-bordered" />
                            {errors.name && <small className="text-red-500">This field is required</small>}
                        </div>
                        <div className=" flex justify-center gap-5 items-center">
                            <div className=" form-control w-[350px]">
                                <label className="label ">
                                    <span className="label-text">Category*</span>
                                </label>
                                <Controller
                                    name="category"
                                    control={control}
                                    defaultValue={data?.category}


                                    render={({ field }) => (
                                        <select defaultValue={data?.category} className=" rounded-lg input" required {...field}>
                                            <option disabled aria-disabled >Pick One</option>
                                            <option value="pizza">Pizza</option>
                                            <option value="salad">Salad</option>
                                            <option value="soup">Soup</option>
                                            <option value="dessert">Dessert</option>
                                            <option value="offered">Offered</option>
                                            <option value="popular">Popular</option>
                                            <option value="drinks">Drinks</option>
                                        </select>
                                    )}
                                />
                            </div>
                            <div className="form-control mt-5">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="number" defaultValue={data?.price}  step={0.01} placeholder="price" {...register("price", { required: true, min: 0 })} className="input input-bordered w-[350px]" />
                                {errors.price && <small className="text-red-500">The price must be a number</small>}
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipe Details</span>
                            </label>
                            <input type="text" defaultValue={data?.recipe}  placeholder="recipe details" {...register("recipe", { required: true })} className="input input-bordered input-lg pt-5 pb-20" />
                            {errors.recipe && <small className="text-red-500">This field is required</small>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Food Image</span>
                            </label>
                            <input type="text" value={data.image}  placeholder="url" {...register("image", { required: true })} className="input input-bordered input-lg pt-5 pb-20" />
                            {errors.image && <small className="text-red-500">This field is required</small>}
                        </div>


                        <div className="form-control mt-6 w-44 mx-auto">
                            <input type="submit" value="Modify" className="btn bg-yellow-700  border border-transparent font-serif" />
                        </div>
                    </form>
                    
                </div>
    );
};

export default UpdateItem;