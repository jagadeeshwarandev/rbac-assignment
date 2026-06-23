function Profile() {

const user = JSON.parse(
localStorage.getItem("user")
);

return (
<div className="container mt-5">

<div className="row justify-content-center">

<div className="col-md-6">

<div className="card shadow">

<div className="card-body">

<h2 className="mb-4">
Profile
</h2>

<p>
<strong>Name :</strong> {user.name}
</p>

<p>
<strong>Email :</strong> {user.email}
</p>

<p>
<strong>Role :</strong> {user.role}
</p>

</div>

</div>

</div>

</div>

</div>
);
}

export default Profile;