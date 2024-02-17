
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar, faMugHot, faTruck, faUsers,} from "@fortawesome/free-solid-svg-icons";
import Chart from "../../../components/Chart";
import axios from "axios";
import Chart1 from "../../../components/Chart1";


const AdminHome = () => {
    const { user } = useAuth()
    const email = user?.email;
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats', email],
        queryFn: async () => {
            const res = await fetch("https://cafe-server-wmpu.vercel.app/admin-stats")
            return res.json()

        }
    })

    const {data: chartData=[]} = useQuery({
        queryKey: ["client-data"],
        queryFn: async()=>{
            const res = await axios.get("https://cafe-server-wmpu.vercel.app/order-stats")
            return res.data;
        }
    })
    return (
        <div>
            <Helmet title="Dashboard | Admin Home" />

            <h1 className=" text-2xl font-serif text-center">Hi <span className=" text-amber-600">{user.displayName}</span>, Welcome Back ! </h1>
            <div className="stats shadow w-[800px]  bg-slate-50 mt-10 mx-[120px]">

                <div className="stat">
                    <div className="stat-figure  text-secondary">
                        <FontAwesomeIcon className="w-[50px]" icon={faMoneyCheckDollar}/>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value"> ${stats.revenue}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FontAwesomeIcon icon={faUsers}/>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{stats.customers}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FontAwesomeIcon icon={faMugHot}/>
                    </div>
                    <div className="stat-title">Products</div>
                    <div className="stat-value">{stats.products}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FontAwesomeIcon icon={faTruck}/>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats.orders}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

            </div>
            <div className="flex">
                <div className="w-1/2">
                    <Chart chartData={chartData}/>
                </div>
                <div className="w-1/2">
                    <Chart1 chartData={chartData}/>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;