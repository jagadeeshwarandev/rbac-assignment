import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [data, setData] = useState({});

    useEffect(() => {

        loadDashboard();

    }, []);
    const navigate = useNavigate();
    const loadDashboard = async () => {

        const response = await api.get(
            "/dashboard"
        );

        setData(response.data);
    };

    return (
        <>
            <h1>Dashboard</h1>

            <h3>Total Users :
                {data.total_users}
            </h3>

            <h3>Total Admins :
                {data.total_admins}
            </h3>

            <h3>Total Managers :
                {data.total_managers}
            </h3>

            <h3>Total Members :
                {data.total_members}
            </h3>
<button
    onClick={() => navigate("/members")}
>
    View Members
</button>
<br />
<button
onClick={() => {

localStorage.clear();

navigate("/");

}}
>
Logout
</button>
        </>
    );
}

export default Dashboard;