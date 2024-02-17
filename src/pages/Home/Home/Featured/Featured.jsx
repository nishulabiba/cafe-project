import Title from "../../../Shared/Title/Title";
import featuedImg from "../../../../assets/home/featured.jpg"
import  "./Featured.css"


const Featured = () => {
    return (
        <section className="featured-item text-white pt-5 mt-5 bg-fixed">
            <Title heading={'featured item'}
            subHeading={'Check it out'}/>

            <div className="md:flex bg-blend-color-dodge bg-slate-600 bg-opacity-30 justify-center items-center py-20 px-16">
                <img className="w-[400px]" src={featuedImg} alt="" />
                <div className=" md:ml-10">
                    <p>20 Aug, 2029</p>
                    <p className="uppercase">Where can i get it?</p>
                    <p className="w-[500px] text-justify my-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic corrupti ex laudantium nam repudiandae a dicta officiis? Pariatur adipisci laboriosam iusto maiores consequuntur enim assumenda eveniet deleniti obcaecati, necessitatibus quo, recusandae praesentium illo eius ab nam amet ipsam, aut non dicta nemo? Provident eveniet facilis omnis inventore quos est quasi?</p>
                    <button className="btn border-b-4 hover:bg-slate-300 bg-transparent text-white border-t-0 border-x-0 btn-outline">Open</button>
                </div>
            </div>
            
        </section>
    );
};

export default Featured;