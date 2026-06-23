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
        <div className="container mt-4">

            <h1 className="mb-4">
                Dashboard
            </h1>

            <div className="row">

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Total Users</h5>
                            <h2>{data.total_users}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Admins</h5>
                            <h2>{data.total_admins}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Managers</h5>
                            <h2>{data.total_managers}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <h5>Members</h5>
                            <h2>{data.total_members}</h2>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-4">

                <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate("/members")}
                >
                    View Members
                </button>

                <button
                    className="btn btn-info me-2"
                    onClick={() => navigate("/profile")}
                >
                    Profile
                </button>

                <button
                    className="btn btn-danger"
                    onClick={() => {
                        localStorage.clear();
                        navigate("/");
                    }}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Dashboard;