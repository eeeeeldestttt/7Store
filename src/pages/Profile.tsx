import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center mt-20 text-slate-400">
        <h2 className="text-xl font-bold mb-2">Kamu belum login</h2>
        <p>Silakan login terlebih dahulu untuk melihat profilmu.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-slate-800 p-6 rounded-xl shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">
        Profil Saya
      </h1>

      {/* Foto Profil */}
      <div className="flex flex-col items-center space-y-3">
        <img
          src={
            user.photo ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Foto Profil"
          className="w-28 h-28 rounded-full object-cover border-4 border-yellow-500 shadow-md"
        />

        {/* Username */}
        <p className="text-lg font-semibold text-white">@{user.username}</p>

        {/* Deskripsi */}
        <p className="text-slate-300 italic text-sm mt-2">
          {user.bio || "Belum ada deskripsi."}
        </p>
      </div>

      {/* Tombol Edit Profile */}
      <div className="mt-6">
        <a
          href="/edit-profile"
          className="bg-yellow-500 text-slate-900 font-semibold px-5 py-2 rounded-lg hover:bg-yellow-400 transition-all"
        >
          Edit Profil
        </a>
      </div>
    </div>
  );
}
