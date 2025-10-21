import { Link } from "react-router-dom";
import { games } from "../data/games";

export default function Games() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Pilih Game untuk Topup</h1>
        <p className="text-slate-400 text-sm sm:text-base">Pilih game favorit Anda dan top up dengan mudah</p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/topup/${game.id}`}
            className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl p-3 sm:p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-900/30"
          >
            {/* Game Image */}
            <div className="relative mb-3 sm:mb-4">
              <img
                src={game.image}
                alt={game.name}
                className="w-full aspect-square object-cover rounded-lg group-hover:rounded-xl transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-lg group-hover:rounded-xl" />
            </div>

            {/* Game Info */}
            <div className="space-y-1 sm:space-y-2">
              <h3 className="font-semibold text-white text-xs sm:text-sm md:text-base line-clamp-1 group-hover:text-indigo-300 transition-colors">
                {game.name}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm line-clamp-1">
                {game.currency}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Loading Skeleton for future use */}
      {/* 
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 sm:p-4 animate-pulse">
            <div className="w-full aspect-square bg-slate-700 rounded-lg mb-3 sm:mb-4"></div>
            <div className="h-4 bg-slate-700 rounded mb-2"></div>
            <div className="h-3 bg-slate-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
      */}
    </div>
  );
}