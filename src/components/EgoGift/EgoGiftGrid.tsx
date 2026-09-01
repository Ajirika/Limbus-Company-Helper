"use client";

import { EgoGift } from "@/types/EgoGift";

interface EgoGiftGridProps {
  gifts: EgoGift[];
  onSelectGift: (gift: EgoGift) => void;
}

export default function EgoGiftGrid({ gifts, onSelectGift }: EgoGiftGridProps) {
  return (
    <section>
      <h3>기프트 목록 ({gifts.length}개)</h3>
      <div>
        {gifts.map((gift, idx) => (
          <button key={idx} onClick={() => onSelectGift(gift)}>
            <img src={gift.Image} alt={gift.Title} width={100} height={100} />
          </button>
        ))}
      </div>
    </section>
  );
}