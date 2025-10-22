export interface Game {
  id: number;
  name: string;
  image: string;
  currency: string; // Diamond, UC, dll
}

export const games: Game[] = [
  {
    id: 1,
    name: "Mobile Legends",
    image: "/assets/images/mlbb.jpg",
    currency: "Diamond",
  },
  {
    id: 2,
    name: "Free Fire",
    image: "/assets/images/ff.jpg",
    currency: "Diamond",
  },
  {
    id: 3,
    name: "PUBG Mobile",
    image: "/assets/images/pubg.jpg",
    currency: "UC",
  },
  {
    id: 4,
    name: "Genshin Impact",
    image: "/assets/images/gi.jpg",
    currency: "Genesis Crystal",
  },
  {
    id: 5,
    name: "Clash of Clans",
    image: "/assets/images/coc.jpg",
    currency: "Gems",
  },
  {
    id: 6,
    name: "Steam Wallet",
    image: "/assets/images/steam.png",
    currency: "Steam Wallet",
  },
  {
    id: 7,
    name: "Valorant",
    image: "/assets/images/valorant.jpg",
    currency: "VP",
  },
  {
    id: 8,
    name: "League of Legends: Wild Rift",
    image: "/assets/images/lolwr.jpg",
    currency: "Wild Cores",
  },
  {
    id: 9,
    name: "Honor of Kings",
    image: "/assets/images/hok.jpg",
    currency: "Tokens",
  },
  {
    id: 10,
    name: "Apex Legends Mobile",
    image: "/assets/images/apex.png",
    currency: "Apex Coins",
  },
  {
    id: 11,
    name: "Call of Duty: Mobile",
    image: "/assets/images/codm.jpg",
    currency: "CP",
  },
  {
    id: 12,
    name: "Honkai: Star Rail",
    image: "/assets/images/starrail.jpg",
    currency: "Oneiric Shards",
  },
  {
    id: 13,
    name: "Roblox",
    image: "/assets/images/rblx.jpg",
    currency: "Robux",
  },
  {
    id: 14,
    name: "Minecraft",
    image: "/assets/images/mc.jpg",
    currency: "Minecoins",
  },
  {
    id: 15,
    name: "Fortnite",
    image: "/assets/images/fort.jpg",
    currency: "V-Bucks",
  },
  {
    id: 16,
    name: "League of Legends",
    image: "/assets/images/lol.jpg",
    currency: "RP",
  },
  {
    id: 17,
    name: "Dota 2",
    image: "/assets/images/dota2.jpg",
    currency: "Steam Wallet",
  },
  {
    id: 18,
    name: "Overwatch 2",
    image: "/assets/images/ow2.jpg",
    currency: "Overwatch Coins",
  },
  {
    id: 19,
    name: "Fall Guys",
    image: "/assets/images/fall.jpg",
    currency: "Show-Bucks",
  },
];
