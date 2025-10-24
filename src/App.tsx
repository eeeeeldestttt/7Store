import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Topup from "./pages/Topup";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import SearchResult from "./pages/SearchResult";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {/* 🔑 Auth Routes (tanpa Navbar & Sidebar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🧭 Layout utama */}
        <Route
          element={
            <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
              <Navbar />
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 overflow-y-auto">
                  <Outlet />
                </main>
              </div>
            </div>
          }
        >
          {/* 🏠 Halaman bebas diakses */}
          <Route path="/" element={<Home />} />

          {/* 🔒 Halaman yang butuh login */}
          <Route
            path="/games"
            element={
              <ProtectedRoute>
                <Games />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchResult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/topup/:id"
            element={
              <ProtectedRoute>
                <Topup />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          {/* 🛒 Halaman Keranjang */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* ❌ Fallback */}
          <Route
            path="*"
            element={
              <div className="text-center text-slate-400 mt-20">
                <h2 className="text-2xl font-bold mb-2">
                  Halaman tidak ditemukan
                </h2>
                <p>Silakan kembali ke halaman utama.</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </CartProvider>
  );
}
