import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  HiShoppingCart,
  HiBell,
  HiUserCircle,
  HiX,
} from "react-icons/hi";
import { HiMagnifyingGlass, HiBars3, HiArrowRightOnRectangle } from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart, removeFromCart } = useCart();

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const cartMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Efek scroll dengan threshold yang lebih smooth
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (cartMenuRef.current && !cartMenuRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-slate-700/50"
            : "bg-slate-900/80 backdrop-blur-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div
                onClick={() => navigate("/")}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src="/assets/images/logo7store.png"
                    alt="7Store Logo"
                    className="w-16 h-16 object-contain p-2 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg group-hover:scale-105 transition-transform duration-300 border border-slate-700/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-500/10 rounded-2xl" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent drop-shadow-md">
                    7Store
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">Premium Gaming Store</p>
                </div>
              </div>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form
                onSubmit={handleSearchSubmit}
                className="relative w-full group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative flex items-center bg-slate-800/90 rounded-xl px-4 py-3 border border-slate-700/50 group-focus-within:border-yellow-400/50 transition-all duration-300">
                  <HiMagnifyingGlass className="text-slate-400 mr-3 flex-shrink-0" size={20} />
                  <input
                    type="text"
                    placeholder="Cari game, topup, atau rewards..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent flex-1 text-slate-100 outline-none placeholder-slate-500 text-lg font-medium"
                  />
                </div>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => navigate("/games")}
                className="px-4 py-2 text-slate-300 hover:text-yellow-400 font-medium transition-colors duration-200 hover:bg-slate-800/50 rounded-lg"
              >
                Games
              </button>
              <button
                onClick={() => navigate("/help")}
                className="px-4 py-2 text-slate-300 hover:text-yellow-400 font-medium transition-colors duration-200 hover:bg-slate-800/50 rounded-lg"
              >
                Help
              </button>
              <button
                onClick={() => navigate("/rewards")}
                className="px-4 py-2 text-slate-300 hover:text-yellow-400 font-medium transition-colors duration-200 hover:bg-slate-800/50 rounded-lg"
              >
                Rewards
              </button>
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-3 relative">
              {/* Cart Button */}
              <div className="relative" ref={cartMenuRef}>
                <button
                  className="relative p-3 rounded-xl hover:bg-slate-800/70 transition-all duration-200 group"
                  onClick={() => {
                    setIsCartOpen(!isCartOpen);
                    setIsProfileMenuOpen(false);
                  }}
                >
                  <HiShoppingCart 
                    size={24} 
                    className="text-slate-300 group-hover:text-yellow-400 transition-colors duration-200" 
                  />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-amber-500 text-black text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                      {totalCartItems}
                    </span>
                  )}
                </button>

                {/* Cart Dropdown */}
                {isCartOpen && (
                  <div className="absolute right-0 top-full mt-3 w-96 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
                    <div className="p-4 border-b border-slate-700/50">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <HiShoppingCart className="mr-2 text-yellow-400" />
                        Keranjang Belanja
                        <span className="ml-2 bg-yellow-500 text-black text-sm px-2 py-1 rounded-full">
                          {totalCartItems} items
                        </span>
                      </h3>
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {cart.length > 0 ? (
                        cart.slice(0, 4).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-4 border-b border-slate-700/30 hover:bg-slate-700/50 transition-all duration-200 group"
                          >
                            <img
                              src={item.image || "/assets/images/default-item.png"}
                              alt={item.name}
                              className="w-14 h-14 rounded-xl object-cover border border-slate-600"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-slate-100 font-medium text-sm truncate">
                                {item.name}
                              </p>
                              <p className="text-yellow-400 text-sm font-semibold">
                                {item.quantity}x Rp{item.price.toLocaleString()}
                              </p>
                              <p className="text-slate-400 text-xs">
                                Total: Rp{(item.quantity * item.price).toLocaleString()}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-all duration-200 opacity-0 group-hover:opacity-100"
                            >
                              <HiX size={18} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <HiShoppingCart size={48} className="text-slate-600 mx-auto mb-3" />
                          <p className="text-slate-400 text-lg font-medium">Keranjang kosong</p>
                          <p className="text-slate-500 text-sm mt-1">Yuk tambahkan item favoritmu!</p>
                        </div>
                      )}
                    </div>
                    
                    {cart.length > 4 && (
                      <div className="p-3 bg-slate-700/30 border-t border-slate-700/50">
                        <p className="text-center text-slate-400 text-sm">
                          Dan {cart.length - 4} item lainnya...
                        </p>
                      </div>
                    )}
                    
                    {cart.length > 0 && (
                      <div className="p-4 border-t border-slate-700/50">
                        <button
                          onClick={() => {
                            navigate("/cart");
                            setIsCartOpen(false);
                          }}
                          className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                        >
                          Lihat Keranjang Lengkap
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Notification Button */}
              <button className="relative p-3 rounded-xl hover:bg-slate-800/70 transition-all duration-200 group">
                <HiBell 
                  size={24} 
                  className="text-slate-300 group-hover:text-emerald-400 transition-colors duration-200" 
                />
                <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-slate-900"></span>
              </button>

              {/* Profile Section */}
              {user ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(!isProfileMenuOpen);
                      setIsCartOpen(false);
                    }}
                    className="flex items-center space-x-3 p-1 rounded-xl hover:bg-slate-800/70 transition-all duration-200 group"
                  >
                    {user.photo ? (
                      <div className="relative">
                        <img
                          src={user.photo}
                          alt="Profile"
                          className="w-11 h-11 rounded-xl object-cover border-2 border-transparent group-hover:border-yellow-400 transition-all duration-200 shadow-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-amber-500/20 rounded-xl" />
                      </div>
                    ) : (
                      <div className="w-11 h-11 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center text-slate-900 font-bold text-lg shadow-lg">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="hidden lg:block text-left">
                      <p className="text-white font-medium text-sm">{user.username}</p>
                      <p className="text-slate-400 text-xs">Lihat profil</p>
                    </div>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
                      <div className="p-4 border-b border-slate-700/50">
                        <p className="text-white font-semibold text-lg">{user.username}</p>
                        {user.bio && (
                          <p className="text-slate-400 text-sm mt-1 truncate">{user.bio}</p>
                        )}
                        <p className="text-yellow-400 text-xs mt-2 font-medium">Status: Premium Member</p>
                      </div>
                      
                      <div className="p-2">
                        <button
                          onClick={() => handleNavigation("/profile")}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-slate-200 hover:bg-slate-700/50 rounded-xl transition-all duration-200 group"
                        >
                          <HiUserCircle size={20} className="text-slate-400 group-hover:text-yellow-400" />
                          <span className="font-medium">Profile Saya</span>
                        </button>
                        
                        <button
                          onClick={() => handleNavigation("/orders")}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-slate-200 hover:bg-slate-700/50 rounded-xl transition-all duration-200 group"
                        >
                          <HiShoppingCart size={18} className="text-slate-400 group-hover:text-yellow-400" />
                          <span className="font-medium">Pesanan Saya</span>
                        </button>
                        
                        <button
                          onClick={logout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 group mt-2"
                        >
                          <HiArrowRightOnRectangle size={20} />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-2.5 text-slate-300 hover:text-white font-medium transition-colors duration-200 hover:bg-slate-800/70 rounded-xl"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 font-bold px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                  >
                    Daftar Sekarang
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-800/70 transition-colors duration-200"
              >
                <HiMagnifyingGlass size={22} className="text-slate-300" />
              </button>

              {/* Mobile Cart Button */}
              <button
                className="relative p-2 rounded-lg hover:bg-slate-800/70 transition-colors duration-200"
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsProfileMenuOpen(false);
                }}
              >
                <HiShoppingCart size={22} className="text-slate-300" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-xs rounded-full flex items-center justify-center font-bold">
                    {totalCartItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-800/70 transition-colors duration-200"
              >
                <HiBars3 size={24} className="text-slate-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <div 
              ref={mobileMenuRef}
              className="absolute right-0 top-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/50 shadow-2xl transform transition-transform duration-300"
            >
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src="/assets/images/logo7store.png"
                      alt="7Store Logo"
                      className="w-12 h-12 object-contain rounded-xl bg-slate-800"
                    />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                      7Store
                    </h1>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
                  >
                    <HiX size={24} />
                  </button>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="mb-6">
                  <div className="relative">
                    <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      placeholder="Cari game..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-slate-100 placeholder-slate-500 outline-none focus:border-yellow-400/50"
                    />
                  </div>
                </form>

                {/* User Info */}
                {user ? (
                  <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-xl mb-4">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt="Profile"
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center text-slate-900 font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-white font-medium">{user.username}</p>
                      <p className="text-slate-400 text-sm">Lihat profil</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-3 mb-6">
                    <button
                      onClick={() => handleNavigation("/login")}
                      className="flex-1 px-4 py-3 text-slate-300 border border-slate-700 rounded-xl font-medium"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => handleNavigation("/register")}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 font-bold rounded-xl"
                    >
                      Daftar
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Navigation */}
              <nav className="p-4">
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavigation("/")}
                    className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl font-medium transition-colors"
                  >
                    Beranda
                  </button>
                  <button
                    onClick={() => handleNavigation("/games")}
                    className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl font-medium transition-colors"
                  >
                    Games
                  </button>
                  <button
                    onClick={() => handleNavigation("/topup")}
                    className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl font-medium transition-colors"
                  >
                    Top Up
                  </button>
                  <button
                    onClick={() => handleNavigation("/rewards")}
                    className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl font-medium transition-colors"
                  >
                    Rewards
                  </button>
                  <button
                    onClick={() => handleNavigation("/cart")}
                    className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl font-medium transition-colors flex items-center justify-between"
                  >
                    <span>Keranjang</span>
                    {totalCartItems > 0 && (
                      <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                        {totalCartItems}
                      </span>
                    )}
                  </button>
                </div>

                {user && (
                  <div className="mt-6 pt-4 border-t border-slate-700/50">
                    <button
                      onClick={() => handleNavigation("/profile")}
                      className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl font-medium transition-colors"
                    >
                      Profile Saya
                    </button>
                    <button
                      onClick={() => handleNavigation("/orders")}
                      className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl font-medium transition-colors"
                    >
                      Pesanan Saya
                    </button>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-medium transition-colors mt-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-20"></div>

      {/* Tambahkan animasi fadeIn di CSS global atau tailwind config */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}