import React from "react";
import FormBox from "@/components/Form/FormBox";
import FormGroup from "@/components/Form/FormGroup";
import Input from "@/components/Common/Input";
import Select from "@/components/Common/Select";
import TextArea from "@/components/Common/TextArea";
import { Button } from "@/components/Common/Button/Button";
import styles from "./CreateActivityPage.module.scss";
import Header from "@/components/Layouts/Header/Header";
import Footer from "@/components/Layouts/Footer/Footer";

// 地區選項
const regions = [
  { value: "", name: "縣市" },
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

// 供球
const yesNo = [
  { value: "", name: "供球" },
  { value: "true", name: "是" },
  { value: "false", name: "否" },
];

// 供球
const shuttlecocks = [
  { value: "", name: "羽毛球型號" },
  { value: 1, name: "【VICTOR】MASTER NO.1國際比賽級羽毛球" },
  { value: 2, name: "【VICTOR】B-01N藍蓋 新比賽級羽毛球" },
  { value: 3, name: "【VICTOR】SELECT B-09精選級 羽毛球" },
];

const CreateActivityPage = () => {
  return (
    <>
      <Header />
      <FormBox>
        <FormGroup>
          <div className="formLabel">
            <label htmlFor="arenaId">場館</label>
          </div>
          <div className={styles.formRow}>
            <Select id="arenaId" name="arenaId" options={regions} />
            <Input
              type="text"
              id="arenaSearch"
              name="arenaSearch"
              placeholder="請輸入場館"
            />
          </div>
        </FormGroup>

        <FormGroup>
          <div className={styles.formRow}>
            <div className={styles.box}>
              <label htmlFor="shuttlecockProvide">供球</label>
              <Select
                id="shuttlecockProvide"
                name="shuttlecockProvide"
                options={yesNo}
              />
            </div>
            <div className={styles.box}>
              <Select label={"程度"} id="level" name="level" options={levels} />
            </div>
          </div>
        </FormGroup>
        <FormGroup>
          <div className="formLabel">
            <label htmlFor="shuttlecockId">羽毛球型號</label>
          </div>
          <div className={styles.formRow}>
            <Select
              id="shuttlecockId"
              name="shuttlecockId"
              options={shuttlecocks}
            />
            <Input
              type="text"
              id="shuttlecockSearch"
              name="shuttlecockSearch"
              placeholder="請輸入型號"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Input type="date" id="date" name="date" label={"日期"} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="timeStart">時間</label>
          <div className={styles.timeInput}>
            <Input type="time" id="timeStart" name="timeStart" />
            <span className="timeRangeSeparator">至</span>
            <Input type="time" id="timeEnd" name="timeEnd" />
          </div>
        </FormGroup>

        <FormGroup>
          <div className={styles.formRow}>
            <div className={styles.box}>
              <Input type="number" id="fee" name="fee" label={"費用"}></Input>
            </div>
            <div className={styles.box}>
              <Input
                type="number"
                id="numsOfPeople"
                name="numsOfPeople"
                label={"需求人數"}
              ></Input>
            </div>
            <div className={styles.box}>
              <Input
                type="number"
                id="totalPeople"
                name="totalPeople"
                label={"總共人數"}
              ></Input>
            </div>
          </div>
        </FormGroup>
        <FormGroup>
          <TextArea id="description" name="description" label={"描述"} />
        </FormGroup>
        <Button className={styles.submitButton} text={"送出"}></Button>
      </FormBox>
      <Footer/>
    </>
  );
};

export default CreateActivityPage;
