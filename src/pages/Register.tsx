import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    register(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-slate-900">
      <h1 className="text-3xl mb-6 font-bold">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-72">
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
          Register
        </button>
      </form>
      <p className="mt-4 text-sm">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-yellow-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
