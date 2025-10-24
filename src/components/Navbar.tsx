import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HiShoppingCart,
  HiBell,
  HiUserCircle,
  HiArrowRightOnRectangle,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart, removeFromCart } = useCart();

  // Efek scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

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
                className="w-14 h-14 object-contain p-1 rounded-lg bg-slate-800 shadow-md"
              />
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 drop-shadow-md">
                7Store
              </h1>
            </div>

            {/* 🔍 Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center bg-slate-800 rounded-lg px-3 py-1.5 w-64 focus-within:ring-2 focus-within:ring-yellow-400 transition-all"
            >
              <HiMagnifyingGlass className="text-slate-400 mr-2" size={18} />
              <input
                type="text"
                placeholder="Cari game atau topup..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent flex-1 text-sm text-slate-100 outline-none placeholder-slate-500"
              />
            </form>

            {/* ✅ Right Section */}
            <div className="flex items-center space-x-3 relative">
              {/* 🛒 Cart Button */}
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

              {/* 🔽 Dropdown Cart */}
              {isCartOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden animate-fadeIn">
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
          </div>
        </div>
      </header>

      <div className="h-16"></div>
    </>
  );
}
