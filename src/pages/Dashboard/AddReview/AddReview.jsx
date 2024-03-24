import { Helmet } from "react-helmet-async";
import Title from "../../Shared/Title/Title";


const AddReview = () => {
    return (
        <div>
            <Helmet title="Dashboard | Review"/>
            <Title heading="give a review" subHeading="Sharing is caring..!"/>
            
        </div>
    );
};

export default AddReview;