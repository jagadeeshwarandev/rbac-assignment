import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                form
            );

            if(response.data.status === false)
            {
                alert(response.data.message);
                return;
            }

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

                    } 
            catch (error) {

                alert(
                    error.response?.data?.message ||
                    "Login Failed"
                );
            }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">

                    <div className="card shadow">
                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Login
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary w-100 mt-2"
                                    onClick={() => navigate("/register")}
                                >
                                    Register
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;