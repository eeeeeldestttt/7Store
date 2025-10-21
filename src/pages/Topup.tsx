import { useParams, Link } from "react-router-dom";
import { games } from "../data/games";
import { topupItems } from "../data/topup";

export default function Topup() {
  const { id } = useParams();
  const gameId = Number(id);

  const game = games.find((g) => g.id === gameId);
  const items = topupItems.filter((item) => item.gameId === gameId);

  if (!game) {
    return (
      <div className="p-6">
        <p>Game tidak ditemukan.</p>
        <Link to="/games" className="text-indigo-400 underline">
          Kembali ke daftar game
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={game.image}
          alt={game.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-2xl font-bold">{game.name}</h2>
          <p className="text-slate-400">Topup {game.currency}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition"
          >
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-slate-400 text-sm mb-2">
              {item.amount} {game.currency}
            </p>
            <div className="font-bold text-indigo-400">
              Rp {item.price.toLocaleString("id-ID")}
            </div>
            <button className="mt-3 w-full py-1.5 rounded bg-indigo-600 hover:bg-indigo-700">
              Beli Sekarang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
