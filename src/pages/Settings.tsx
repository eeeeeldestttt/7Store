import { useNavigate } from "react-router-dom";
import { Cog, User, Lock, Bell, Palette, LogOut } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();

  const settingsOptions = [
    {
      title: "Akun",
      description: "Kelola informasi akun dan profil Anda.",
      icon: <User className="w-5 h-5 text-blue-500" />,
      path: "/settings/account",
    },
    {
      title: "Keamanan",
      description: "Ubah kata sandi dan atur keamanan akun.",
      icon: <Lock className="w-5 h-5 text-red-500" />,
      path: "/settings/security",
    },
    {
      title: "Notifikasi",
      description: "Atur preferensi notifikasi Anda.",
      icon: <Bell className="w-5 h-5 text-yellow-500" />,
      path: "/settings/notifications",
    },
    {
      title: "Tampilan",
      description: "Ubah tema dan tampilan aplikasi.",
      icon: <Palette className="w-5 h-5 text-purple-500" />,
      path: "/settings/appearance",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Cog className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold">Pengaturan</h1>
      </div>

      <div className="space-y-4">
        {settingsOptions.map((setting) => (
          <div
            key={setting.title}
            onClick={() => navigate(setting.path)}
            className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <div className="flex items-center gap-3">
              {setting.icon}
              <div>
                <h2 className="font-semibold">{setting.title}</h2>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <LogOut className="w-5 h-5" />
          Keluar Akun
        </button>
      </div>
    </div>
  );
}
