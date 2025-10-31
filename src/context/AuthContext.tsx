import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  password: string;
  photo?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // 🟢 LOGIN
  const login = async (username: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      navigate("/");
    } else {
      const userExists = users.some((u) => u.username === username);
      if (!userExists) {
        // 🔸 Username belum terdaftar
        throw new Error("NOT_REGISTERED");
      } else {
        // 🔹 Username ada tapi password salah
        throw new Error("WRONG_PASSWORD");
      }
    }
  };

  // 🟠 REGISTER
  const register = async (username: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.username === username)) {
      throw new Error("USERNAME_EXISTS");
    }

    const newUser: User = { username, password, photo: "", bio: "" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/login");
  };

  // 🔵 UPDATE PROFILE
  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) =>
      u.username === user.username ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // 🔴 LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth harus digunakan di dalam AuthProvider");
  return context;
}
