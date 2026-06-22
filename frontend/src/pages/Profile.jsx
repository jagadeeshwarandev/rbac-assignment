function Profile() {

    const user = {
        name: "Admin",
        email: "admin@test.com",
        role: "admin"
    };

    return (
        <>
            <h1>Profile</h1>

            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </>
    );
}

export default Profile;