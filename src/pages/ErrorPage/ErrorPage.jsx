import { Link, useRouteError } from "react-router-dom";
import img from '../../assets/contact/404.gif'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft,  } from "@fortawesome/free-solid-svg-icons";


const ErrorPage = () => {
    
    const error = useRouteError();

  return (
    <div className="flex bg-white justify-center items-center" >
        
        <img src={img} alt="" />

      <div className="flex flex-col">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link className="btn rounded-xl btn-primary animate-bounce mt-10" to='/'><FontAwesomeIcon icon={faArrowLeft}/> Go Back !</Link>
      </div>
    </div>
  );
};

export default ErrorPage;