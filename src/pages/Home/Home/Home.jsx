import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";
import Featured from "./Featured/Featured";
import Recommendation from "./Recommendation/Recommendation";
import Section from "./Section/Section";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Cafeteria | Home</title>
            </Helmet>
            <Banner/>
            <Category/>
            <Section/>
            <PopularMenu/>
            <Recommendation/>
            <Featured/>
            <Testimonials/>
            
        </div>
    );
};

export default Home;