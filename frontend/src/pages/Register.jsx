import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [form,setForm] = useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        role:"member"
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await api.post(
            "/auth/register",
            form
        );

        alert("Registered Successfully");

        navigate("/");
    };

    return (
        <>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br/><br/>

                <select
                    name="role"
                    onChange={handleChange}
                >
                    <option value="member">
                        Member
                    </option>

                    <option value="manager">
                        Manager
                    </option>
                </select>

                <br/><br/>

                <button type="submit">
                    Register
                </button>

            </form>
        </>
    );
}

export default Register;