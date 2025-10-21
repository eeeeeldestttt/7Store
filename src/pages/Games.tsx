import { Link } from "react-router-dom";
import { games } from "../data/games";

export default function Games() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Pilih Game untuk Topup</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/topup/${game.id}`}
            className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition"
          >
            <img
              src={game.image}
              alt={game.name}
              className="rounded-md w-full h-36 object-cover mb-3"
            />
            <h3 className="text-lg font-semibold">{game.name}</h3>
            <p className="text-slate-400 text-sm">
              Currency: {game.currency}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
