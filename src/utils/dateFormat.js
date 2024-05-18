// 處理日期顯示格式
export const formatDate = (dateString) => {
  const date = new Date(dateString.replace(" ", "T")); // 將空格替換為 T

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); //月份從0開始所以+1
  const day = date.getDate().toString().padStart(2, "0"); //兩位數顯示，不足補0

  const weekdays = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const weekday = weekdays[date.getDay()];

  return `${year}/${month}/${day} ${weekday}`;
};

//處理時間顯示格式
export const formatTime = (time) => {
  return time.slice(0, 5); // 取前兩個字元，即小時和分鐘部分
};

// 處理日期顯示格式
export const formatSearchDate = (dateString) => {
  const date = new Date(dateString.replace(" ", "T")); // 將空格替換為 T

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); //月份從0開始所以+1
  const day = date.getDate().toString().padStart(2, "0"); //兩位數顯示，不足補0

  return `${year}/${month}/${day}`;
};
