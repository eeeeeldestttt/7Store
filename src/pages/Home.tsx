import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { games } from "../data/games";
import { topupItems } from "../data/topup";

const promoImages = [
  "/assets/images/promo1.jpg",
  "/assets/images/promo2.jpg",
  "/assets/images/promo3.jpg",
  "/assets/images/promo4.jpg",

];

// Animasi variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -8,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const glowVariants = {
  rest: {
    opacity: 0,
    scale: 0.8,
  },
  hover: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [popularGames, setPopularGames] = useState<any[]>([]);
  const [popularTopups, setPopularTopups] = useState<any[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const isInView = useInView(carouselRef, { once: true, margin: "-100px" });

  // Ganti slide otomatis setiap 4 detik
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promoImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Ambil 6 game pertama sebagai game populer
  useEffect(() => {
    setPopularGames(games.slice(0, 6));
  }, []);

  // Ambil topup populer
  useEffect(() => {
    const popularItems = topupItems.filter(item => 
      (item.gameId === 1 && [1, 3, 5].includes(item.id)) ||
      (item.gameId === 2 && [6, 8, 10].includes(item.id))
    );
    setPopularTopups(popularItems.slice(0, 6));
  }, []);

  const getGameById = (gameId: number) => {
    return games.find(game => game.id === gameId);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % promoImages.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? promoImages.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* === Enhanced Carousel Banner === */}
      <motion.div 
        ref={carouselRef}
        className="relative w-full h-auto overflow-hidden rounded-3xl mb-12 shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex justify-center items-center group"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="relative w-full"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <img
              src={promoImages[current]}
              alt={`Promo ${current + 1}`}
              className="w-full h-auto max-h-[500px] object-contain"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Navigation Buttons */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/80 hover:scale-110 hover:shadow-2xl border border-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            whileHover={{ x: -2 }}
            className="text-xl font-bold"
          >
            ‹
          </motion.span>
        </motion.button>
        
        <motion.button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/80 hover:scale-110 hover:shadow-2xl border border-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            whileHover={{ x: 2 }}
            className="text-xl font-bold"
          >
            ›
          </motion.span>
        </motion.button>

        {/* Enhanced Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {promoImages.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                i === current 
                  ? "bg-emerald-400" 
                  : "bg-white/40 hover:bg-white/60"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              {i === current && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-400"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-green-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          key={current}
        />
      </motion.div>

      {/* === Topup Paling Populer dengan Animasi Stagger === */}
      <motion.section 
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={itemVariants}
        >
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Topup Paling Populer
            </h2>
            <p className="text-slate-400 mt-2">Pilihan terbaik untuk gamers sejati</p>
          </div>
          <Link 
            to="/topup" 
            className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
          >
            <span className="relative z-10">Lihat Semua</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {popularTopups.map((item, index) => {
            const game = getGameById(item.gameId);
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                custom={index}
              >
                <TopupCard item={item} game={game} />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* === Game Populer dengan Grid Animasi === */}
      <motion.section 
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={itemVariants}
        >
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Game Populer
            </h2>
            <p className="text-slate-400 mt-2">Temukan game favoritmu</p>
          </div>
          <Link 
            to="/games" 
            className="group relative overflow-hidden px-6 py-3 border border-purple-400 text-purple-400 rounded-xl font-semibold hover:text-white transition-all duration-300"
          >
            <span className="relative z-10">Lihat Semua</span>
            <motion.div 
              className="absolute inset-0 bg-purple-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
            />
          </Link>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          variants={containerVariants}
        >
          {popularGames.map((game, index) => (
            <motion.div
              key={game.id}
              variants={itemVariants}
              custom={index}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* === Enhanced CTA Section === */}
      <motion.section 
        className="text-center relative overflow-hidden rounded-3xl p-12 mb-16"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-green-500/10 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-4 left-10 text-6xl opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          🎮
        </motion.div>
        <motion.div
          className="absolute bottom-4 right-10 text-4xl opacity-20"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          ⚡
        </motion.div>

        <div className="relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Siap{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              Topup Game
            </span>{" "}
            Favorit Anda?
          </motion.h2>
          <motion.p 
            className="text-slate-300 mb-8 max-w-md mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Jelajahi koleksi game lengkap kami dan nikmati proses topup yang cepat dan mudah.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/games"
              className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-2xl font-bold hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300"
            >
              <span className="relative z-10">Lihat Semua Game</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
            <Link
              to="/topup"
              className="group relative overflow-hidden px-8 py-4 border-2 border-emerald-400 text-emerald-400 rounded-2xl font-bold hover:text-white transition-all duration-300"
            >
              <span className="relative z-10">Cari Topup</span>
              <div className="absolute inset-0 bg-emerald-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* === Enhanced Features Section === */}
      <motion.section 
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <FeatureCard
          icon="⚡"
          title="Proses Instan"
          description="Topup diproses dalam hitungan detik setelah pembayaran berhasil"
          delay={0}
        />
        <FeatureCard
          icon="🛡️"
          title="Aman & Terpercaya"
          description="Transaksi dijamin aman dengan sistem keamanan berlapis"
          delay={0.2}
        />
        <FeatureCard
          icon="🎮"
          title="Game Lengkap"
          description="Dukungan untuk berbagai game populer dengan nominal lengkap"
          delay={0.4}
        />
      </motion.section>
    </div>
  );
}

// Enhanced Topup Card Component
function TopupCard({ item, game }: { item: any; game: any }) {
  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/60 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-emerald-400/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden"
    >
      {/* Glow Effect */}
      <motion.div
        variants={glowVariants}
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10"
      />
      
      <div className="relative z-10">
        <div className="flex items-center space-x-4">
          {game && (
            <motion.img
              src={game.image}
              alt={game.name}
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0 group-hover:rotate-6 transition-transform duration-300"
              whileHover={{ scale: 1.1, rotate: 6 }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-lg mb-1 truncate group-hover:text-emerald-300 transition-colors">
              {item.name}
            </h3>
            <p className="text-slate-400 text-sm truncate">
              {game?.name}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-emerald-400 font-bold text-lg">
                Rp {item.price.toLocaleString()}
              </span>
              <motion.span 
                className="text-slate-500 group-hover:text-emerald-400 transition-colors flex items-center"
                whileHover={{ x: 5 }}
              >
                Beli <span className="ml-1">→</span>
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced Game Card Component
function GameCard({ game }: { game: any }) {
  return (
    <motion.div
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-5 text-center hover:border-purple-400/40 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden"
    >
      {/* Glow Effect */}
      <motion.div
        variants={glowVariants}
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
      />
      
      <div className="relative z-10">
        <div className="relative mb-4">
          <motion.img
            src={game.image}
            alt={game.name}
            className="w-16 h-16 rounded-xl object-cover mx-auto transform group-hover:scale-110 transition-transform duration-300"
            whileHover={{ scale: 1.15, rotate: 5 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <h3 className="font-bold text-white text-sm mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
          {game.name}
        </h3>
        <p className="text-slate-400 text-xs line-clamp-1">
          {game.currency}
        </p>
      </div>
    </motion.div>
  );
}

// Enhanced Feature Card Component
function FeatureCard({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: number }) {
  return (
    <motion.div
      variants={itemVariants}
      custom={delay}
      className="group relative text-center p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 rounded-2xl hover:border-emerald-400/30 transition-all duration-300 overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      <motion.div 
        className="text-4xl mb-4 relative"
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h3 className="font-bold text-white text-xl mb-3 group-hover:text-emerald-300 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}