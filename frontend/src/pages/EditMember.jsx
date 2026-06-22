import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditMember() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        status: 1
    });

    useEffect(() => {
        loadMember();
    }, []);

    const loadMember = async () => {

        const response =
            await api.get(`/members/${id}`);

        setForm(response.data);
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await api.put(
            `/members/${id}`,
            form
        );

        alert("Updated");

        navigate("/members");
    };

    return (
        <>
            <h1>Edit Member</h1>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="admin">
                        Admin
                    </option>

                    <option value="manager">
                        Manager
                    </option>

                    <option value="member">
                        Member
                    </option>
                </select>

                <br /><br />

                <button type="submit">
                    Update
                </button>

            </form>

        </>
    );
}

export default EditMember;