"use client";

import { useState } from "react";
import { EgoGift } from "@/types/EgoGift";
import EgoGiftData from "@/data/EgoGift/table.json";
import EgoGiftFilter from "@/components/EgoGift/EgoGiftFilter";
import EgoGiftGrid from "@/components/EgoGift/EgoGiftGrid";
import EgoGiftDetail from "@/components/EgoGift/EgoGiftDetail";

// 기프트 도감
// 먼저 기프트 이미지로만 뿌려줌
// 이미지 클릭하면 상세 정보 보여줌
// 조합식에 있는 재료 클릭하면 밑에 창 새로 열어서 재료 상세 정보 보여줌
// 상세 정보 닫기 누르면 하위 창도 한 번에 닫음
// 분류, 요구 키워드, 등급으로 필터링
export default function EgoGiftCompendiumPage() {
  const EgoGifts: EgoGift[] = EgoGiftData;

  // 기프트 필터링 상태
  // 필터링 목록 : 분류(Classification), 요구 키워드(Keyword), 등급(Rate)
  const [selectedClassification, setSelectedClassification] = useState<string>("전체");
  const [selectedKeyword, setSelectedKeyword] = useState<string>("전체");
  const [selectedRate, setSelectedRate] = useState<string>("전체");

  // 현재 선택한 기프트 목록 -> 이 목록에 있으면 상세 정보 창이 열림
  const [selectedGifts, setSelectedGifts] = useState<EgoGift[]>([]);

  // 기프트 필터링
  const filteredGifts = EgoGifts.filter((gift) => {
    const matchesClassification =
      selectedClassification === "전체" || gift.Classification === selectedClassification;
    const matchesKeyword =
      selectedKeyword === "전체" || gift.Keyword.includes(selectedKeyword);
    const matchesRate =
      selectedRate === "전체" || gift.Rate === selectedRate;

    return matchesClassification && matchesKeyword && matchesRate;
  });

  // 조합식 재료 클릭이 아닌 목록에 있는 기프트를 클릭하면 선택한 기프트 목록을 클릭한 기프트로 초기화 
  const handleInitialSelect = (gift: EgoGift) => {
    setSelectedGifts([gift]);
  };

  // 조합식 재료를 클릭했을 때 선택한 기프트 목록 맨 마지막에 클릭한 기프트를 추가 -> 하위 창 열림
  const handleMaterialClick = (materialName: string, depth: number) => {
    const targetGift = EgoGifts.find((gift) => gift.Title === materialName);
    if (targetGift) {
      setSelectedGifts((prev) => [...prev.slice(0, depth + 1), targetGift]);
    } else {
      console.warn(`'${materialName}' 기프트를 찾을 수 없습니다.`);
    }
  };

  // 닫기 버튼 눌렀을 때 창이 닫히되, 하위로 펼친 추가적인 창들도 한 번에 닫히게
  const handleClose = (depth: number) => {
    setSelectedGifts((prev) => prev.slice(0, depth));
  };

  return (
    <main>
      <h1>기프트 도감</h1>

      {/* 기프트 필터 */}
      <EgoGiftFilter
        selectedClassification={selectedClassification}
        selectedKeyword={selectedKeyword}
        selectedRate={selectedRate}
        onClassificationChange={setSelectedClassification}
        onKeywordChange={setSelectedKeyword}
        onRateChange={setSelectedRate}
      />

      <hr />

      {/* 기프트 목록 */}
      <EgoGiftGrid
        gifts={filteredGifts}
        onSelectGift={handleInitialSelect}
      />

      {/* 기프트 상세 정보 */}
      {selectedGifts.map((gift, depth) => (
        <EgoGiftDetail
          key={`${gift.Title}-${depth}`}
          gift={gift}
          depth={depth}
          onMaterialClick={handleMaterialClick}
          onClose={handleClose}
        />
      ))}
    </main>
  );
}