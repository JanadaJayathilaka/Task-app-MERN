import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Outlet, Routes } from "react-router-dom";
import { Layout, LogOut, Outdent } from "lucide-react";
// These are used but not imported:
import { useState } from "react";
import { useNavigate, Route } from "react-router-dom";
const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const handleAuthSubmit = (data) => {
    const user = {
      email: data.email,
      name: data.name || "User",
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        data.name || "User"
      )}&background=random`,
    };
    setCurrentUser(user);
    navigate("/", { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/login", { replace: true });
  };

  const ProtectedLayout = () => {
    <Layout user={currentUser} onLogout={handleLogout}>
      <Outlet />
    </Layout>;
  };
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"></div>
        }
      />
      <Route path="/" element={<Layout />} />
    </Routes>
  );
};

export default App;
