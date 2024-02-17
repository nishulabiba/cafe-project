/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import GoogleSignIn from "../../components/GoogleSignIn";


const SignUp = () => {
    const { createUser, updateUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()
    const onSubmit = (data) => {
        console.log(data);
        const { name, email, password, photoURL } = data;
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log("registered", user);
                if (user) {
                    updateUser(name, photoURL)
                        .then(() => {
                            const savedUser = { name: name, email: email }
                            fetch("https://cafe-server-wmpu.vercel.app/users", {
                                method: 'POST',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(savedUser)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    if (data.insertedId) {
                                        reset();
                                        Swal.fire({
                                            icon: "success",
                                            text: "You've successfully created an account..!",
                                            showConfirmButton: false
                                        });
                                        navigate(from, { replace: true })

                                    }
                                })



                        })
                        .catch(err => console.log(err))

                }

            })

    }
    return (
        <>
            <Helmet> <title>Cafeteria | Sign Up</title></Helmet>

            <div className="hero min-h-screen bg-slate-100 text-slate-700">
                <div className="hero-content flex-col lg:flex-row gap-5">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                        <p className="py-6 ">Provident cupiditate voluptatem et in. <br /> Quaerat fugiat ut assumenda excepturi exercitationem quasi.
                            <br /> In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card  w-full max-w-sm shadow-2xl bg-slate-200">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-10">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" {...register("name", { required: true })} className="input input-bordered" />
                                {errors.name && <small className="text-red-500">This field is required</small>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo url</span>
                                </label>
                                <input type="text" placeholder="photo url" {...register("photoURL", { required: true })} className="input input-bordered" />
                                {errors.photoURL && <small className="text-red-500">This field is required</small>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email"  {...register("email", { required: true })} className="input input-bordered" required />
                                {errors.email && <small className="text-red-500">This field is required</small>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true, minLength: 8, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/ })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && <small className="text-red-500">Please, enter your password</small>}
                                {errors.password?.type === "minLength" && <small className="text-red-500">Password must be more than 8 characters</small>}
                                {errors.password?.type === "pattern" && <small className="text-red-500">Password must include at least an uppercase character, a lowercase character and a digits</small>}

                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="SignUp" className="btn btn-primary" />
                            </div>
                        </form>
                        <small className="text-center">Already have an account? <Link to="/login" className="text-primary">Login now</Link></small>
                        <GoogleSignIn />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;