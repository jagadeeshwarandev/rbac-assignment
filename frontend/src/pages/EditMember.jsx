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
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className="card shadow">
                        <div className="card-body">

                            <h2 className="mb-4">
                                Edit Member
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <input
                                    className="form-control mb-3"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                />

                                <input
                                    className="form-control mb-3"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                />

                                <input
                                    className="form-control mb-3"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                />

                                <select
                                    className="form-select mb-3"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="member">Member</option>
                                </select>

                                <button
                                    type="submit"
                                    className="btn btn-warning"
                                >
                                    Update Member
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditMember;