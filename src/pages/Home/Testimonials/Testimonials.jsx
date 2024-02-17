import { useEffect, useState } from "react";
import Title from "../../Shared/Title/Title";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";


const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(()=>{
        fetch("https://cafe-server-wmpu.vercel.app/reviews")
        .then(res=> res.json())
        .then(data=> setReviews(data))
    },[])
    return ( 
        <section className="my-20"> 
            <Title heading={"Testimonials"}
            subHeading={"What Our Client say"}/>
          <div className="mt-10">
          <Swiper
             autoplay={true}
             freeMode={true}
             navigation={{
               clickable: true,
             }}  modules={[Navigation, Autoplay ]} className=" mySwiper">
                {
                    reviews.map(review=> <SwiperSlide key={review._id}>
                        
                        <div className="my-10 mx-30 text-center flex flex-col justify-center items-center gap-4">
                        <Rating style={{width: "180px"}}
                        value={review.rating}
                        readOnly/>
                        <FontAwesomeIcon className="text-6xl text-black" icon={faQuoteLeft} />
                        <h1 className="w-[500px] my-10 text-slate-600">{review.details}</h1>
                        <h1 className="text-2xl text-orange-400 ">{review.name}</h1>
                        </div>
                    </SwiperSlide> )
                }

            </Swiper>
          </div>
            
        </section>
    );
};

export default Testimonials;