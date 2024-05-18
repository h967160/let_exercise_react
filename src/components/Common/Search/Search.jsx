import styles from "./Search.module.scss";
import { useState } from "react";

// 呈現選項的元件
const Options = ({ options }) => {
  return (
    <>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </>
  );
};

// 地區選項
const regions = [
  { value: "", name: "地區" },
  { value: 1, name: "臺北市" },
  { value: 2, name: "新北市" },
  { value: 3, name: "基隆市" },
  { value: 4, name: "桃園市" },
  { value: 5, name: "新竹市" },
  { value: 6, name: "新竹縣" },
  { value: 7, name: "宜蘭縣" },
  { value: 8, name: "臺中市" },
  { value: 9, name: "苗栗縣" },
  { value: 10, name: "彰化縣" },
  { value: 11, name: "南投縣" },
  { value: 12, name: "雲林縣" },
  { value: 13, name: "高雄市" },
  { value: 14, name: "臺南市" },
  { value: 15, name: "嘉義市" },
  { value: 16, name: "嘉義縣" },
  { value: 17, name: "屏東縣" },
  { value: 18, name: "澎湖縣" },
  { value: 19, name: "花蓮縣" },
  { value: 20, name: "臺東縣" },
  { value: 21, name: "金門縣" },
  { value: 22, name: "連江縣" },
];

// 程度選項
const levels = [
  { value: "", name: "程度" },
  { value: "不限", name: "不限" },
  { value: "新手", name: "新手" },
  { value: "初階", name: "初階" },
  { value: "初中階", name: "初中階" },
  { value: "中階", name: "中階" },
  { value: "中高階", name: "中高階" },
  { value: "高階", name: "高階" },
];

// 目前只有地區可用
const Search = ({ className, onSearch }) => {
  const [regionId, setRegionId] = useState("");
  const [level, setLevel] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    onSearch({ regionId, level, date });
  };

  return (
    <section className={`${styles.search} ${className}`}>
      {/* 地區選擇 */}
      <select
        className="region cursor-point"
        value={regionId}
        onChange={(e) => setRegionId(e.target.value)}
      >
        <Options options={regions} />
      </select>

      {/* 程度選擇 */}
      <select
        className="level cursor-point"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <Options options={levels} />
      </select>
      {/* 日期輸入 */}
      <input
        type="date"
        id="date"
        className="search-input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button
        type="button"
        className={styles.searchButton}
        onClick={handleSearch}
      >
        搜尋
      </button>
    </section>
  );
};

export default Search;
