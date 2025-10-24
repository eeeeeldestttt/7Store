import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { games } from "../data/games"; // ✅ sesuai struktur baru
import type { Game } from "../types";

export default function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";

  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // 🔍 Filter game berdasarkan query
    const filtered = games.filter((g) =>
      g.name.toLowerCase().includes(query.toLowerCase())
    );

    // Simulasi efek loading biar smooth
    setTimeout(() => {
      setResults(filtered);
      setLoading(false);
    }, 400);
  }, [query]);

  if (loading)
    return (
      <p className="text-slate-300 text-center mt-10">
        Mencari "<span className="text-yellow-400">{query}</span>"...
      </p>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">
        Hasil Pencarian: {query}
      </h2>

      {results.length === 0 ? (
        <p className="text-slate-400">Tidak ada hasil ditemukan.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {results.map((game) => (
            <div
              key={game.id}
              onClick={() => navigate(`/topup/${game.id}`)} // ✅ klik langsung ke halaman topup
              className="bg-slate-800 p-3 rounded-xl shadow-lg hover:scale-[1.03] hover:bg-slate-700 transition-all cursor-pointer"
            >
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <p className="text-slate-100 font-semibold">{game.name}</p>
              <p className="text-yellow-400 text-sm">{game.currency}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
