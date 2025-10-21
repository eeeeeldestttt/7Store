// src/data/games.ts
export interface Game {
  id: number;
  name: string;
  image: string;
  currency: string; // Diamond, UC, dll
}

// ✅ Import gambar dari folder src/assets/images
import mlbb from "../assets/images/mlbb.jpg";
import ff from "../assets/images/ff.jpg";
import pubg from "../assets/images/pubg.jpg";
import gi from "../assets/images/gi.jpg";
import coc from "../assets/images/coc.jpg";
import steam from "../assets/images/steam.png";
import valorant from "../assets/images/valorant.jpg";
import wildrift from "../assets/images/lolwr.jpg";
import hok from "../assets/images/hok.jpg";
import apex from "../assets/images/apex.png";
import codm from "../assets/images/codm.jpg";
import honkai from "../assets/images/starrail.jpg";
import roblox from "../assets/images/rblx.jpg";
import minecraft from "../assets/images/mc.jpg";
import fortnite from "../assets/images/fort.jpg";
import lol from "../assets/images/lol.jpg";
import dota from "../assets/images/dota2.jpg";
import overwatch from "../assets/images/ow2.jpg";
import fallguys from "../assets/images/fall.jpg";

export const games: Game[] = [
  {
    id: 1,
    name: "Mobile Legends",
    image: mlbb,
    currency: "Diamond",
  },
  {
    id: 2,
    name: "Free Fire",
    image: ff,
    currency: "Diamond",
  },
  {
    id: 3,
    name: "PUBG Mobile",
    image: pubg,
    currency: "UC",
  },
  {
    id: 4,
    name: "Genshin Impact",
    image: gi,
    currency: "Genesis Crystal",
  },
  {
    id: 5,
    name: "Clash of Clans",
    image: coc,
    currency: "Gems",
  },
  {
    id: 6,
    name: "Steam Wallet",
    image: steam,
    currency: "Steam Wallet",
  },
  {
    id: 7,
    name: "Valorant",
    image: valorant,
    currency: "VP",
  },
  {
    id: 8,
    name: "League of Legends: Wild Rift",
    image: wildrift,
    currency: "Wild Cores",
  },
  {
    id: 9,
    name: "Honor of Kings",
    image: hok,
    currency: "Tokens",
  },
  {
    id: 10,
    name: "Apex Legends Mobile",
    image: apex,
    currency: "Apex Coins",
  },
  {
    id: 11,
    name: "Call of Duty: Mobile",
    image: codm,
    currency: "CP",
  },
 
  {
    id: 12,
    name: "Honkai: Star Rail",
    image: honkai,
    currency: "Oneiric Shards",
  },
  {
    id: 13,
    name: "Roblox",
    image: roblox,
    currency: "Robux",
  },
  {
    id: 14,
    name: "Minecraft",
    image: minecraft,
    currency: "Minecoins",
  },
  {
    id: 15,
    name: "Fortnite",
    image: fortnite,
    currency: "V-Bucks",
  },
  {
    id: 16,
    name: "League of Legends",
    image: lol,
    currency: "RP",
  },
  {
    id: 17,
    name: "Dota 2",
    image: dota,
    currency: "Steam Wallet",
  },
  {
    id: 18,
    name: "Overwatch 2",
    image: overwatch,
    currency: "Overwatch Coins",
  },
  {
    id: 19,
    name: "Fall Guys",
    image: fallguys,
    currency: "Show-Bucks",
  },
];