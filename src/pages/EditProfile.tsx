import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EditProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(user?.photo || "");
  const [bio, setBio] = useState(user?.bio || "");

  const handleSave = () => {
    updateProfile({ photo, bio });
    navigate("/profile");
  };

  if (!user)
    return (
      <div className="text-center mt-20 text-slate-400">
        <p>Anda belum login. Silakan login terlebih dahulu.</p>
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-10 bg-slate-800 p-6 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-yellow-400">
        Edit Profil
      </h1>

      <div className="flex flex-col space-y-4">
        <label className="text-slate-300">URL Foto Profil:</label>
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Masukkan URL foto profil"
          className="w-full px-3 py-2 bg-slate-700 rounded-md text-white placeholder-slate-400"
        />

        <label className="text-slate-300">Deskripsi / Bio:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tulis deskripsi singkat tentang kamu..."
          className="w-full h-24 p-3 bg-slate-700 rounded-md text-white placeholder-slate-400"
        />

        <button
          onClick={handleSave}
          className="bg-yellow-500 text-slate-900 font-semibold px-6 py-2 rounded-lg hover:bg-yellow-400 transition-all"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
