import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import ModalAlert from "../components/ui/ModalAlert";
import RegisterIllustration from "../../public/assets/images/logo7store.png";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"error" | "warning" | "info">("error");
  const { register } = useAuth();
  const navigate = useNavigate();

  // 🔹 Validasi realtime
  useEffect(() => {
    const newErrors = { username: "", password: "" };
    if (username && username.length < 3)
      newErrors.username = "Username minimal 3 karakter";
    if (password && password.length < 5)
      newErrors.password = "Password minimal 5 karakter";
    setErrors(newErrors);
  }, [username, password]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.length < 3 || password.length < 5) {
      setModalMessage("Harap isi form dengan benar sebelum daftar.");
      setModalType("error");
      setShowModal(true);
      return;
    }

    try {
      await register(username, password);
      setModalMessage("Pendaftaran berhasil! Silakan login.");
      setModalType("info");
      setShowModal(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (error: any) {
      const message = error.message || "Terjadi kesalahan saat mendaftar.";
      setModalMessage(message);
      setModalType("error");
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  const isFormValid = username.length >= 3 && password.length >= 5;

  return (
    <>
      <div className="flex h-screen bg-slate-900 text-white">
        {/* Form Register */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md p-10 rounded-xl scale-90 bg-slate-800/60 backdrop-blur-md border border-slate-700 shadow-lg"
          >
            <h1 className="text-3xl mb-3 font-bold text-center">Register</h1>
            <p className="text-md font-semibold mb-6 text-gray-300 text-center">
              Buat akun baru untuk melanjutkan
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Username */}
              <div>
                <div
                  className={`flex items-center px-3 gap-3 py-2 rounded-md bg-slate-800 focus-within:ring-2 transition ${
                    errors.username
                      ? "focus-within:ring-red-500 ring-2 ring-red-500"
                      : "focus-within:ring-yellow-500"
                  } mb-1`}
                >
                  <FaUser className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full focus:outline-none font-semibold bg-slate-800 text-white placeholder-gray-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                {errors.username && (
                  <p className="text-red-400 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div
                  className={`flex items-center px-3 gap-3 py-2 rounded-md bg-slate-800 focus-within:ring-2 transition ${
                    errors.password
                      ? "focus-within:ring-red-500 ring-2 ring-red-500"
                      : "focus-within:ring-yellow-500"
                  } mb-1`}
                >
                  <FaLock className="text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full focus:outline-none font-semibold bg-slate-800 text-white placeholder-gray-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={5}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-yellow-400 transition"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Tombol Register */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!isFormValid}
                className={`w-full mb-6 font-semibold py-2 rounded-md transition ${
                  isFormValid
                    ? "bg-yellow-500 hover:bg-yellow-600 text-slate-900 cursor-pointer"
                    : "bg-yellow-500/50 text-slate-900/70 cursor-not-allowed"
                }`}
              >
                Register
              </motion.button>

              {/* Sudah punya akun */}
              <p className="text-sm text-gray-300 text-center">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="text-yellow-400 hover:text-yellow-300 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </motion.div>
        </div>

        {/* Gambar Samping */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="hidden md:flex w-1/2 items-center justify-center bg-slate-800"
        >
          <img
            src={RegisterIllustration}
            alt="Illustration"
            className="w-2/3 max-w-sm object-contain rounded-lg"
          />
        </motion.div>
      </div>

      {/* Modal Alert */}
      <ModalAlert show={showModal} type={modalType} message={modalMessage} onClose={closeModal} />
    </>
  );
}
