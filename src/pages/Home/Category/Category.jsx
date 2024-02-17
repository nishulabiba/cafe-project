
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import img1 from '../../../assets/home/slide1.jpg'
import img2 from '../../../assets/home/slide2.jpg'
import img3 from '../../../assets/home/slide3.jpg'
import img4 from '../../../assets/home/slide4.jpg'
import img5 from '../../../assets/home/slide5.jpg'

// import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import Title from '../../Shared/Title/Title';
const Category = () => {
    return (
        <section className='mb-10'>
            <Title
                heading = {'Order Online'}
                subHeading={"From 10.00am to 11.59pm"}
            />
        <Swiper
          slidesPerView={3}
          spaceBetween={0}
          autoplay={true}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper mx-20"
        >
          <SwiperSlide className=''>
            <img className='ms-20' src={img1} alt="" />
            <h3 className='text-4xl uppercase -mt-10 ms-36  text-white shadow-xl'>Salads</h3>
          </SwiperSlide>
          <SwiperSlide>
            <img className='ms-20' src={img2} alt="" />
            <h3 className='text-4xl uppercase -mt-10 ms-36 text-white shadow-xl'>Pizza</h3>
            </SwiperSlide> 
          <SwiperSlide>
            <img className='ms-20' src={img3} alt="" />
            <h3 className='text-4xl uppercase -mt-10 ms-36 text-white shadow-xl'>Soup</h3>
            </SwiperSlide>
          <SwiperSlide>
            <img className='ms-20' src={img4} alt="" />
            <h3 className='text-4xl uppercase -mt-10 ms-36 text-white shadow-xl'>Pastry</h3>
            </SwiperSlide>
          <SwiperSlide>
            <img className='ms-20' src={img5} alt="" />
            <h3 className='text-4xl uppercase -mt-10 ms-36 text-white shadow-xl'>Salads</h3>
            </SwiperSlide>
        </Swiper>
      </section>
    );
};

export default Category;