import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Jika beli langsung, data dikirim lewat state
  const directBuy = location.state?.directBuy || [];

  const itemsToCheckout = directBuy.length > 0 ? directBuy : cart;
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const total = itemsToCheckout.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!username || !userId) {
      alert("Harap isi semua data sebelum checkout!");
      return;
    }

    setLoading(true);

    const newOrder = {
      id: Date.now(),
      username,
      userId,
      items: itemsToCheckout,
      total,
      date: new Date().toLocaleString(),
      status: "Menunggu Pembayaran",
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    setTimeout(() => {
      if (directBuy.length === 0) clearCart(); // Hanya clear kalau dari keranjang
      setLoading(false);
      alert("✅ Checkout berhasil! Terima kasih sudah berbelanja 🙌");
      navigate("/orders");
    }, 800);
  };

  if (itemsToCheckout.length === 0)
    return (
      <div className="text-center text-slate-400 mt-20">
        <p>Keranjangmu kosong 😅</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-800 rounded-2xl shadow-lg text-slate-100">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Checkout</h2>

      {/* Data Pembeli */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm mb-1">Nama Pengguna</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none"
            placeholder="Masukkan nama kamu"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">User ID / Game ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none"
            placeholder="Masukkan ID akun game kamu"
          />
        </div>
      </div>

      {/* Ringkasan Pesanan */}
      <h3 className="text-lg font-semibold mb-3">Ringkasan Pesanan:</h3>
      <ul className="space-y-2 mb-4">
        {itemsToCheckout.map((item) => (
          <li
            key={item.id}
            className="flex justify-between border-b border-slate-700 pb-2 text-sm"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
          </li>
        ))}
      </ul>

      <div className="text-right mb-6">
        <p className="text-lg font-bold text-yellow-400">
          Total: Rp{total.toLocaleString()}
        </p>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full py-2 rounded-lg font-semibold transition ${
          loading
            ? "bg-slate-600 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
      >
        {loading ? "Memproses..." : "Selesaikan Pembelian"}
      </button>
    </div>
  );
}
