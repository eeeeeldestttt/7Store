import { Link } from "react-router-dom";
import { games } from "../data/games";
import { useState } from "react";

export default function Games() {
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);

  return (
    <div className="">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/3 rounded-full blur-3xl"></div>
        
        {/* Luxury Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto p-4 sm:p-6">
        {/* Exclusive Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            {/* Premium Decorative Elements */}
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-emerald-400/60"></div>
              <div className="mx-4 w-2 h-2 bg-emerald-400 rounded-full"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-emerald-400/60"></div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight mb-4">
              <span className="bg-gradient-to-r from-emerald-200 via-green-200 to-emerald-200 bg-clip-text text-transparent">
                Exclusive Game Topup
              </span>
            </h1>
            
            <div className="flex items-center justify-center mt-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-emerald-400/60"></div>
              <div className="mx-4 w-2 h-2 bg-emerald-400 rounded-full"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-emerald-400/60"></div>
            </div>
          </div>
          
          <p className="text-slate-300/80 text-lg font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Experience premium topup service with <span className="text-emerald-300 font-medium">priority processing</span> and exclusive benefits
          </p>
        </div>

        {/* Premium Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
          {games.map((game) => (
            <Link
              key={game.id}
              to={`/topup/${game.id}`}
              className="group relative"
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
            >
              {/* Premium Card Container */}
              <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-md border border-slate-700/30 rounded-2xl p-5 transition-all duration-500 group-hover:border-emerald-400/40 group-hover:shadow-2xl group-hover:shadow-emerald-500/5 overflow-hidden">
                
                {/* Luxury Border Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/0 via-green-400/0 to-teal-400/0 group-hover:from-emerald-400/8 group-hover:via-green-400/5 group-hover:to-teal-400/8 transition-all duration-700 ${
                  hoveredGame === game.id ? 'opacity-100' : 'opacity-0'
                }`}></div>

                {/* Pop-out Badge dengan efek 3D */}
                <div className="absolute -top-4 -right-4 z-30 transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                  <div className="relative">
                    {/* Badge Utama dengan efek 3D */}
                    <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-[11px] font-black tracking-wider shadow-2xl shadow-emerald-900/50 border-2 border-white/30 transform rotate-12 relative z-10">
                      TERMURAH
                      {/* Efek kilau */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Shadow untuk efek 3D */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 rounded-full blur-sm transform translate-y-1 rotate-12 scale-95 opacity-70 z-0"></div>
                    
                    {/* Efek pinggiran glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full blur-md transform rotate-12 scale-105 opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
                  </div>
                  
                  {/* Pita efek */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Game Image Container */}
                <div className="relative mb-5">
                  <div className="relative rounded-xl overflow-hidden bg-slate-700/30 border border-slate-600/30">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full aspect-square object-cover rounded-xl transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Currency Badge */}
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide shadow-2xl shadow-emerald-500/30 border border-emerald-400/20">
                      {game.currency}
                    </div>
                  </div>
                </div>

                {/* Game Info */}
                <div className="text-center space-y-3 relative z-10">
                  <h3 className="font-medium text-white text-sm tracking-wide group-hover:text-emerald-200 transition-colors duration-500">
                    {game.name}
                  </h3>
                  
                  {/* Exclusive CTA */}
                  <div className="flex items-center justify-center space-x-2 text-slate-400/80 group-hover:text-emerald-300 transition-all duration-500">
                    <span className="text-xs tracking-wider font-light">EXCLUSIVE TOPUP</span>
                    <div className="transform group-hover:translate-x-1 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-emerald-400 text-sm">⟫</span>
                    </div>
                  </div>
                </div>

                {/* Premium Hover Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-emerald-400/3 blur-xl transition-opacity duration-500 ${
                  hoveredGame === game.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>

              {/* Luxury Shadow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/10 via-green-400/5 to-transparent opacity-0 group-hover:opacity-100 transform scale-105 transition-all duration-500 -z-10"></div>
            </Link>
          ))}
        </div>

        {/* Exclusive Footer */}
        <div className="text-center mt-20 pt-12 border-t border-slate-800/30">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-400/70 text-sm font-light tracking-wide">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"></div>
              <span>Priority Processing</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-700/50"></div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/30"></div>
              <span>Exclusive Rates</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-700/50"></div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"></div>
              <span>VIP Support</span>
            </div>
          </div>
          
          {/* Premium Seal */}
          <div className="mt-8 flex justify-center">
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-full px-6 py-3">
              <div className="flex items-center space-x-2 text-emerald-300/80 text-sm">
                <span className="text-emerald-400">✦</span>
                <span className="tracking-widest font-light">PREMIUM SERVICE</span>
                <span className="text-emerald-400">✦</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation untuk Shine Effect */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shine {
          animation: shine 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}