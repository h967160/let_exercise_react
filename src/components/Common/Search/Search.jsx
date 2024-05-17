import styles from "./Search.module.scss";

const Search = ({ className }) => {
  return (
    <section className={`${styles.search} ${className}`}>
      <select className="area cursor-point">
        <option value="">地區</option>
        <option value="area1">基隆市</option>
        <option value="area2">台北市</option>
        <option value="area3">新北市</option>
      </select>
      <select className="level cursor-point">
        <option value="">程度</option>
        <option value="level1">初級</option>
        <option value="level2">中級</option>
        <option value="level3">高級</option>
      </select>
      <input
        type="date"
        id="date"
        placeholder="日期"
        className="search-input cursor-point"
      />
      <button type="submit" className={styles.searchButton}>
        搜尋
      </button>
    </section>
  );
};

export default Search;
