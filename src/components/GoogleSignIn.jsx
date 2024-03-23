/* eslint-disable no-unused-vars */
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase/firebase.config';


const GoogleSignIn = () => {
    const gProvider = new GoogleAuthProvider();
    const auth = getAuth(app)
    const { googleSignIn, facebookSignIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    const handleGoogleSignIn = () => {
        signInWithPopup(auth , gProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log("GoogleUser: ", user);
                // IdP data available using getAdditionalUserInfo(result)
                if (user) {
                    const savedUser = { name: user.displayName, email: user.email }
                    fetch("https://cafe-server-wmpu.vercel.app/users", {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(savedUser)
                    })
                        .then(res => res.json()
                            .then(data => {
                                if (data.insertedId) {
                                    Swal.fire({
                                        icon: "success",
                                        text: "You've successfully created an account..!",
                                        showConfirmButton: false
                                    });
                                    navigate(from, { replace: true })

                                }
                            }))
                }

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                // ...
            });
    }

    const handleFacebookSignIn = () => {
        facebookSignIn()
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log("fb user ", user);
                // IdP data available using getAdditionalUserInfo(result)

                Swal.fire({
                    icon: "success",
                    title: "Welcome",
                    text: "You've successfully signed in..!",
                });
                navigate(from, { replace: true })
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                // ...
            });


    }
    return (
        <div className="my-3">

            <div className="flex mx-5 justify-between items-center ">
                <div className=" w-32 h-[1px] bg-slate-400"></div>
                <span className=" text-slate-400">OR</span>
                <div className=" w-32 h-[1px] bg-slate-400"></div>
            </div>
            <div className="flex justify-center gap-5">
                <button onClick={handleGoogleSignIn} className="btn btn-square btn-outline">
                    <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={handleFacebookSignIn} className="btn btn-square btn-outline">
                    <FontAwesomeIcon icon={faFacebook} />
                </button>
            </div>
        </div>
    );
};

export default GoogleSignIn;