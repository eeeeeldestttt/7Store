import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface RewardContextType {
  spins: number;
  addSpin: (count?: number) => void;
  useSpin: () => boolean;
  resetSpins: () => void;
}

const RewardContext = createContext<RewardContextType | undefined>(undefined);

export function RewardProvider({ children }: { children: ReactNode }) {
  // Ambil jumlah spin dari localStorage
  const [spins, setSpins] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("spins");
      return stored ? parseInt(stored, 10) : 0;
    } catch (error) {
      console.error("⚠️ Gagal parsing spins dari localStorage:", error);
      return 0;
    }
  });

  // Simpan ke localStorage setiap kali spin berubah
  useEffect(() => {
    try {
      localStorage.setItem("spins", spins.toString());
    } catch (error) {
      console.error("⚠️ Gagal menyimpan spins ke localStorage:", error);
    }
  }, [spins]);

  // Tambah spin (default 1)
  const addSpin = (count: number = 1) => {
    setSpins((prev) => prev + count);
  };

  // Gunakan 1 spin jika tersedia
  const useSpin = () => {
    if (spins > 0) {
      setSpins((prev) => prev - 1);
      return true;
    }
    return false;
  };

  // Reset semua spin
  const resetSpins = () => setSpins(0);

  return (
    <RewardContext.Provider value={{ spins, addSpin, useSpin, resetSpins }}>
      {children}
    </RewardContext.Provider>
  );
}

// Hook aman agar context tidak undefined
export function useReward(): RewardContextType {
  const context = useContext(RewardContext);
  if (!context) {
    throw new Error("❌ useReward() harus digunakan di dalam <RewardProvider>");
  }
  return context;
}
