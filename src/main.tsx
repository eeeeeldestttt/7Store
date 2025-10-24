import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // ✅ import AuthProvider
import { CartProvider } from "./context/CartContext";
import { RewardProvider } from "./context/RewardContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* ✅ Bungkus seluruh aplikasi dengan AuthProvider */}
      <AuthProvider>
        <CartProvider>
          <RewardProvider>
        <App />
        </RewardProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
