import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { games } from "../data/games";
import { topupItems } from "../data/topup";
import { useCart } from "../context/CartContext";

// Types
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addToCart } = useCart();

  const game = games.find((g) => g.id === gameId);
  const items = topupItems.filter((item) => item.gameId === gameId);

  const selectedItemData = items.find(item => item.id === selectedItem);
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

  const handleQuickSelect = (itemId: number) => {
    setSelectedItem(itemId);
    setQuantity(1);
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-md mx-auto border border-slate-700">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">!</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Game Tidak Ditemukan</h2>
            <p className="text-slate-400 mb-6">Game yang Anda cari tidak tersedia.</p>
            <Link 
              to="/games" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <span>←</span>
              Kembali ke Daftar Game
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link 
              to="/games" 
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
              Kembali ke Games
            </Link>
            <h1 className="text-xl font-bold text-white">Top Up Game</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Game Info */}
        <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-700 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={game.image}
                alt={game.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border-2 border-indigo-500/20 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                {game.currency}
              </div>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{game.name}</h2>
              <p className="text-slate-400 text-lg">Top Up {game.currency}</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                <div className="bg-slate-700/50 px-3 py-1 rounded-full text-slate-300 text-sm">
                  {items.length} Paket Tersedia
                </div>
                <div className="bg-green-500/20 px-3 py-1 rounded-full text-green-400 text-sm">
                  Instant Delivery
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Panel */}
        {selectedItem && (
          <div className="bg-slate-800/80 rounded-2xl p-6 mb-8 border border-indigo-500/30 backdrop-blur-sm animate-fade-in">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">Detail Pembelian</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Item:</span>
                    <span className="text-white font-semibold">{selectedItemData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jumlah {game.currency}:</span>
                    <span className="text-white font-semibold">{selectedItemData?.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Harga per item:</span>
                    <span className="text-indigo-400 font-semibold">
                      Rp {selectedItemData?.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">Quantity:</span>
                  <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-400">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      onClick={handleAddToCart}
                      className="px-8 py-2 rounded-lg bg-yellow-500 text-slate-900 font-semibold hover:bg-yellow-400 transition-all duration-200"
                    >
                      + Masukkan Keranjang
                    </button>
                    <button
                      onClick={() => alert('🛒 Fitur beli langsung belum diaktifkan')}
                      className="px-8 py-2 rounded-lg font-semibold transition-all duration-200 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      Beli Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-slate-800/50 rounded-xl p-4 sm:p-6 border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer backdrop-blur-sm ${
                selectedItem === item.id 
                  ? 'border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20' 
                  : 'border-slate-700 hover:border-slate-600 hover:bg-slate-700/30'
              }`}
              onClick={() => handleQuickSelect(item.id)}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-white text-lg">{item.name}</h4>
                {selectedItem === item.id && (
                  <div className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
                    Dipilih
                  </div>
                )}
              </div>
              
              <p className="text-slate-400 text-sm mb-4">
                {item.amount.toLocaleString("id-ID")} {game.currency}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="font-bold text-indigo-400 text-lg">
                  Rp {item.price.toLocaleString("id-ID")}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickSelect(item.id);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold text-sm transition-colors"
                >
                  Pilih
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animasi halus */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
