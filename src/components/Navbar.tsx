import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HiHome,
  HiSquares2X2,
  HiShoppingCart,
  HiQuestionMarkCircle,
  HiBell,
  HiUserCircle,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart, removeFromCart } = useCart();

  // Efek scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup semua dropdown saat pindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
    setIsCartOpen(false);
  }, [location]);

  const navItems = [
    { path: "/", label: "Home", icon: <HiHome size={18} /> },
    { path: "/games", label: "Games", icon: <HiSquares2X2 size={18} /> },
    { path: "/orders", label: "Orders", icon: <HiShoppingCart size={18} /> },
    { path: "/help", label: "Help", icon: <HiQuestionMarkCircle size={18} /> },
  ];

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/90 backdrop-blur-lg shadow-lg border-b border-slate-800"
            : "bg-slate-900/60 backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* ✅ Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center space-x-3 cursor-pointer select-none hover:scale-105 transition-transform"
            >
              <img
                src="/assets/images/logo7store.png"
                alt="7Store Logo"
                className="w-16 h-16 object-contain p-1 rounded-lg bg-slate-800 shadow-md"
              />
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 drop-shadow-md">
                7Store
              </h1>
            </div>

            {/* ✅ Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 font-semibold shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* ✅ Right Section */}
            <div className="hidden md:flex items-center space-x-3 relative">
              {/* 🛒 Cart Preview */}
              <button
                className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors"
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsProfileMenuOpen(false);
                }}
              >
                <HiShoppingCart size={22} className="text-slate-200" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-xs rounded-full flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* 🔽 Dropdown Preview Cart */}
              {isCartOpen && (
                <div className="absolute right-20 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
                  <div className="max-h-64 overflow-y-auto">
                    {cart.length > 0 ? (
                      cart.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 px-3 py-2 border-b border-slate-700 hover:bg-slate-700 transition-all"
                        >
                          <img
                            src={item.image || "/assets/images/default-item.png"}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="text-slate-100 font-medium text-sm">
                              {item.name}
                            </p>
                            <p className="text-yellow-400 text-xs">
                              {item.quantity}x Rp{item.price.toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 text-xs hover:text-red-500"
                          >
                            Hapus
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-slate-400 py-4 text-sm">
                        Keranjang masih kosong
                      </div>
                    )}
                  </div>
                  {cart.length > 3 && (
                    <p className="text-center text-slate-400 text-xs py-1">
                      dan {cart.length - 3} item lainnya...
                    </p>
                  )}
                  <button
                    onClick={() => navigate("/cart")}
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 font-semibold py-2 hover:opacity-90 transition-opacity"
                  >
                    Lihat Selengkapnya
                  </button>
                </div>
              )}

              {/* 🔔 Notification */}
              <button className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <HiBell size={22} className="text-slate-200" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full"></span>
              </button>

              {/* 👤 Profile */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(!isProfileMenuOpen);
                      setIsCartOpen(false);
                    }}
                    className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover border-2 border-yellow-500 shadow-sm"
                      />
                    ) : (
                      <div className="w-9 h-9 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden animate-fadeIn">
                      <div className="px-4 py-3 border-b border-slate-700 text-center">
                        <p className="text-white font-medium">{user.username}</p>
                        {user.bio && (
                          <p className="text-slate-400 text-xs mt-1">{user.bio}</p>
                        )}
                      </div>
                      <button
                        onClick={() => navigate("/profile")}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-slate-200 hover:bg-slate-700 transition-colors"
                      >
                        <HiUserCircle size={18} />
                        <span>Profile</span>
                      </button>
                      <button
                        onClick={logout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-red-400 hover:bg-slate-700 transition-colors"
                      >
                        <HiArrowRightOnRectangle size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 font-semibold px-4 py-2 rounded-lg hover:scale-105 transition-transform shadow-md"
                >
                  Register
                </button>
              )}
            </div>

            {/* ☰ Mobile Menu Toggle */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-slate-800 transition-all"
              >
                <div
                  className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-white transition-all ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="h-16"></div>

      {/* Overlay close area */}
      {(isMobileMenuOpen || isProfileMenuOpen || isCartOpen) && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsProfileMenuOpen(false);
            setIsCartOpen(false);
          }}
        ></div>
      )}
    </>
  );
}
