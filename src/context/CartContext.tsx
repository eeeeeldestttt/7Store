import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface OrderHistory {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  username: string;
  userId: string;
  status: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  saveOrderHistory: (user: { username: string; userId: string }) => void;
  getUserHistory: (username: string) => OrderHistory[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // ✅ Ambil keranjang dari localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("⚠️ Gagal parsing cart dari localStorage:", error);
      return [];
    }
  });

  // ✅ Simpan ke localStorage setiap kali cart berubah
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("⚠️ Gagal menyimpan cart ke localStorage:", error);
    }
  }, [cart]);

  // ✅ Tambah item ke keranjang
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: Math.max(1, p.quantity + item.quantity) }
            : p
        );
      }
      return [...prev, { ...item, quantity: Math.max(1, item.quantity) }];
    });
  };

  // ✅ Hapus item
  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  // ✅ Update jumlah
  const updateQuantity = (id: string, quantity: number) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );

  // ✅ Bersihkan keranjang
  const clearCart = () => setCart([]);

  // ✅ Total harga
  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ Total item
  const getTotalItems = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  // ✅ Simpan riwayat transaksi per user
  const saveOrderHistory = (user: { username: string; userId: string }) => {
    if (!user.username || !user.userId) return;

    const total = getTotalPrice();
    const newOrder: OrderHistory = {
      id: Date.now().toString(),
      items: [...cart],
      total,
      date: new Date().toLocaleString(),
      username: user.username,
      userId: user.userId,
      status: "Selesai",
    };

    try {
      const existing = JSON.parse(localStorage.getItem("orderHistory") || "[]");

      const updated = [...existing, newOrder];
      localStorage.setItem("orderHistory", JSON.stringify(updated));
    } catch (error) {
      console.error("⚠️ Gagal menyimpan riwayat order:", error);
    }
  };

  // ✅ Ambil riwayat berdasarkan username
  const getUserHistory = (username: string): OrderHistory[] => {
    try {
      const all = JSON.parse(localStorage.getItem("orderHistory") || "[]");
      return all.filter((o: OrderHistory) => o.username === username);
    } catch {
      return [];
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getTotalPrice,
        getTotalItems,
        saveOrderHistory,
        getUserHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("❌ useCart() harus digunakan di dalam <CartProvider>");
  return context;
}
