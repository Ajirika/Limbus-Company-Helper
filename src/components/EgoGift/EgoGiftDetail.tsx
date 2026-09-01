"use client";

import { EgoGift } from "@/types/EgoGift";

interface EgoGiftDetailProps {
  gift: EgoGift;
  depth: number;
  onMaterialClick: (materialName: string, depth: number) => void;
  onClose: (depth: number) => void;
}

export default function EgoGiftDetail({
  gift,
  depth,
  onMaterialClick,
  onClose,
}: EgoGiftDetailProps) {
  return (
    <section>
      <hr />
      <h2>상세 정보 {depth > 0 && `(재료 단계 ${depth})`}</h2>

      <h3>{gift.Title}</h3>
      <img src={gift.Image} alt={gift.Title} width={100} height={100} />
      <h3>분류 : {gift.Classification}</h3>
      <h3>키워드 : {gift.Keyword.join(", ")}</h3>
      <h3>등급 : {gift.Rate}등급</h3>

      {/* 조합식 / material 누르면 selectedGifts 끝에 material 추가 */}
      {gift.CombinationFormula && gift.CombinationFormula.length > 0 && (
        <div>
          <h4>조합식</h4>
          <div>
            {gift.CombinationFormula.map((material, idx) => {
              const isLast = idx === gift.CombinationFormula.length - 1;

              return (
                <span key={idx}>
                  <button onClick={() => onMaterialClick(material, depth)}>
                    {material}
                  </button>
                  {!isLast && " + "}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* 효과 */}
      <div>
        <h4>효과</h4>
        <ul>
          {gift.Effect.map((effectText, idx) => (
            <li key={idx}>{effectText}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => onClose(depth)}>닫기</button>
      <hr />
    </section>
  );
}