import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-slate-900">
      <h1 className="text-3xl mb-6 font-bold">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-72">
        <input
          type="text"
          placeholder="Username"
          className="p-2 rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold py-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm">
        Belum punya akun?{" "}
        <Link to="/register" className="text-yellow-400 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
