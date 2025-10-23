import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Topup from "./pages/Topup";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* 🔑 Auth Routes - tanpa Navbar & Sidebar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🧭 Layout utama untuk halaman lain */}
      <Route
        element={
          <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
            <Navbar />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-6 overflow-y-auto">
                {/* 🔹 Outlet digunakan untuk me-render child route */}
                <Outlet />
              </main>
            </div>
          </div>
        }
      >
        {/* 🏠 Home — bebas diakses */}
        <Route path="/" element={<Home />} />

        {/* 🔒 Halaman lain — wajib login */}
        <Route
          path="/games"
          element={
            <ProtectedRoute>
              <Games />
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

        {/* ❌ Fallback */}
        <Route
          path="*"
          element={
            <div className="text-center text-slate-400 mt-20">
              <h2 className="text-2xl font-bold mb-2">Halaman tidak ditemukan</h2>
              <p>Silakan kembali ke halaman utama.</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
