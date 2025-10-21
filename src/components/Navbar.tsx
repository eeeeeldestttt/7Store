import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HiHome,
  HiSquares2X2,
  HiShoppingCart,
  HiQuestionMarkCircle,
  HiBell,
  HiUserCircle,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";

// ✅ Import logo dari folder src/assets/images/
import logo7store from "../assets/images/logo7store.png"; // pastikan file ada di src/assets/images/

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(2);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu saat pindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
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
            {/* Logo + Brand */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center space-x-3 cursor-pointer select-none"
            >
              <img
                src={logo7store} // ✅ otomatis resolve dari import
                alt="7Store Logo"
                className="w-30 h-14 rounded-lg object-cover shadow-lg"
              />
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 drop-shadow-md">
                7Store
              </h1>
            </div>

            {/* Desktop Menu */}
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
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Cart */}
              <button className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <HiShoppingCart size={22} className="text-slate-200" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-xs rounded-full flex items-center justify-center font-bold">
                    {cartItems}
                  </span>
                )}
              </button>

              {/* Notification */}
              <button className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <HiBell size={22} className="text-slate-200" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-slate-900 font-bold">
                    U
                  </div>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-700">
                      <p className="text-white font-medium">User123</p>
                      <p className="text-slate-400 text-sm">user@email.com</p>
                    </div>
                    <button className="w-full flex items-center space-x-2 px-4 py-2 text-slate-300 hover:bg-slate-700 transition-colors">
                      <HiUserCircle size={18} />
                      <span>My Profile</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-4 py-2 text-slate-300 hover:bg-slate-700 transition-colors">
                      <HiCog6Tooth size={18} />
                      <span>Settings</span>
                    </button>
                    <div className="border-t border-slate-700">
                      <button className="w-full flex items-center space-x-2 px-4 py-2 text-red-400 hover:bg-slate-700 transition-colors">
                        <HiArrowRightOnRectangle size={18} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile toggle */}
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

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-4 border-t border-slate-700 bg-slate-900/95 backdrop-blur-lg">
            <nav className="space-y-2 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-900 font-semibold"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16"></div>

      {/* Overlay */}
      {(isMobileMenuOpen || isProfileMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setIsProfileMenuOpen(false);
          }}
        ></div>
      )}
    </>
  );
}
