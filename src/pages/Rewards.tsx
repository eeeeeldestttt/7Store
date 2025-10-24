import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useReward } from "../context/RewardContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// 🎮 Item hadiah (ambil dari daftar game kamu)
const rewardItems = [
  { id: "1", name: "Diamond Mobile Legends 86", price: 0, image: "/img/mlbb.png", quantity: 1 },
  { id: "2", name: "UC PUBG 60", price: 0, image: "/img/pubg.png", quantity: 1 },
  { id: "3", name: "Genesis Crystal Genshin 60", price: 0, image: "/img/genshin.png", quantity: 1 },
  { id: "4", name: "Valorant Points 125", price: 0, image: "/img/valorant.png", quantity: 1 },
  { id: "5", name: "Garena Shell 50", price: 0, image: "/img/garena.png", quantity: 1 },
  { id: "6", name: "Free Fire Diamond 100", price: 0, image: "/img/ff.png", quantity: 1 },
];

export default function Rewards() {
  const { addToCart } = useCart();
  const { spins, useSpin } = useReward();
  const navigate = useNavigate();

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<any>(null);

  const spinWheel = () => {
    if (spins <= 0) {
      alert("Kamu belum memiliki spin! Top up dulu untuk mendapatkan spin.");
      return;
    }

    if (spinning) return;

    const success = useSpin();
    if (!success) return;

    setSpinning(true);

    // 🎲 Pilih hasil acak
    const randomIndex = Math.floor(Math.random() * rewardItems.length);
    const degreesPerItem = 360 / rewardItems.length;
    const newRotation = 360 * 5 + randomIndex * degreesPerItem; // 5 putaran penuh + target

    setRotation(newRotation);

    setTimeout(() => {
      const wonItem = rewardItems[randomIndex];
      setResult(wonItem);

      // 🎁 Tambahkan ke keranjang dengan harga 0
      addToCart({ ...wonItem, price: 0 });

      // ⏩ Arahkan ke halaman checkout
      navigate("/checkout");
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-2">🎁 Rewards Spin</h1>
      <p className="mb-4">Kamu punya <b>{spins}</b> spin tersisa</p>

      <div className="relative w-[300px] h-[300px] mb-6">
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="w-full h-full rounded-full border-[10px] border-yellow-400 flex items-center justify-center"
          style={{
            background: `conic-gradient(
              #ff5722 0deg 60deg,
              #4caf50 60deg 120deg,
              #03a9f4 120deg 180deg,
              #9c27b0 180deg 240deg,
              #ffc107 240deg 300deg,
              #e91e63 300deg 360deg
            )`,
          }}
        >
          <div className="absolute top-[-20px] w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-transparent border-b-yellow-400"></div>
          <div className="text-lg font-bold">SPIN!</div>
        </motion.div>
      </div>

      <button
        onClick={spinWheel}
        disabled={spinning || spins <= 0}
        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-xl font-semibold text-black transition"
      >
        {spinning ? "Memutar..." : "🎡 Putar Sekarang"}
      </button>

      {result && (
        <div className="mt-6 text-center">
          <p className="text-lg">Selamat! Kamu mendapatkan:</p>
          <h2 className="text-2xl font-bold text-yellow-300">{result.name}</h2>
        </div>
      )}
    </div>
  );
}
