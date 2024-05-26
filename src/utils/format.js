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

// 處理時間顯示格式
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

// 處理電話格式
export const formatPhoneNumber = (phoneNumber) => {
  // , 換成 #
  const formattedNumber = phoneNumber.replace(",", "#");
  const indexOfHyphen = formattedNumber.indexOf("-");

  // 如果格式化後的電話號碼中不包含-，則添加-
  if (indexOfHyphen === -1 && formattedNumber.length > 4) {
    // 檢查是否為特殊縣市，如苗栗 037-、南投 049-、台東 089-、金門 082-
    const specialAreaCodes = ["037", "049", "089", "082"];
    const areaCode = formattedNumber.substring(0, 3);
    if (specialAreaCodes.includes(areaCode)) {
      return formattedNumber.slice(0, 3) + "-" + formattedNumber.slice(3);
    } else {
      return formattedNumber.slice(0, 2) + "-" + formattedNumber.slice(2);
    }
  } else {
    return formattedNumber;
  }
};