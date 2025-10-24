import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { games } from "../data/games";
import { topupItems } from "../data/topup";
import { useCart } from "../context/CartContext";

interface Game {
  id: number;
  name: string;
  image: string;
  currency: string;
}

interface TopupItem {
  id: number;
  gameId: number;
  name: string;
  amount: number;
  price: number;
}

export default function Topup() {
  const { id } = useParams<{ id: string }>();
  const gameId = Number(id);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const game = games.find((g) => g.id === gameId);
  const items = topupItems.filter((item) => item.gameId === gameId);

  const selectedItemData = items.find((item) => item.id === selectedItem);
  const totalPrice = selectedItemData ? selectedItemData.price * quantity : 0;

  const handleAddToCart = () => {
    if (!selectedItemData) return;
    addToCart({
      id: String(selectedItemData.id),
      name: selectedItemData.name,
      price: selectedItemData.price,
      image: game?.image,
      quantity,
    });
    alert(`✅ ${selectedItemData.name} telah ditambahkan ke keranjang!`);
  };

  const handleBuyNow = () => {
    if (!selectedItemData) {
      alert("Pilih item topup terlebih dahulu!");
      return;
    }

    const tempCart = [
      {
        id: String(selectedItemData.id),
        name: selectedItemData.name,
        price: selectedItemData.price,
        image: game?.image,
        quantity,
      },
    ];

    navigate("/checkout", {
      state: {
        cart: tempCart,
        total: totalPrice,
      },
    });
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">Game Tidak Ditemukan</h2>
          <Link
            to="/games"
            className="px-5 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition"
          >
            Kembali ke Daftar Game
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <Link
            to="/games"
            className="text-slate-300 hover:text-white flex items-center gap-2"
          >
            ← Kembali
          </Link>
          <h1 className="text-xl font-bold text-white">Top Up Game</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Game Info */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700">
          <div className="flex items-center gap-6">
            <img
              src={game.image}
              alt={game.name}
              className="w-24 h-24 object-cover rounded-xl border-2 border-indigo-500/30"
            />
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{game.name}</h2>
              <p className="text-slate-400">Top Up {game.currency}</p>
              <p className="text-slate-500 text-sm mt-2">
                {items.length} paket tersedia
              </p>
            </div>
          </div>
        </div>

        {/* Paket Topup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item.id)}
              className={`rounded-xl p-5 border-2 cursor-pointer transition-all duration-200 ${
                selectedItem === item.id
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-slate-700 hover:border-slate-500 hover:bg-slate-700/30"
              }`}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.name}
              </h3>
              <p className="text-slate-400 text-sm mb-2">
                {item.amount.toLocaleString()} {game.currency}
              </p>
              <p className="text-indigo-400 font-bold">
                Rp {item.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Panel Pembelian */}
        {selectedItem && selectedItemData && (
          <div className="bg-slate-800/80 rounded-xl p-6 mt-8 border border-indigo-500/40">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-white font-semibold">{selectedItemData.name}</p>
                <p className="text-slate-400 text-sm">
                  Rp {selectedItemData.price.toLocaleString()} x {quantity}
                </p>
                <p className="text-yellow-400 font-bold mt-2">
                  Total: Rp {totalPrice.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-yellow-500 text-slate-900 font-semibold px-5 py-2 rounded-lg hover:bg-yellow-400 transition"
                >
                  + Keranjang
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
