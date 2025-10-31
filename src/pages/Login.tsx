import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { BiLogoXing } from "react-icons/bi";
import LoginIllustration from "../../public/assets/images/logo7store.png";
import ModalAlert, {
  ModalType,
} from "../components/ui/ModalAlert";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [showModal, setShowModal] =
    useState(false);
  const [modalMessage, setModalMessage] =
    useState("");
  const [modalType, setModalType] =
    useState<ModalType>("error");
  const [checked, setChecked] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // 🧩 Validasi Realtime
  useEffect(() => {
    const newErrors = {
      username: "",
      password: "",
    };
    if (username && username.length < 3)
      newErrors.username =
        "Username minimal 3 karakter";
    if (password && password.length < 5)
      newErrors.password =
        "Password minimal 5 karakter";
    setErrors(newErrors);
  }, [username, password]);


  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      username.length < 3 ||
      password.length < 5
    ) {
      setModalType("error");
      setModalMessage(
        "Harap isi username dan password dengan benar."
      );
      setShowModal(true);
      return;
    }

    try {
      await login(username, password);
    } catch (error: any) {
      const msg = error.message || "Login gagal.";

      if (msg === "NOT_REGISTERED") {
      
        setModalMessage(
          "Akun belum terdaftar. Silakan daftar terlebih dahulu."
        );
        setModalType("warning");
      } else if (msg === "WRONG_PASSWORD") {

        setModalMessage(
          "Password salah. Silakan coba lagi."
        );
        setModalType("error");
      } else {
     
        setModalMessage(msg);
        setModalType("error");
      }

      setShowModal(true);
    }
  };

  // 🔹 Login Sosial
  const handleSocialLogin = (
    provider: string
  ) => {
    setModalMessage(
      `Login dengan ${provider} belum tersedia. Fitur coming soon!`
    );
    setModalType("info");
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  const isFormValid =
    username.length >= 3 && password.length >= 5;

    

  return (
    <>
      <div className="flex h-screen bg-slate-900 text-white">
        {/* Bagian Form Login */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 animate-fadeIn">
          <div className="w-full max-w-md p-10 rounded-lg scale-85 md:scale-90">
            <h1 className="text-3xl mb-3 font-bold text-center">
              Login
            </h1>
            <p className="text-md font-semibold mb-6 text-gray-300 text-center">
              Masuk ke akun kamu untuk melanjutkan
            </p>

            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >
              {/* Username */}
              <div>
                <div
                  className={`flex items-center px-3 gap-3 py-2 rounded-md bg-slate-800 focus-within:ring-2 ${
                    errors.username
                      ? "focus-within:ring-red-500 ring-2 ring-red-500"
                      : "focus-within:ring-yellow-500"
                  } mb-1`}
                >
                  <i className="fa-solid fa-user text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full focus:outline-none font-semibold bg-slate-800 text-white placeholder-gray-400"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    required
                  />
                </div>
                {errors.username && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Password */}
              <PasswordInput
                password={password}
                setPassword={setPassword}
                error={errors.password}
              />

              {/* Checkbox + lupa password */}
              <div className="flex justify-between mb-4 text-sm">
                <label className="flex items-center cursor-pointer select-none">
                  {/* Hidden native checkbox */}
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      setChecked(!checked)
                    }
                    className="sr-only"
                  />

                  {/* Custom checkbox */}
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors duration-200
          ${
            checked
              ? "bg-yellow-500 border-yellow-500"
              : "bg-slate-800 border-gray-500"
          }`}
                  >
                    {checked && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>

                  <span className="ml-2 text-gray-300 font-medium">
                    Ingat saya
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setModalMessage(
                      "Fitur lupa password belum tersedia. Silakan hubungi administrator."
                    );
                    setModalType("info");
                    setShowModal(true);
                  }}
                  className="text-yellow-400 hover:text-yellow-300 p-1 hover:bg-slate-700 rounded-full transition"
                >
                  Lupa password?
                </button>
              </div>

              {/* Tombol Login */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full mb-6 font-semibold py-2 rounded-md transition ${
                  isFormValid
                    ? "bg-yellow-500 hover:bg-yellow-600 text-slate-900 cursor-pointer"
                    : "bg-yellow-500/50 text-slate-900/70 cursor-not-allowed"
                }`}
              >
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center justify-between mb-4">
                <hr className="flex-grow border-t border-gray-600" />
                <span className="mx-2 text-gray-400">
                  Atau masuk dengan
                </span>
                <hr className="flex-grow border-t border-gray-600" />
              </div>

              {/* Tombol Sosial */}
              <div className="flex items-center justify-center mb-4 gap-2">
                <SocialButton
                  onClick={() =>
                    handleSocialLogin("Google")
                  }
                >
                  <FcGoogle className="w-5 h-5" />
                </SocialButton>
                <SocialButton
                  onClick={() =>
                    handleSocialLogin("Facebook")
                  }
                >
                  <FaFacebookF className="text-blue-400 w-5 h-5" />
                </SocialButton>
                <SocialButton
                  onClick={() =>
                    handleSocialLogin("Xing")
                  }
                >
                  <BiLogoXing className="text-green-400 w-5 h-5" />
                </SocialButton>
              </div>

              <p className="text-sm text-gray-300 text-center">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-yellow-400 hover:text-yellow-300 font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Gambar Samping */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-slate-800">
          <img
            src={LoginIllustration}
            alt="Illustration"
            className="w-2/3 max-w-sm object-contain rounded-lg animate-fadeInRight"
          />
        </div>
      </div>

      {/* Modal */}
      <ModalAlert
        show={showModal}
        type={modalType}
        message={modalMessage}
        onClose={closeModal}
      />
    </>
  );
}

// ✅ Komponen tambahan kecil biar rapi:
function SocialButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center bg-slate-800 border border-slate-700 rounded-md px-4 py-2 hover:bg-slate-700 transition"
    >
      {children}
    </button>
  );
}

function PasswordInput({
  password,
  setPassword,
  error,
}: {
  password: string;
  setPassword: (val: string) => void;
  error?: string;
}) {
  const [showPassword, setShowPassword] =
    useState(false);
  return (
    <div>
      <div
        className={`flex items-center px-3 gap-3 py-2 rounded-md bg-slate-800 focus-within:ring-2 ${
          error
            ? "focus-within:ring-red-500 ring-2 ring-red-500"
            : "focus-within:ring-yellow-500"
        } mb-1`}
      >
        <i className="fa-solid fa-lock text-gray-400"></i>
        <input
          type={
            showPassword ? "text" : "password"
          }
          placeholder="Password"
          className="w-full focus:outline-none font-semibold bg-slate-800 text-white placeholder-gray-400"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          minLength={5}
        />
        <button
          type="button"
          onClick={() =>
            setShowPassword((p) => !p)
          }
          className="text-gray-400 hover:text-yellow-400"
        >
          <i
            className={`fa-solid ${
              showPassword
                ? "fa-eye-slash"
                : "fa-eye"
            }`}
          ></i>
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
