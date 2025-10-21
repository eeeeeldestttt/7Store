import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Topup from "./pages/Topup";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Navbar di bagian atas */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar di sebelah kiri */}
        <Sidebar />

        {/* Konten utama */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            {/* Halaman utama */}
            <Route path="/" element={<Home />} />
            
            {/* Daftar game */}
            <Route path="/games" element={<Games />} />

            {/* Halaman topup game tertentu */}
            <Route path="/topup/:id" element={<Topup />} />

            {/* Fallback route */}
            <Route
              path="*"
              element={
                <div className="text-center text-slate-400 mt-20">
                  <h2 className="text-2xl font-bold mb-2">Halaman tidak ditemukan</h2>
                  <p>Silakan kembali ke halaman utama.</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
