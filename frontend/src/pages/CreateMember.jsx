import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateMember() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "member",
        status: 1
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

            await api.post(
                "/members",
                form
            );

            alert("Member Created");

            navigate("/members");

        } catch (error) {

            console.log(error);

            alert("Failed");

        }
    };

    return (
        <div className="container mt-4">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="mb-4">
                                Create Member
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control mb-3"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={handleChange}
                                />

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control mb-3"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                />

                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control mb-3"
                                    placeholder="Phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control mb-3"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                />

                                <select
                                    name="role"
                                    className="form-select mb-3"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="member">Member</option>
                                </select>

                                <select
                                    name="status"
                                    className="form-select mb-3"
                                    value={form.status}
                                    onChange={handleChange}
                                >
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Save Member
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CreateMember;