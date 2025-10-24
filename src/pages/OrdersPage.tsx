export default function OrdersPage() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  return (
    <div className="max-w-4xl mx-auto p-6 text-slate-100">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        Riwayat Pesanan
      </h2>

      {orders.length === 0 ? (
        <p className="text-slate-400">Belum ada riwayat pesanan.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="bg-slate-800 p-4 rounded-xl border border-slate-700"
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm text-slate-400">{order.date}</span>
                <span className="font-semibold text-yellow-400">
                  Rp{order.total.toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-1">
                <strong>{order.username}</strong> ({order.userId})
              </p>
              <p className="text-xs text-slate-400 mb-2">
                Status:{" "}
                <span className="text-green-400 font-medium">
                  {order.status}
                </span>
              </p>
              <ul className="text-slate-400 text-sm">
                {order.items.map((i: any) => (
                  <li key={i.id}>
                    • {i.name} × {i.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
