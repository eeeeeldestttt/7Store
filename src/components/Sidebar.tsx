import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome,
  HiShoppingCart,
  HiWallet,
  HiCog6Tooth,
  HiSquares2X2,
  HiBars3,
  HiChevronLeft,
  HiUserCircle,
} from "react-icons/hi2";
import { useAuth } from "../context/AuthContext"; // ✅ import Auth context

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth(); // ✅ ambil data user dari context

  const menuItems = [
    { id: "home", label: "Home", icon: <HiHome />, path: "/" },
    { id: "games", label: "Games", icon: <HiSquares2X2 />, path: "/games" },
    { id: "carts", label: "Cart", icon: <HiShoppingCart />, path: "/cart" },
    { id: "history", label: "History", icon: <HiWallet />, path: "/orders" },
    { id: "settings", label: "Settings", icon: <HiCog6Tooth />, path: "/settings" },
  ];

  // ✅ Cek path aktif
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay untuk mobile */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-[90] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCollapsed(true)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.aside
            key="sidebar"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="fixed lg:sticky top-0 left-0 h-screen bg-slate-900 border-r border-slate-800 
              text-slate-200 z-[100] w-64 flex flex-col justify-between"
          >
            {/* Header Sidebar */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <button
                  onClick={() => setCollapsed(true)}
                  className="text-slate-400 hover:text-white"
                >
                  <HiChevronLeft size={22} />
                </button>
              </div>

              {/* Menu List */}
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-indigo-600 text-white shadow-md"
                        : "hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* 👤 User Info (bisa dari context Auth) */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/80">
              {user ? (
                <div
                  onClick={() => navigate("/profile")}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-slate-800 p-2 rounded-lg transition"
                >
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                      {user.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-white">
                      {user.username || "User"}
                    </p>
                    <p className="text-sm text-slate-400">
                      {user.bio || "Member"}
                    </p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
                >
                  <HiUserCircle size={20} />
                  <span>Login</span>
                </button>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Tombol buka sidebar */}
      {collapsed && (
        <motion.button
          key="open"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setCollapsed(false)}
          className="fixed top-4 left-4 z-[999] w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg hover:bg-indigo-700 transition"
        >
          <HiBars3 size={22} />
        </motion.button>
      )}
    </>
  );
}
