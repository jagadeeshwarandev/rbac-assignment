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
        <div>

            <h1>Create Member</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="member">Member</option>
                </select>

                <br /><br />

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>

                <br /><br />

                <button type="submit">
                    Save
                </button>

            </form>

        </div>
    );
}

export default CreateMember;