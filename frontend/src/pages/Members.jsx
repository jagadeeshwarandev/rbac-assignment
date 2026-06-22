import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Members() {

    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState("");
const navigate = useNavigate();
    useEffect(() => {
        loadMembers();
    }, []);

    const loadMembers = async () => {

        const response = await api.get("/members");

        setMembers(response.data);
    };

    const deleteMember = async (id) => {

        await api.delete(`/members/${id}`);

        loadMembers();
    };
    const user = {
    role: "admin"
};
// const userData = localStorage.getItem("user");

// const user = userData
//     ? JSON.parse(userData)
//     : {};
    return (
        <>
            <h1>Members List</h1>
{/* <button
    onClick={() =>
        navigate("/create-member")
    }
>
    Add Member
</button> */}
{
(user.role === "admin" ||
 user.role === "manager")
&&
(
<button
onClick={() =>
navigate("/create-member")
}
>
Add Member
</button>
)
}
<br /><br />
<input
    type="text"
    placeholder="Search by name"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

<br /><br />
            <table border="1">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        // members.map((member) => (
                    members
                    .filter(member =>
                        member.name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                    .map((member) => (
                            <tr key={member.id}>

                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.role}</td>

                                <td>
<button
    onClick={() =>
        navigate(`/edit-member/${member.id}`)
    }
>
    Edit
</button>

&nbsp;

{/* <button
    onClick={() =>
        deleteMember(member.id)
    }
>
    Delete
</button> */}
{
user.role === "admin"
&&
(
<button
onClick={() =>
deleteMember(member.id)
}
>
Delete
</button>
)
}
                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>
        </>
    );
}

export default Members;