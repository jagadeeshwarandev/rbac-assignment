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
        <>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>
<button
type="button"
onClick={() =>
navigate("/register")
}
>
Register
</button>
            </form>
        </>
    );
}

export default Login;