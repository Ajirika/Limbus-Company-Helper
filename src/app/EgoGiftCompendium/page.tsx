import { EgoGift } from "@/types/EgoGift";
import EgoGiftData from "@/data/EgoGift.json";
import EgoGiftCompendiumClient from "./EgoGiftCompendiumClient";

export default function EgoGiftCompendiumPage() {
  const EgoGifts: EgoGift[] = EgoGiftData;

  return (
    <main>
      <h1>기프트 도감</h1>
      <EgoGiftCompendiumClient EgoGifts={EgoGifts} />
    </main>
  );
}