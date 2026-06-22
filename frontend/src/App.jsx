import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import CreateMember from "./pages/CreateMember";
import EditMember from "./pages/EditMember";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
<Route
    path="/members"
    element={<Members />}
/>
<Route
    path="/create-member"
    element={<CreateMember />}
/>
<Route
 path="/edit-member/:id"
 element={<EditMember />}
/>
<Route path="/profile" element={<Profile />} />
<Route
    path="/register"
    element={<Register />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;