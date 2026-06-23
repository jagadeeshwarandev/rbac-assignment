import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Members() {

    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState("");
    const [page,setPage] = useState(1);
    const navigate = useNavigate();
    useEffect(() => {
        loadMembers();
    }, [page]);

    const loadMembers = async () => {

    const response =
    await api.get(
    `/members?page=${page}`
    );

    setMembers(
    response.data.data
    );

        // setMembers(response.data);
    };

    // const deleteMember = async (id) => {

    //     await api.delete(`/members/${id}`);

    //     loadMembers();
    // };
    const deleteMember = async (id) => {

        if(!window.confirm(
            "Delete this member?"
        ))
        {
            return;
        }

        await api.delete(
            `/members/${id}`
        );

        loadMembers();
    };
    // const user = {
    // role: "admin"
    // };
    const user = JSON.parse(
        localStorage.getItem("user")
    ) || {};
// const userData = localStorage.getItem("user");

// const user = userData
//     ? JSON.parse(userData)
//     : {};
    return (
        <div className="container mt-4">

            <h1 className="mb-3">
                Members List
            </h1>

            {
            (user.role === "admin" ||
            user.role === "manager")
            &&
            (
            <button
                className="btn btn-success mb-3"
                onClick={() => navigate("/create-member")}
            >
                Add Member
            </button>
            )
            }

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="table-responsive">

                <table className="table table-bordered table-striped">

                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created Date</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                        members
                        .filter(member =>
                            member.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                        .sort((a, b) =>
                            a.name.localeCompare(b.name)
                        )
                        .map((member) => (

                            <tr key={member.id}>

                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.role}</td>
                                <td>{member.created_at}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() =>
                                            navigate(`/edit-member/${member.id}`)
                                        }
                                    >
                                        Edit
                                    </button>

                                    {
                                    user.role === "admin"
                                    &&
                                    (
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                            deleteMember(member.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                    )
                                    }

                                </td>
                                <td>
                                    {member.status == 1
                                        ? "Active"
                                        : "Inactive"}
                                </td>

                            </tr>

                        ))
                        }

                    </tbody>

                </table>

            </div>

            <div className="mt-3">

                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        page > 1 &&
                        setPage(page - 1)
                    }
                >
                    Prev
                </button>

                <span className="mx-3">
                    Page {page}
                </span>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        setPage(page + 1)
                    }
                >
                    Next
                </button>

            </div>

        </div>
    );
}

export default Members;