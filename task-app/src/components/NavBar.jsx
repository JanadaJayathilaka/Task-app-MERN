import React from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-gray-200 font-sans">
      <div className="flex item-center justify-between px-4 py-3 md:px-6 max-w-7xl mx-auto">
        {/* logo */}
        <div
          className="items-center flex gap-2 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div
            className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500
           via-purple-500 to-indigo-500 shadow-lg group-hover:shadow-purple-300/50 group-hover:scale-105 transition-all duration-300"
          >
            <Zap />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
