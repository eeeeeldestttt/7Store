import React, { useState, useEffect } from "react";

export default function SettingsSecurity() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulasi data login history
  useEffect(() => {
    const mockLoginHistory = [
      { date: "20 Oktober 2025, 14:45 WIB", device: "Chrome Windows", location: "Jakarta, Indonesia", ip: "192.168.1.1" },
      { date: "19 Oktober 2025, 09:30 WIB", device: "Safari iPhone", location: "Bandung, Indonesia", ip: "192.168.1.2" },
      { date: "18 Oktober 2025, 20:15 WIB", device: "Firefox Android", location: "Surabaya, Indonesia", ip: "192.168.1.3" },
    ];
    setLoginHistory(mockLoginHistory);
  }, []);

  const handleTwoFactorToggle = () => {
    if (!twoFactorEnabled) {
      setShowTwoFactorModal(true);
    } else {
      setTwoFactorEnabled(false);
    }
  };

  const verifyTwoFactorCode = () => {
    setLoading(true);
    // Simulasi proses verifikasi
    setTimeout(() => {
      if (twoFactorCode === "123456") { // Kode contoh
        setTwoFactorEnabled(true);
        setShowTwoFactorModal(false);
        setTwoFactorCode("");
      } else {
        alert("Kode verifikasi salah! Coba lagi.");
      }
      setLoading(false);
    }, 1500);
  };

  const handleLogoutAllDevices = () => {
    setLoading(true);
    // Simulasi proses logout
    setTimeout(() => {
      alert("Berhasil logout dari semua perangkat!");
      setLogoutConfirm(false);
      setLoading(false);
    }, 2000);
  };

  const getDeviceIcon = (device) => {
    if (device.includes("Chrome")) return "🖥️";
    if (device.includes("Safari")) return "📱";
    if (device.includes("Firefox")) return "📱";
    return "💻";
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-800 text-slate-100 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">
        🔒 Keamanan Akun
      </h2>

      <div className="space-y-6">
        {/* Two Factor Authentication */}
        <div className="bg-slate-700 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-lg font-semibold mb-1">
                Verifikasi Dua Langkah
              </label>
              <p className="text-slate-300 text-sm">
                {twoFactorEnabled 
                  ? "✅ Verifikasi dua langkah aktif" 
                  : "Tambahkan lapisan keamanan ekstra untuk akun Anda"}
              </p>
            </div>
            <button 
              onClick={handleTwoFactorToggle}
              className={`${
                twoFactorEnabled 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-green-600 hover:bg-green-700"
              } text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105`}
            >
              {twoFactorEnabled ? "Nonaktifkan" : "Aktifkan"}
            </button>
          </div>
        </div>

        {/* Login History */}
        <div className="bg-slate-700 p-4 rounded-xl">
          <label className="block text-lg font-semibold mb-3">
            📊 Aktivitas Login Terakhir
          </label>
          <div className="space-y-3">
            {loginHistory.map((login, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-600 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{getDeviceIcon(login.device)}</span>
                  <div>
                    <p className="font-medium">{login.device}</p>
                    <p className="text-slate-300 text-sm">{login.date}</p>
                    <p className="text-slate-400 text-xs">{login.location} • {login.ip}</p>
                  </div>
                </div>
                {index === 0 && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Saat Ini
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Logout All Devices */}
        <div className="bg-slate-700 p-4 rounded-xl">
          <label className="block text-lg font-semibold mb-2">
            🚪 Logout dari Semua Perangkat
          </label>
          <p className="text-slate-300 text-sm mb-3">
            Keluar dari semua sesi login yang aktif di perangkat lain
          </p>
          <button 
            onClick={() => setLogoutConfirm(true)}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Logout dari Semua Perangkat
          </button>
        </div>
      </div>

      {/* Two Factor Modal */}
      {showTwoFactorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">
              Aktifkan Verifikasi Dua Langkah
            </h3>
            <p className="text-slate-300 mb-4">
              Masukkan kode 6 digit dari aplikasi authenticator Anda:
            </p>
            <input
              type="text"
              maxLength="6"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white text-center text-xl tracking-widest mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowTwoFactorModal(false);
                  setTwoFactorCode("");
                }}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded-lg font-semibold transition"
              >
                Batal
              </button>
              <button
                onClick={verifyTwoFactorCode}
                disabled={twoFactorCode.length !== 6 || loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-semibold transition"
              >
                {loading ? "Memverifikasi..." : "Verifikasi"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {logoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4 text-red-400">
              Konfirmasi Logout
            </h3>
            <p className="text-slate-300 mb-6">
              Anda akan logout dari semua perangkat. Anda perlu login kembali di setiap perangkat.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setLogoutConfirm(false)}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded-lg font-semibold transition"
              >
                Batal
              </button>
              <button
                onClick={handleLogoutAllDevices}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-semibold transition"
              >
                {loading ? "Memproses..." : "Ya, Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}