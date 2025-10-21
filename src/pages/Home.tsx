import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Selamat datang di #7Store</h1>
          <p className="text-slate-400">Platform topup game sederhana. Pilih game dan nominal untuk memulai.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Mobile Legends" desc="Diamond, Emblem, Skin" />
          <Card title="Free Fire" desc="Diamond, Elite Pass" />
          <Card title="PUBG Mobile" desc="UC, Royale" />
        </section>

        <div className="mt-8">
          <Link to="/topup" className="inline-block px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700">Mulai Topup</Link>
        </div>
      </div>
    </div>
  )
}

function Card({title, desc}: {title:string, desc:string}){
  return (
    <div className="p-4 bg-slate-800 rounded shadow">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
      <div className="mt-4">
        <button className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700">Beli</button>
      </div>
    </div>
  )
}
