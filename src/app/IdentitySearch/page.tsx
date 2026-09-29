"use client";

import { useState, useMemo } from "react";
import { Identity } from "@/types/Identity";
import { EgoGift } from "@/types/EgoGift";
import identityData from "@/data/Identity.json";
import EgoGiftData from "@/data/EgoGift.json";
import EgoGiftGrid from "@/components/EgoGift/EgoGiftGrid";

export default function IdentitySearchPage() {
  const Identitys: Identity[] = identityData;
  const EgoGifts: EgoGift[] = EgoGiftData;
  const Sinners = [
    "이상", "파우스트", "돈키호테", "로슈", "뫼르소", "홍루",
    "히스클리프", "이스마엘", "로쟈", "싱클레어", "오티스", "그레고르"
  ];

  // 1. 상태 선언
  const [selectedGifts, setSelectedGifts] = useState<EgoGift[]>([]);
  const [selectedIdentity, setSelectedIdentity] = useState<(Identity | null)[]>(
    Array(12).fill(null)
  );

  // 2. 수감자 선택/해제 핸들러
  const pickedSinner = (sinnerIdentity: Identity, isSelected: boolean) => {
    const idx = Sinners.indexOf(sinnerIdentity.Sinner);
    if (idx === -1) return;

    setSelectedIdentity((prev) => {
      const next = [...prev];
      next[idx] = isSelected ? sinnerIdentity : null;
      return next;
    });
  };

  // 3. 순수 키워드 목록 계산 (예: ["화상", "출혈"])
  // EGO Gift 데이터에는 "화상 2인"이 아니라 "화상"으로 들어가 있으므로,
  // 필터링을 위해 인원수("2인")가 붙지 않은 pureKeywords를 함께 구합니다.
  const activeIdentities = selectedIdentity.filter(
    (identity): identity is Identity => identity !== null
  );

  const pureKeywords = useMemo(() => {
    const set = new Set<string>();
    activeIdentities.forEach((identity) => {
      identity.Keyword.forEach((kw) => set.add(kw));
    });
    return Array.from(set);
  }, [selectedIdentity]);

  // 화면 표시용 [키워드 N인] 문자열 배열
  const activeKeywords = useMemo(() => {
    const keywordCounts: Record<string, number> = {};

    activeIdentities.forEach((identity) => {
      const uniqueKeywords = new Set(identity.Keyword);
      uniqueKeywords.forEach((keyword) => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });
    });

    return Object.entries(keywordCounts).map(([keyword, count]) =>
      count === 1 ? keyword : `${keyword} ${count}인`
    );
  }, [selectedIdentity]);

  // 4. 💡 useState 및 useEffect 대신 계산된 값(Calculated Value)으로 즉시 필터링
  // pureKeywords가 변경될 때만 재연산됩니다.
  const activeEgoGifts = useMemo(() => {
    if (pureKeywords.length === 0) return [];

    const setKeyword = new Set(pureKeywords);
    return EgoGifts.filter((item) =>
      item.Keyword.some((val) => setKeyword.has(val))
    );
  }, [pureKeywords, EgoGifts]);

  // 클릭 핸들러
  const handleInitialSelect = (gift: EgoGift) => {
    setSelectedGifts([gift]);
  };

  return (
    <main>
      <h1>인격 검색 및 조합 분석</h1>

      {/* 1. 인격 선택 리스트 */}
      <section>
        <h2>인격 목록</h2>
        <div>
          {Identitys.map((item, idx) => {
            const sinnerIdx = Sinners.indexOf(item.Sinner);
            const isCurrentSelected =
              selectedIdentity[sinnerIdx]?.Title === item.Title;

            return (
              <div key={idx}>
                <select
                  value={isCurrentSelected ? "선택" : "해제"}
                  onChange={(e) => pickedSinner(item, e.target.value === "선택")}
                >
                  <option value="해제">해제</option>
                  <option value="선택">선택</option>
                </select>

                <button>
                  <h3>
                    [{item.Sinner}] {item.Title}
                  </h3>
                  <img
                    src={item.Image}
                    alt={item.Title}
                    width={150}
                    height={100}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <hr />

      {/* 2. 선택된 키워드 현황 표시 영역 */}
      <section>
        <div>
          {activeKeywords.length > 0 ? (
            <ul>
              <p>선택된 키워드 : {activeKeywords.join(", ")}</p>
            </ul>
          ) : (
            <p>선택된 인격이 없습니다.</p>
          )}
        </div>
      </section>

      {/* 3. 기프트 목록 (필터링된 결과) */}
      <EgoGiftGrid
        gifts={activeEgoGifts}
        onSelectGift={handleInitialSelect}
      />
    </main>
  );
}