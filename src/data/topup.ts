export interface TopupItem {
  id: number;
  gameId: number;
  name: string;
  amount: number;
  price: number;
}

export const topupItems: TopupItem[] = [
  // Mobile Legends
  { id: 1, gameId: 1, name: "86 Diamonds", amount: 86, price: 20000 },
  { id: 2, gameId: 1, name: "170 Diamonds", amount: 170, price: 40000 },
  { id: 3, gameId: 1, name: "257 Diamonds", amount: 257, price: 60000 },
  { id: 4, gameId: 1, name: "344 Diamonds", amount: 344, price: 80000 },
  { id: 5, gameId: 1, name: "429 Diamonds", amount: 429, price: 100000 },

  // Free Fire
  { id: 6, gameId: 2, name: "100 Diamonds", amount: 100, price: 15000 },
  { id: 7, gameId: 2, name: "210 Diamonds", amount: 210, price: 30000 },
  { id: 8, gameId: 2, name: "530 Diamonds", amount: 530, price: 75000 },
  { id: 9, gameId: 2, name: "1100 Diamonds", amount: 1100, price: 150000 },
  { id: 10, gameId: 2, name: "2250 Diamonds", amount: 2250, price: 300000 },

  // PUBG Mobile
  { id: 11, gameId: 3, name: "60 UC", amount: 60, price: 12000 },
  { id: 12, gameId: 3, name: "325 UC", amount: 325, price: 60000 },
  { id: 13, gameId: 3, name: "660 UC", amount: 660, price: 110000 },
  { id: 14, gameId: 3, name: "1800 UC", amount: 1800, price: 300000 },
  { id: 15, gameId: 3, name: "3850 UC", amount: 3850, price: 600000 },

  // Clash of Clans
  { id: 16, gameId: 5, name: "500 Gems", amount: 500, price: 75000 },
  { id: 17, gameId: 5, name: "1200 Gems", amount: 1200, price: 150000 },
  { id: 18, gameId: 5, name: "2500 Gems", amount: 2500, price: 300000 },

  // Steam Wallet
  { id: 19, gameId: 6, name: "IDR 20,000", amount: 20000, price: 20000 },
  { id: 20, gameId: 6, name: "IDR 50,000", amount: 50000, price: 50000 },
  { id: 21, gameId: 6, name: "IDR 100,000", amount: 100000, price: 100000 },
  { id: 22, gameId: 6, name: "IDR 200,000", amount: 200000, price: 200000 },

  // Valorant
  { id: 23, gameId: 7, name: "125 VP", amount: 125, price: 15000 },
  { id: 24, gameId: 7, name: "420 VP", amount: 420, price: 50000 },
  { id: 25, gameId: 7, name: "700 VP", amount: 700, price: 80000 },
  { id: 26, gameId: 7, name: "1375 VP", amount: 1375, price: 150000 },

  // League of Legends: Wild Rift
  { id: 27, gameId: 8, name: "200 Wild Cores", amount: 200, price: 25000 },
  { id: 28, gameId: 8, name: "500 Wild Cores", amount: 500, price: 60000 },
  { id: 29, gameId: 8, name: "1000 Wild Cores", amount: 1000, price: 120000 },
  { id: 30, gameId: 8, name: "2000 Wild Cores", amount: 2000, price: 240000 },

  // Honor of Kings
  { id: 31, gameId: 9, name: "100 Tokens", amount: 100, price: 20000 },
  { id: 32, gameId: 9, name: "500 Tokens", amount: 500, price: 90000 },
  { id: 33, gameId: 9, name: "1000 Tokens", amount: 1000, price: 180000 },

  // Apex Legends Mobile
  { id: 34, gameId: 10, name: "500 Apex Coins", amount: 500, price: 60000 },
  { id: 35, gameId: 10, name: "1000 Apex Coins", amount: 1000, price: 120000 },
  { id: 36, gameId: 10, name: "2000 Apex Coins", amount: 2000, price: 240000 },

  // Call of Duty: Mobile
  { id: 37, gameId: 11, name: "80 CP", amount: 80, price: 15000 },
  { id: 38, gameId: 11, name: "400 CP", amount: 400, price: 70000 },
  { id: 39, gameId: 11, name: "1000 CP", amount: 1000, price: 150000 },

  // Honkai: Star Rail
  { id: 40, gameId: 13, name: "60 Oneiric Shards", amount: 60, price: 15000 },
  { id: 41, gameId: 13, name: "300 Oneiric Shards", amount: 300, price: 70000 },
  { id: 42, gameId: 13, name: "980 Oneiric Shards", amount: 980, price: 200000 },

  // Roblox
  { id: 43, gameId: 14, name: "400 Robux", amount: 400, price: 50000 },
  { id: 44, gameId: 14, name: "800 Robux", amount: 800, price: 100000 },
  { id: 45, gameId: 14, name: "2000 Robux", amount: 2000, price: 250000 },

  // Minecraft
  { id: 46, gameId: 15, name: "500 Minecoins", amount: 500, price: 70000 },
  { id: 47, gameId: 15, name: "1000 Minecoins", amount: 1000, price: 140000 },
  { id: 48, gameId: 15, name: "2000 Minecoins", amount: 2000, price: 280000 },

  // Fortnite
  { id: 49, gameId: 16, name: "1000 V-Bucks", amount: 1000, price: 120000 },
  { id: 50, gameId: 16, name: "2800 V-Bucks", amount: 2800, price: 300000 },
  { id: 51, gameId: 16, name: "5000 V-Bucks", amount: 5000, price: 500000 },

  // League of Legends (PC)
  { id: 52, gameId: 17, name: "250 RP", amount: 250, price: 30000 },
  { id: 53, gameId: 17, name: "500 RP", amount: 500, price: 60000 },
  { id: 54, gameId: 17, name: "1000 RP", amount: 1000, price: 120000 },

  // Dota 2
  { id: 55, gameId: 18, name: "IDR 50,000", amount: 50000, price: 50000 },
  { id: 56, gameId: 18, name: "IDR 100,000", amount: 100000, price: 100000 },
  { id: 57, gameId: 18, name: "IDR 200,000", amount: 200000, price: 200000 },

  // Overwatch 2
  { id: 58, gameId: 19, name: "500 Overwatch Coins", amount: 500, price: 60000 },
  { id: 59, gameId: 19, name: "1000 Overwatch Coins", amount: 1000, price: 120000 },
  { id: 60, gameId: 19, name: "2000 Overwatch Coins", amount: 2000, price: 240000 },

  // Fall Guys
  { id: 61, gameId: 20, name: "1000 Show-Bucks", amount: 1000, price: 120000 },
  { id: 62, gameId: 20, name: "2500 Show-Bucks", amount: 2500, price: 300000 },
  { id: 63, gameId: 20, name: "5000 Show-Bucks", amount: 5000, price: 600000 },
];