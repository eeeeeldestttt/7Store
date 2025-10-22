import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { games } from "../data/games";
import { topupItems } from "../data/topup";

const promoImages = [
  "/assets/images/promo1.png",
  "/assets/images/promo2.png",
  "/assets/images/promo3.png",
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [popularGames, setPopularGames] = useState<any[]>([]);
  const [popularTopups, setPopularTopups] = useState<any[]>([]);

  // Ganti slide otomatis setiap 4 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promoImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Ambil 6 game pertama sebagai game populer
  useEffect(() => {
    setPopularGames(games.slice(0, 6));
  }, []);

  // Ambil topup populer (Mobile Legends dan Free Fire dengan nominal tertentu)
  useEffect(() => {
    const popularItems = topupItems.filter(item => 
      (item.gameId === 1 && [1, 3, 5].includes(item.id)) || // MLBB: 86, 257, 429 diamonds
      (item.gameId === 2 && [6, 8, 10].includes(item.id))  // Free Fire: 100, 530, 2250 diamonds
    );
    setPopularTopups(popularItems.slice(0, 6));
  }, []);

  // Fungsi untuk mendapatkan game berdasarkan ID
  const getGameById = (gameId: number) => {
    return games.find(game => game.id === gameId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* === Carousel Banner === */}
      <div className="relative w-full h-auto overflow-hidden rounded-2xl mb-8 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={promoImages[current]}
            alt={`Promo ${current + 1}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="w-full h-auto max-h-[400px] object-contain"
          />
        </AnimatePresence>

        {/* Tombol navigasi kiri-kanan */}
        <button
          onClick={() =>
            setCurrent((prev) =>
              prev === 0 ? promoImages.length - 1 : prev - 1
            )
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          ‹
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % promoImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          ›
        </button>

        {/* Indikator bulat di bawah */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
          {promoImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                i === current 
                  ? "bg-emerald-400 scale-125" 
                  : "bg-white/40 hover:bg-white/60"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* === Deskripsi utama === */}
     
      {/* === Topup Paling Populer === */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Topup Paling Populer</h2>
          <Link 
            to="/topup" 
            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
          >
            Lihat Semua →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTopups.map((item) => {
            const game = getGameById(item.gameId);
            return (
              <Link
                key={item.id}
                to={`/topup/${item.gameId}`}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/60 backdrop-blur-sm border border-slate-700/30 rounded-xl p-4 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  {game && (
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm truncate group-hover:text-emerald-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-slate-400 text-xs truncate">
                      {game?.name}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-emerald-400 font-bold text-sm">
                        Rp {item.price.toLocaleString()}
                      </span>
                      <span className="text-slate-500 text-xs group-hover:text-emerald-400 transition-colors">
                        Beli →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* === Game Populer === */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Game Populer</h2>
          <Link 
            to="/games" 
            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
          >
            Lihat Semua →
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {popularGames.map((game) => (
            <Link
              key={game.id}
              to={`/topup/${game.id}`}
              className="group bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-slate-700/30 rounded-xl p-4 text-center hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
            >
              <div className="relative mb-3">
                <img
                  src={game.image}
                  alt={game.name}
                  className="w-16 h-16 rounded-lg object-cover mx-auto transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-white text-sm mb-1 line-clamp-1 group-hover:text-emerald-300 transition-colors">
                {game.name}
              </h3>
              <p className="text-slate-400 text-xs line-clamp-1">
                {game.currency}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* === CTA Section === */}
      <section className="text-center bg-gradient-to-r from-emerald-500/10 to-green-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Siap Topup Game Favorit Anda?
        </h2>
        <p className="text-slate-300 mb-6 max-w-md mx-auto">
          Jelajahi koleksi game lengkap kami dan nikmati proses topup yang cepat dan mudah.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/games"
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/25"
          >
            Lihat Semua Game
          </Link>
          <Link
            to="/topup"
            className="px-6 py-3 border border-emerald-400 text-emerald-400 rounded-xl font-semibold hover:bg-emerald-400 hover:text-white transition-all duration-300"
          >
            Cari Topup
          </Link>
        </div>
      </section>

      {/* === Features === */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon="⚡"
          title="Proses Instan"
          description="Topup diproses dalam hitungan detik setelah pembayaran berhasil"
        />
        <FeatureCard
          icon="🛡️"
          title="Aman & Terpercaya"
          description="Transaksi dijamin aman dengan sistem keamanan berlapis"
        />
        <FeatureCard
          icon="🎮"
          title="Game Lengkap"
          description="Dukungan untuk berbagai game populer dengan nominal lengkap"
        />
      </section>
    </div>
  );
}

// Komponen Feature Card
function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-emerald-400/30 transition-all duration-300">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}

// Komponen Card lama (dipertahankan untuk kompatibilitas)
function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-4 bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition">
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
      <div className="mt-4">
        <button className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 transition">
          Beli
        </button>
      </div>
    </div>
  );
}