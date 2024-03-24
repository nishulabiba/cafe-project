/* eslint-disable no-unused-vars */

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Title from "../../Shared/Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const Reservation = () => {
    const {
        register,
        handleSubmit,
        reset
    } = useForm()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    

    const onSubmit = (data) => {
        const {date, time, guests, name, phone , email } = data
        axiosSecure.post('/reservations', {date, time, guests, name, phone , email: user?.email, price: 14, state: "pending" } )
            .then(response => {
                if (response.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        text: "Congrats, Your booking is successful!",
                        showConfirmButton: false
                    });
                }

                reset()
                // Optionally, you can perform actions after successful reservation
            })
            .catch(error => {
                console.error('Error making reservation:', error);
                // Optionally, you can handle errors here
            });
    };
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
      
        // Add leading zero if minutes are less than 10
        minutes = minutes < 10 ? '0' + minutes : minutes;
      
        // If the current time is within the same minute, increment the hour by 1
        if (minutes === '00') {
          hours++;
        }
      
        // Format the time as HH:MM
        const currentTime = `${hours}:${minutes}`;
      
        return currentTime;
      }

    return (
        <div className="flex flex-col items-center">
            <Helmet title="Dashboard | Reservation" />
            <Title heading="book a table" subHeading="Reservation" />
            <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full max-w-xs text-white flex flex-col gap-5 justify-center items-center">
                <div className="flex justify-evenly gap-5">
                    <div className="">
                        <div className="label">
                            <span className="label-text text-slate-600">Date*</span>
                        </div>
                        <input type="Date" placeholder="--/--/--" {...register("date", { required: true })} className="input input-bordered w-[200px] max-w-xs" min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="">
                        <div className="label">
                            <span className="label-text text-slate-600">Time*</span>
                        </div>
                        <input type="time" min={getCurrentTime()} placeholder="--:--" {...register("time", { required: true})} className="input input-bordered w-[200px] max-w-xs" />
                    </div>
                    <div className="">
                        <div className="label">
                            <span className="label-text text-slate-600">Guests*</span>
                        </div>

                        <input type="number" max={6} min={1} {...register("guests", { required: true })} placeholder="1 person" className="input input-bordered w-[200px] max-w-xs" />
                    </div>
                </div>
                <div className="flex justify-evenly gap-5">
                    <div className="">
                        <div className="label">
                            <span className="label-text text-slate-600">Name*</span>
                        </div>
                        <input type="text" placeholder="Type your name" {...register("name", { required: true })} className="input input-bordered w-[200px] max-w-xs" />
                    </div>
                    <div className="">
                        <div className="label">
                            <span className="label-text text-slate-600">Phone*</span>
                        </div>
                        <input type="tel" placeholder="Give phone number" {...register("phone", { required: true })} className="input input-bordered w-[200px] max-w-xs" />
                    </div>
                    <div className="">
                        <div className="label">
                            <span className="label-text text-slate-600">Email*</span>
                        </div>

                        <input type="email" value={user?.email} max={6} min={1} {...register("email", { required: true })}  className="input input-bordered w-[200px] min-w-xl" />
                    </div>
                </div>
                <button type="submit" className=" btn bg-[#D1A054] border-none -ms-1 text-white">Book a Table <FontAwesomeIcon icon={faClipboardList} /></button>
            </form>
            <div className="footer p-10 flex justify-between text-base-content max-w-screen-2xl text-center">
                <nav>
                    <h6 className="footer-title bg-[#D1A054] px-28 py-4 text-white">Address</h6>
                    <h1 className=" mx-auto">Head Quarter, Leaf Village </h1>
                </nav>
                <nav>
                    <h6 className="footer-title bg-[#D1A054] px-28 py-4 text-white">Contacts</h6>
                    <h1 className=" mx-auto">(+880)1776365334</h1>
                </nav>
                <nav>
                    <h6 className="footer-title bg-[#D1A054] px-28 py-4 text-white">Social</h6>
                    <div className="grid grid-flow-col gap-4 mx-auto">
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                    </div>
                </nav>
            </div>

        </div>
    );
};

export default Reservation;