import FormBox from "@/components/Form/FormBox";
import FormGroup from "@/components/Form/FormGroup";
import Input from "@/components/Common/Input";
import Select from "@/components/Common/Select";
import TextArea from "@/components/Common/TextArea";
import { Button } from "@/components/Common/Button/Button";
import styles from "./CreateActivityPage.module.scss";
import Header from "@/components/Layouts/Header/Header";
import Footer from "@/components/Layouts/Footer/Footer";
import { useArena } from "@/contexts/ArenaContext";

// 程度選項
const levels = [
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
  { value: "true", name: "是" },
  { value: "false", name: "否" },
];

// 型號
const shuttlecocks = [
  { value: 1, name: "【VICTOR】MASTER NO.1國際比賽級羽毛球" },
  { value: 2, name: "【VICTOR】B-01N藍蓋 新比賽級羽毛球" },
  { value: 3, name: "【VICTOR】SELECT B-09精選級 羽毛球" },
];

const CreateActivityPage = () => {
  const {
    regions,
    selectedRegion,
    setSelectedRegion,
    arenaSearch,
    setArenaSearch,
    filteredArenas,
  } = useArena();
  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleArenaSearchChange = (event) => {
    setArenaSearch(event.target.value);
  };

  return (
    <>
      <Header />
      <FormBox>
        <FormGroup>
          <div className="formLabel">
            <label htmlFor="regionId">場館</label>
          </div>
          <div className={styles.formRow}>
            <Select
              id="regionId"
              name="regionId"
              options={regions.map((region) => ({
                value: region.regionId,
                name: region.region,
              }))}
              value={selectedRegion}
              onChange={handleRegionChange}
              item={"請選擇縣市"}
            />
            <Input
              type="text"
              id="arenaSearch"
              name="arenaSearch"
              value={arenaSearch}
              onChange={handleArenaSearchChange}
              placeholder="請輸入場館"
            />
          </div>
          <div className={styles.formRow}>
            <Select
              id="arenaId"
              name="arenaId"
              options={filteredArenas.map((arena) => ({
                value: arena.arenaId,
                name: `${arena.name} (${arena.address})`,
              }))}
              item={"請選擇場館"}
              size={filteredArenas.length > 0 ? filteredArenas.length + 1 : 1}
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
                item={"請選擇是否提供羽毛球"}
              />
            </div>
            <div className={styles.box}>
              <Select
                label={"程度"}
                id="level"
                name="level"
                options={levels}
                item={"請選擇程度"}
              />
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
              item={"請選擇羽毛球型號"}
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
              <Input
                type="number"
                id="fee"
                name="fee"
                label={"費用"}
                placeholder="請輸入費用"
              ></Input>
            </div>
            <div className={styles.box}>
              <Input
                type="number"
                id="numsOfPeople"
                name="numsOfPeople"
                label={"需求人數"}
                placeholder="請輸入人數"
              ></Input>
            </div>
            <div className={styles.box}>
              <Input
                type="number"
                id="totalPeople"
                name="totalPeople"
                label={"總共人數"}
                placeholder="請輸入人數"
              ></Input>
            </div>
          </div>
        </FormGroup>
        <FormGroup>
          <TextArea
            id="description"
            name="description"
            label={"描述"}
            placeholder="最多150字元"
          />
        </FormGroup>
        <Button className={styles.submitButton} text={"送出"}></Button>
      </FormBox>
      <Footer />
    </>
  );
};

export default CreateActivityPage;
