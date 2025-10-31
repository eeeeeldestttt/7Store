import { Palette } from "lucide-react";

export default function Appearance() {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-md">
      <div className="flex items-center mb-4">
        <Palette className="text-pink-400 mr-2" />
        <h2 className="text-2xl font-bold text-white">Pengaturan Tampilan</h2>
      </div>

      <p className="text-slate-300 mb-6">
        Sesuaikan tampilan aplikasi sesuai preferensimu.
      </p>

      <div className="space-y-4">
        <div className="flex justify-between items-center bg-slate-700 p-4 rounded-xl">
          <span>Tema Gelap</span>
          <input type="radio" name="theme" className="accent-pink-500" defaultChecked />
        </div>

        <div className="flex justify-between items-center bg-slate-700 p-4 rounded-xl">
          <span>Tema Terang</span>
          <input type="radio" name="theme" className="accent-pink-500" />
        </div>

        <div className="flex justify-between items-center bg-slate-700 p-4 rounded-xl">
          <span>Tema Otomatis</span>
          <input type="radio" name="theme" className="accent-pink-500" />
        </div>
      </div>
    </div>
  );
}
