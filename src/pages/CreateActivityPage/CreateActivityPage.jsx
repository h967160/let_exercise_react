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
import { useActivity } from "@/contexts/ActivityContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// 程度選項
const levels = [
  { value: 1, name: "新手" },
  { value: 2, name: "初階" },
  { value: 3, name: "初中階" },
  { value: 4, name: "中階" },
  { value: 5, name: "中高階" },
  { value: 6, name: "高階" },
  { value: 7, name: "職業級" },
  { value: 8, name: "不限" },
];

// 供球
const yesNo = [
  { value: 1, name: "是" },
  { value: 2, name: "否" },
];

// 型號
const shuttlecocks = [
  { value: 1, name: "【VICTOR】MASTER NO.1國際比賽級羽毛球" },
  { value: 2, name: "【VICTOR】B-01N藍蓋 新比賽級羽毛球" },
  { value: 3, name: "【VICTOR】SELECT B-09精選級 羽毛球" },
];

const CreateActivityPage = () => {
  const { isAuthenticated, user } = useAuth();
  const {
    regions,
    selectedRegion,
    setSelectedRegion,
    arenaSearch,
    setArenaSearch,
    filteredArenas,
    selectArena,
  } = useArena();
  const { createActivity } = useActivity();
  const [formData, setFormData] = useState({
    arenaId: "",
    shuttlecockId: "",
    date: "",
    timeStart: "",
    timeEnd: "",
    shuttlecockProvide: "",
    levelId: "",
    fee: "",
    numsOfPeople: "",
    totalPeople: "",
  });
  const navigate = useNavigate();
  const handleRegionChange = (event) => {
    setSelectedRegion(parseInt(event.target.value));
    // 清空已選擇的場館
    setFormData({
      ...formData,
      arenaId: "",
    });
  };

  const handleArenaSearchChange = (event) => {
    setArenaSearch(parseInt(event.target.value));
    // 清空已選擇的場館
    setFormData({
      ...formData,
      arenaId: "",
    });
  };

  const handleArenaChange = (event) => {
    const selectedArenaId = parseInt(event.target.value);
    setFormData({
      ...formData,
      arenaId: selectedArenaId,
    });
    selectArena(selectedArenaId);
  };

  const handleShuttlecockProvideChange = (event) => {
    const provideShuttlecock = parseInt(event.target.value);
    setFormData({
      ...formData,
      shuttlecockProvide: provideShuttlecock,
    });
  };

  const handleLevelChange = (event) => {
    const selectedLevel = parseInt(event.target.value);
    setFormData({
      ...formData,
      levelId: selectedLevel,
    });
  };

  const handleTimeStartChange = (event) => {
    const timeStartValue = event.target.value;
    setFormData({
      ...formData,
      timeStart: timeStartValue,
    });
  };

  const handleTimeEndChange = (event) => {
    const timeEndValue = event.target.value;
    setFormData({
      ...formData,
      timeEnd: timeEndValue,
    });
  };

  const handleDateChange = (event) => {
    const dateValue = event.target.value;
    setFormData({
      ...formData,
      date: dateValue,
    });
  };

  const handleFeeChange = (event) => {
    const feeValue = parseInt(event.target.value);
    setFormData({
      ...formData,
      fee: feeValue,
    });
  };

  const handleNumsOfPeopleChange = (event) => {
    const numsOfPeopleValue = parseInt(event.target.value);
    setFormData({
      ...formData,
      numsOfPeople: numsOfPeopleValue,
    });
  };

  const handleTotalPeopleChange = (event) => {
    const totalPeopleValue = parseInt(event.target.value);
    setFormData({
      ...formData,
      totalPeople: totalPeopleValue,
    });
  };

  const handleShuttlecockChange = (event) => {
    const selectedShuttlecockId = parseInt(event.target.value);
    setFormData({
      ...formData,
      shuttlecockId: selectedShuttlecockId,
    });
  };

  const handleDescriptionChange = (event) => {
    const descriptionValue = event.target.value;
    setFormData({
      ...formData,
      description: descriptionValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      Swal.fire({
        position: "top",
        title: "請先登入！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      navigate("/login");
      return;
    }

    const activityData = {
      ...formData,
      hostId: user && user.id,
    };

    try {
      const response = await createActivity(activityData);
      if (response.status === "Success") {
        Swal.fire({
          position: "top",
          title: "建立活動成功！",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          position: "top",
          title: "建立活動失敗！",
          timer: 1000,
          icon: "error",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("创建活动失败：", error.message);
      Swal.fire({
        position: "top",
        title: "创建活动失败！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };
  const handleAutoFill = (event) => {
    event.preventDefault();
    setFormData({
      shuttlecockId: 1,
      date: "2024-06-30",
      timeStart: "18:00",
      timeEnd: "20:00",
      shuttlecockProvide: 1,
      levelId: 1,
      fee: 100,
      numsOfPeople: 5,
      totalPeople: 10,
      description: "出來玩!",
    });
  };

  return (
    <>
      <Header />
      <FormBox>
        <Button
          className={styles.autoFillButton}
          text={"一鍵輸入"}
          onClick={handleAutoFill}
        />
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
            {formData.arenaId ? (
              <Select
                id="selectedArenaId"
                name="selectedArenaId"
                item={"請選擇場館"}
                options={[
                  {
                    value: formData.arenaId,
                    name: `${
                      filteredArenas.find(
                        (arena) => arena.arenaId === parseInt(formData.arenaId)
                      )?.name
                    } (${
                      filteredArenas.find(
                        (arena) => arena.arenaId === parseInt(formData.arenaId)
                      )?.address
                    })`,
                  },
                  ...filteredArenas
                    .filter(
                      (arena) => arena.arenaId !== parseInt(formData.arenaId)
                    ) // 排除已選擇的場館
                    .map((arena) => ({
                      value: arena.arenaId,
                      name: `${arena.name} (${arena.address})`,
                    })),
                ]}
                value={formData.arenaId}
                onChange={handleArenaChange}
              />
            ) : (
              // 如果尚未選擇場館或重新篩選後無場館，顯示選擇場館的下拉選單
              <Select
                id="arenaId"
                name="arenaId"
                item={"請選擇場館"}
                options={[
                  ...filteredArenas
                    .filter(
                      (arena) => arena.arenaId !== parseInt(formData.arenaId)
                    ) // 排除已選擇的場館
                    .map((arena) => ({
                      value: arena.arenaId,
                      name: `${arena.name} (${arena.address})`,
                    })),
                ]}
                value={formData.arenaId}
                onChange={handleArenaChange}
                size={filteredArenas.length > 0 ? filteredArenas.length + 1 : 1}
              />
            )}
          </div>
        </FormGroup>

        <FormGroup>
          <div className={styles.formRow}>
            <div className={styles.box}>
              <label htmlFor="shuttlecockProvide">供球</label>
              <Select
                id="shuttlecockProvide"
                name="shuttlecockProvide"
                value={formData.shuttlecockProvide}
                options={yesNo}
                item={"請選擇是否提供羽毛球"}
                onChange={handleShuttlecockProvideChange}
              />
            </div>
            <div className={styles.box}>
              <Select
                label={"程度"}
                id="levelId"
                name="levelId"
                options={levels}
                item={"請選擇程度"}
                value={formData.levelId}
                onChange={handleLevelChange}
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
              value={formData.shuttlecockId}
              onChange={handleShuttlecockChange}
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
          <Input
            type="date"
            id="date"
            name="date"
            label={"日期"}
            value={formData.date}
            onChange={handleDateChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="timeStart">時間</label>
          <div className={styles.timeInput}>
            <Input
              type="time"
              id="timeStart"
              name="timeStart"
              value={formData.timeStart}
              onChange={handleTimeStartChange}
            />
            <span className="timeRangeSeparator">至</span>
            <Input
              type="time"
              id="timeEnd"
              name="timeEnd"
              value={formData.timeEnd}
              onChange={handleTimeEndChange}
            />
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
                value={formData.fee}
                onChange={handleFeeChange}
              ></Input>
            </div>
            <div className={styles.box}>
              <Input
                type="number"
                id="numsOfPeople"
                name="numsOfPeople"
                label={"需求人數"}
                placeholder="請輸入人數"
                value={formData.numsOfPeople}
                onChange={handleNumsOfPeopleChange}
              ></Input>
            </div>
            <div className={styles.box}>
              <Input
                type="number"
                id="totalPeople"
                name="totalPeople"
                label={"總共人數"}
                placeholder="請輸入人數"
                value={formData.totalPeople}
                onChange={handleTotalPeopleChange}
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
            value={formData.description}
            onChange={handleDescriptionChange}
          />
        </FormGroup>
        <Button
          className={styles.submitButton}
          text={"送出"}
          onClick={handleSubmit}
        ></Button>
      </FormBox>
      <Footer />
    </>
  );
};

export default CreateActivityPage;
