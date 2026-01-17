import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [page, setPage] = useState("login");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return page === "login" 
      ? <Login onNavigate={() => setPage("register")} /> 
      : <Register onNavigate={() => setPage("login")} />;
  }

  return user.role === "ADMIN" ? <AdminDashboard /> : <UserDashboard />;
}

export default App;