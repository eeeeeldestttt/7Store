import { Bell } from "lucide-react";

export default function Notifications() {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
      <div className="flex items-center mb-4">
        <Bell className="text-blue-400 mr-2" />
        <h2 className="text-2xl font-bold text-white">Pengaturan Notifikasi</h2>
      </div>

      <p className="text-slate-300 mb-6">
        Atur preferensi notifikasi untuk aktivitas akun dan transaksi kamu.
      </p>

      <div className="space-y-4">
        <label className="flex items-center justify-between bg-slate-700 p-4 rounded-xl">
          <span>Notifikasi Transaksi</span>
          <input type="checkbox" className="accent-blue-500 scale-125" defaultChecked />
        </label>

        <label className="flex items-center justify-between bg-slate-700 p-4 rounded-xl">
          <span>Promosi & Penawaran</span>
          <input type="checkbox" className="accent-blue-500 scale-125" />
        </label>

        <label className="flex items-center justify-between bg-slate-700 p-4 rounded-xl">
          <span>Pembaruan Sistem</span>
          <input type="checkbox" className="accent-blue-500 scale-125" defaultChecked />
        </label>
      </div>
    </div>
  );
}
