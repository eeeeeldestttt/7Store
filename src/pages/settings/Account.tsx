import React from "react";

export default function SettingsAccount() {
  return (
    <div className="max-w-3xl mx-auto bg-slate-800 text-slate-100 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
        Pengaturan Akun
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Nama Pengguna</label>
          <input
            type="text"
            placeholder="Masukkan nama pengguna"
            className="w-full p-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Ganti Password</label>
          <input
            type="password"
            placeholder="Masukkan password baru"
            className="w-full p-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none"
          />
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition">
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
