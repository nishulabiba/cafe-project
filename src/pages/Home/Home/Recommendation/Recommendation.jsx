import Title from "../../../Shared/Title/Title";
import img from "./../../../../assets/home/slide1.jpg"

const Recommendation = () => {
    return (
        <section>
            <Title heading={"Chef Recommends"}
            subHeading={"Should try"} />
            <div className="m-10 flex justify-around items-center">
                <div className="card w-[280px] bg-slate-400 flex-col items-center justify-center shadow-2xl rounded-xl">
                    <img src={img} alt="" />
                   <div className="-mt-20 text-slate-700 bg-slate-300 text-center">
                   <h3 className="uppercase text-xl">Caeser Salad</h3>
                    <p className=" text-sm">Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets. </p>
                    <button className="btn hover:text-yellow-500 w-30 uppercase my-5 border-b-4 border-yellow-700 hover:bg-slate-700 bg-transparent text-yellow-700 border-t-0 border-x-0 btn-outline">Add to Cart</button>
                   </div>

                </div>
                <div className="card w-[280px] bg-slate-400 flex-col items-center justify-center shadow-2xl rounded-xl">
                    <img src={img} alt="" />
                   <div className="-mt-20 text-slate-700 bg-slate-300 text-center">
                   <h3 className="uppercase text-xl">Caeser Salad</h3>
                    <p className=" text-sm" >Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                    <button className="btn text-yellow-500 w-30 uppercase active my-5 border-spacing-0 bg-slate-700  btn-outline">Add to Cart</button>
                   </div>

                </div>
                <div className="card w-[280px] bg-slate-400 flex-col items-center justify-center shadow-2xl rounded-xl">
                    <img src={img} alt="" />
                   <div className="-mt-20 text-slate-700 bg-slate-300 text-center">
                   <h3 className="uppercase text-xl">Caeser Salad</h3>
                    <p className="text-sm my-2">Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                    <button className="btn hover:text-yellow-500 w-30 uppercase my-5 border-b-4 border-yellow-700 hover:bg-slate-700 bg-transparent text-yellow-700 border-t-0 border-x-0 btn-outline">Add to Cart</button>
                   </div>

                </div>
            </div>
            
        </section>
    );
};

export default Recommendation;