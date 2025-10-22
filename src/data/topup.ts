export interface TopupItem {
  id: number;
  gameId: number;
  name: string;
  amount: number;
  price: number;
  type?: 'regular' | 'weekly' | 'monthly' | 'bundle' | 'special' | 'daily';
  description?: string;
}

export const topupItems: TopupItem[] = [
  // ========== MOBILE LEGENDS (gameId: 1) ==========
  { id: 1, gameId: 1, name: "86 Diamonds", amount: 86, price: 20000, type: 'regular' },
  { id: 2, gameId: 1, name: "170 Diamonds", amount: 170, price: 40000, type: 'regular' },
  { id: 3, gameId: 1, name: "257 Diamonds", amount: 257, price: 60000, type: 'regular' },
  { id: 4, gameId: 1, name: "344 Diamonds", amount: 344, price: 80000, type: 'regular' },
  { id: 5, gameId: 1, name: "429 Diamonds", amount: 429, price: 100000, type: 'regular' },
  { id: 64, gameId: 1, name: "Weekly Diamond Pass", amount: 100, price: 15000, type: 'weekly', description: "100 Diamonds + Bonus 20/week" },
  { id: 65, gameId: 1, name: "Monthly Diamond Pass", amount: 500, price: 60000, type: 'monthly', description: "500 Diamonds + Bonus 100/month" },
  { id: 66, gameId: 1, name: "Starlight Member Plus", amount: 300, price: 50000, type: 'monthly', description: "300 Diamonds + Exclusive Skin" },
  { id: 67, gameId: 1, name: "Twilight Pass", amount: 150, price: 25000, type: 'weekly', description: "150 Diamonds + Emblem Pack" },
  { id: 68, gameId: 1, name: "Starter Bundle", amount: 200, price: 35000, type: 'bundle', description: "200 Diamonds + Rare Skin" },
  { id: 69, gameId: 1, name: "Pro Player Bundle", amount: 800, price: 140000, type: 'bundle', description: "800 Diamonds + Epic Skin" },
  { id: 70, gameId: 1, name: "Ultimate Bundle", amount: 1500, price: 250000, type: 'bundle', description: "1500 Diamonds + Legend Skin" },

  // ========== FREE FIRE (gameId: 2) ==========
  { id: 6, gameId: 2, name: "100 Diamonds", amount: 100, price: 15000, type: 'regular' },
  { id: 7, gameId: 2, name: "210 Diamonds", amount: 210, price: 30000, type: 'regular' },
  { id: 8, gameId: 2, name: "530 Diamonds", amount: 530, price: 75000, type: 'regular' },
  { id: 9, gameId: 2, name: "1100 Diamonds", amount: 1100, price: 150000, type: 'regular' },
  { id: 10, gameId: 2, name: "2250 Diamonds", amount: 2250, price: 300000, type: 'regular' },
  { id: 71, gameId: 2, name: "Elite Pass", amount: 500, price: 80000, type: 'monthly', description: "500 Diamonds + Elite Rewards" },
  { id: 72, gameId: 2, name: "Weekly Booyah Pass", amount: 150, price: 20000, type: 'weekly', description: "150 Diamonds + Weekly Items" },
  { id: 73, gameId: 2, name: "Battle Bundle", amount: 800, price: 120000, type: 'bundle', description: "800 Diamonds + Weapon Skin" },

  // ========== PUBG MOBILE (gameId: 3) ==========
  { id: 11, gameId: 3, name: "60 UC", amount: 60, price: 12000, type: 'regular' },
  { id: 12, gameId: 3, name: "325 UC", amount: 325, price: 60000, type: 'regular' },
  { id: 13, gameId: 3, name: "660 UC", amount: 660, price: 110000, type: 'regular' },
  { id: 14, gameId: 3, name: "1800 UC", amount: 1800, price: 300000, type: 'regular' },
  { id: 15, gameId: 3, name: "3850 UC", amount: 3850, price: 600000, type: 'regular' },
  { id: 74, gameId: 3, name: "Royale Pass Plus", amount: 600, price: 90000, type: 'monthly', description: "600 UC + Premium Rewards" },
  { id: 75, gameId: 3, name: "Weekly UC Pass", amount: 100, price: 15000, type: 'weekly', description: "100 UC + Weekly Missions" },

  // ========== GENSHIN IMPACT (gameId: 4) ==========
  { id: 81, gameId: 4, name: "60 Genesis Crystals", amount: 60, price: 15000, type: 'regular' },
  { id: 82, gameId: 4, name: "300 Genesis Crystals", amount: 300, price: 70000, type: 'regular' },
  { id: 83, gameId: 4, name: "980 Genesis Crystals", amount: 980, price: 200000, type: 'regular' },
  { id: 84, gameId: 4, name: "1980 Genesis Crystals", amount: 1980, price: 380000, type: 'regular' },
  { id: 85, gameId: 4, name: "3280 Genesis Crystals", amount: 3280, price: 600000, type: 'regular' },
  { id: 86, gameId: 4, name: "Blessing of the Welkin Moon", amount: 3000, price: 80000, type: 'monthly', description: "3000 Crystals over 30 days" },
  { id: 87, gameId: 4, name: "Battle Pass Gnostic Hymn", amount: 2000, price: 120000, type: 'monthly', description: "2000 Crystals + Resources" },

  // ========== CLASH OF CLANS (gameId: 5) ==========
  { id: 16, gameId: 5, name: "500 Gems", amount: 500, price: 75000, type: 'regular' },
  { id: 17, gameId: 5, name: "1200 Gems", amount: 1200, price: 150000, type: 'regular' },
  { id: 18, gameId: 5, name: "2500 Gems", amount: 2500, price: 300000, type: 'regular' },
  { id: 76, gameId: 5, name: "Gold Pass", amount: 1500, price: 80000, type: 'monthly', description: "1500 Gems + Season Rewards" },
  { id: 77, gameId: 5, name: "Builder Pack", amount: 800, price: 50000, type: 'bundle', description: "800 Gems + Builder Potions" },

  // ========== STEAM WALLET (gameId: 6) ==========
  { id: 19, gameId: 6, name: "IDR 20,000", amount: 20000, price: 20000, type: 'regular' },
  { id: 20, gameId: 6, name: "IDR 50,000", amount: 50000, price: 50000, type: 'regular' },
  { id: 21, gameId: 6, name: "IDR 100,000", amount: 100000, price: 100000, type: 'regular' },
  { id: 22, gameId: 6, name: "IDR 200,000", amount: 200000, price: 200000, type: 'regular' },

  // ========== VALORANT (gameId: 7) ==========
  { id: 23, gameId: 7, name: "125 VP", amount: 125, price: 15000, type: 'regular' },
  { id: 24, gameId: 7, name: "420 VP", amount: 420, price: 50000, type: 'regular' },
  { id: 25, gameId: 7, name: "700 VP", amount: 700, price: 80000, type: 'regular' },
  { id: 26, gameId: 7, name: "1375 VP", amount: 1375, price: 150000, type: 'regular' },
  { id: 78, gameId: 7, name: "Battle Pass", amount: 1000, price: 120000, type: 'monthly', description: "1000 VP + Premium Rewards" },
  { id: 79, gameId: 7, name: "Weekly Skin Bundle", amount: 500, price: 60000, type: 'weekly', description: "500 VP + Exclusive Skin" },

  // ========== WILD RIFT (gameId: 8) ==========
  { id: 27, gameId: 8, name: "200 Wild Cores", amount: 200, price: 25000, type: 'regular' },
  { id: 28, gameId: 8, name: "500 Wild Cores", amount: 500, price: 60000, type: 'regular' },
  { id: 29, gameId: 8, name: "1000 Wild Cores", amount: 1000, price: 120000, type: 'regular' },
  { id: 30, gameId: 8, name: "2000 Wild Cores", amount: 2000, price: 240000, type: 'regular' },
  { id: 80, gameId: 8, name: "Wild Pass", amount: 800, price: 90000, type: 'monthly', description: "800 Cores + Season Rewards" },

  // ========== HONOR OF KINGS (gameId: 9) ==========
  { id: 31, gameId: 9, name: "100 Tokens", amount: 100, price: 20000, type: 'regular' },
  { id: 32, gameId: 9, name: "500 Tokens", amount: 500, price: 90000, type: 'regular' },
  { id: 33, gameId: 9, name: "1000 Tokens", amount: 1000, price: 180000, type: 'regular' },

  // ========== APEX LEGENDS MOBILE (gameId: 10) ==========
  { id: 34, gameId: 10, name: "500 Apex Coins", amount: 500, price: 60000, type: 'regular' },
  { id: 35, gameId: 10, name: "1000 Apex Coins", amount: 1000, price: 120000, type: 'regular' },
  { id: 36, gameId: 10, name: "2000 Apex Coins", amount: 2000, price: 240000, type: 'regular' },

  // ========== CALL OF DUTY: MOBILE (gameId: 11) ==========
  { id: 37, gameId: 11, name: "80 CP", amount: 80, price: 15000, type: 'regular' },
  { id: 38, gameId: 11, name: "400 CP", amount: 400, price: 70000, type: 'regular' },
  { id: 39, gameId: 11, name: "1000 CP", amount: 1000, price: 150000, type: 'regular' },

  // ========== HONKAI: STAR RAIL (gameId: 12) ==========
  { id: 40, gameId: 12, name: "60 Oneiric Shards", amount: 60, price: 15000, type: 'regular' },
  { id: 41, gameId: 12, name: "300 Oneiric Shards", amount: 300, price: 70000, type: 'regular' },
  { id: 42, gameId: 12, name: "980 Oneiric Shards", amount: 980, price: 200000, type: 'regular' },
  { id: 88, gameId: 12, name: "Express Supply Pass", amount: 90, price: 30000, type: 'daily', description: "90 Shards daily for 30 days" },
  { id: 89, gameId: 12, name: "Nameless Glory", amount: 2000, price: 100000, type: 'monthly', description: "2000 Shards + Rewards" },

  // ========== ROBLOX (gameId: 13) ==========
  { id: 43, gameId: 13, name: "400 Robux", amount: 400, price: 50000, type: 'regular' },
  { id: 44, gameId: 13, name: "800 Robux", amount: 800, price: 100000, type: 'regular' },
  { id: 45, gameId: 13, name: "2000 Robux", amount: 2000, price: 250000, type: 'regular' },
  { id: 90, gameId: 13, name: "Premium Membership", amount: 450, price: 60000, type: 'monthly', description: "450 Robux monthly + Benefits" },

  // ========== MINECRAFT (gameId: 14) ==========
  { id: 46, gameId: 14, name: "500 Minecoins", amount: 500, price: 70000, type: 'regular' },
  { id: 47, gameId: 14, name: "1000 Minecoins", amount: 1000, price: 140000, type: 'regular' },
  { id: 48, gameId: 14, name: "2000 Minecoins", amount: 2000, price: 280000, type: 'regular' },

  // ========== FORTNITE (gameId: 15) ==========
  { id: 49, gameId: 15, name: "1000 V-Bucks", amount: 1000, price: 120000, type: 'regular' },
  { id: 50, gameId: 15, name: "2800 V-Bucks", amount: 2800, price: 300000, type: 'regular' },
  { id: 51, gameId: 15, name: "5000 V-Bucks", amount: 5000, price: 500000, type: 'regular' },
  { id: 91, gameId: 15, name: "Battle Pass", amount: 950, price: 80000, type: 'monthly', description: "950 V-Bucks + Season Rewards" },

  // ========== LEAGUE OF LEGENDS (PC) (gameId: 16) ==========
  { id: 52, gameId: 16, name: "250 RP", amount: 250, price: 30000, type: 'regular' },
  { id: 53, gameId: 16, name: "500 RP", amount: 500, price: 60000, type: 'regular' },
  { id: 54, gameId: 16, name: "1000 RP", amount: 1000, price: 120000, type: 'regular' },

  // ========== DOTA 2 (gameId: 17) ==========
  { id: 55, gameId: 17, name: "IDR 50,000", amount: 50000, price: 50000, type: 'regular' },
  { id: 56, gameId: 17, name: "IDR 100,000", amount: 100000, price: 100000, type: 'regular' },
  { id: 57, gameId: 17, name: "IDR 200,000", amount: 200000, price: 200000, type: 'regular' },

  // ========== OVERWATCH 2 (gameId: 18) ==========
  { id: 58, gameId: 18, name: "500 Overwatch Coins", amount: 500, price: 60000, type: 'regular' },
  { id: 59, gameId: 18, name: "1000 Overwatch Coins", amount: 1000, price: 120000, type: 'regular' },
  { id: 60, gameId: 18, name: "2000 Overwatch Coins", amount: 2000, price: 240000, type: 'regular' },

  // ========== FALL GUYS (gameId: 19) ==========
  { id: 61, gameId: 19, name: "1000 Show-Bucks", amount: 1000, price: 120000, type: 'regular' },
  { id: 62, gameId: 19, name: "2500 Show-Bucks", amount: 2500, price: 300000, type: 'regular' },
  { id: 63, gameId: 19, name: "5000 Show-Bucks", amount: 5000, price: 600000, type: 'regular' },

  // ========== SPECIAL PACKS ==========
  { id: 92, gameId: 1, name: "Weekend Warrior Pack", amount: 300, price: 45000, type: 'special', description: "Limited weekend offer!" },
  { id: 93, gameId: 2, name: "Booyah Day Special", amount: 1200, price: 160000, type: 'special', description: "Special event discount" },
  { id: 94, gameId: 3, name: "Season Finale Bundle", amount: 2400, price: 350000, type: 'special', description: "End of season special" },
  { id: 95, gameId: 7, name: "Champions Bundle", amount: 2000, price: 220000, type: 'special', description: "Limited time offer" },
  { id: 96, gameId: 4, name: "Anniversary Special", amount: 5000, price: 800000, type: 'special', description: "Celebratory package" },
];
