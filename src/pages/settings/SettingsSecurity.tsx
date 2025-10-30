import React from "react";

export default function SettingsSecurity() {
  return (
    <div className="max-w-3xl mx-auto bg-slate-800 text-slate-100 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
        Keamanan Akun
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">
            Aktifkan Verifikasi Dua Langkah
          </label>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition">
            Aktifkan
          </button>
        </div>

        <div>
          <label className="block text-sm mb-1">
            Aktivitas Login Terakhir
          </label>
          <p className="text-slate-400 text-sm">
            Terakhir login pada: 20 Oktober 2025, 14:45 WIB
          </p>
        </div>

        <div>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition">
            Logout dari Semua Perangkat
          </button>
        </div>
      </div>
    </div>
  );
}
