import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-slate-800 p-6 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">Keranjang Saya</h1>

      {cart.length === 0 ? (
        <p className="text-slate-400">Keranjang kamu kosong 😢</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-slate-700 p-3 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <img src={item.image} className="w-14 h-14 rounded" />
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-slate-400 text-sm">
                      Rp {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 text-center bg-slate-600 rounded text-white"
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-semibold text-white">
              Total: Rp {total.toLocaleString()}
            </h2>
            <button
              onClick={clearCart}
              className="bg-yellow-500 text-slate-900 font-semibold px-5 py-2 rounded-lg hover:bg-yellow-400"
            >
              Checkout Semua
            </button>
          </div>
        </>
      )}
    </div>
  );
}
