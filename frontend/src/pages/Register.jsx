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
        <div className="container mt-5">

        <div className="row justify-content-center">

        <div className="col-md-5">

        <div className="card shadow">

        <div className="card-body">

        <h2 className="mb-4 text-center">
        Register
        </h2>

        <form onSubmit={handleSubmit}>

        <input
        className="form-control mb-3"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        />

        <input
        className="form-control mb-3"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        />

        <input
        className="form-control mb-3"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        />

        <input
        type="password"
        className="form-control mb-3"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        />

        <select
        className="form-select mb-3"
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

        <button
        type="submit"
        className="btn btn-success w-100"
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

export default Register;