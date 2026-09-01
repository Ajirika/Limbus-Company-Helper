"use client";

interface EgoGiftFilterProps {
  selectedClassification: string;
  selectedKeyword: string;
  selectedRate: string;
  onClassificationChange: (value: string) => void;
  onKeywordChange: (value: string) => void;
  onRateChange: (value: string) => void;
}

export default function EgoGiftFilter({
  selectedClassification,
  selectedKeyword,
  selectedRate,
  onClassificationChange,
  onKeywordChange,
  onRateChange,
}: EgoGiftFilterProps) {
  const classifications = ["전체", "화상", "출혈", "진동", "파열", "침잠", "호흡", "충전", "참격", "관통", "타격", "범용"];
  const keywords = ["전체", "화상", "화상 5인", "범용"];
  const rates = ["전체", "1", "2", "3", "4", "5"];

  return (
    <section>
      <h2>필터</h2>
      <div>
        <label>
          분류:{" "}
          <select
            value={selectedClassification}
            onChange={(e) => onClassificationChange(e.target.value)}
          >
            {classifications.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        {" | "}

        <label>
          요구 키워드:{" "}
          <select
            value={selectedKeyword}
            onChange={(e) => onKeywordChange(e.target.value)}
          >
            {keywords.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        {" | "}

        <label>
          등급:{" "}
          <select
            value={selectedRate}
            onChange={(e) => onRateChange(e.target.value)}
          >
            {rates.map((item) => (
              <option key={item} value={item}>
                {item === "전체" ? item : `${item}등급`}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}