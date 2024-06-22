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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useShuttlecock } from "@/contexts/ShuttlecockContext";

const CreateActivityPage = () => {
  const { isAuthenticated, user } = useAuth();
  const {
    regions,
    setSelectedRegion,
    arenaSearch,
    setArenaSearch,
    filteredArenas,
    selectArena,
  } = useArena();
  const { createActivity, levels } = useActivity();
  const {
    shuttlecocks,
    shuttlecockSearch,
    setShuttlecockSearch,
    filteredShuttlecocks,
  } = useShuttlecock();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      regionId: "",
      arenaId: "",
      shuttlecockProvide: "",
      levelId: "",
      shuttlecockId: "",
      date: "",
      timeStart: "",
      timeEnd: "",
      fee: "",
      numsOfPeople: "",
      totalPeople: "",
      description: "",
    },
  });
  const navigate = useNavigate();

  // 供球
  const yesNo = [
    { value: 1, name: "是" },
    { value: 2, name: "否" },
  ];

  // 測試用一鍵輸入按鈕 之後會刪除
  const handleQuickFill = () => {
    setValue("regionId", 3);
    setValue("shuttlecockId", 1);
    setValue("date", "2024-07-02");
    setValue("timeStart", "14:00");
    setValue("timeEnd", "16:00");
    setValue("shuttlecockProvide", 1);
    setValue("levelId", 5);
    setValue("fee", 500);
    setValue("numsOfPeople", 6);
    setValue("totalPeople", 10);
    setValue("description", "一起來玩啊!");
    // 手動觸發相關查詢和更新邏輯
    const selectedRegionId = 3; // 一鍵輸入設置的 regionId
    setSelectedRegion(selectedRegionId); // 更新選擇的地區
  };

  const handleRegionChange = (event) => {
    const selectedRegionId = parseInt(event.target.value);
    setValue("regionId", selectedRegionId);
    setSelectedRegion(selectedRegionId);
  };

  // 更新 arenaId
  const handleArenaChange = (event) => {
    const selectedArenaId = parseInt(event.target.value);
    setValue("arenaId", selectedArenaId); // 使用 setValue 更新單個字段
    selectArena(selectedArenaId); // 選擇場館

    // 更新 watchArenaId 為新選擇的場館 ID
    setValue("watchArenaId", selectedArenaId);
  };

  const watchRegionId = watch("regionId");
  const watchArenaId = watch("arenaId");

  useEffect(() => {
    // 監聽 filteredArenas 和 watchArenaId 的變化
    if (
      filteredArenas.length > 0 &&
      !filteredArenas.some((arena) => arena.arenaId === parseInt(watchArenaId))
    ) {
      // 如果篩選後的場館列表不為空，且當前選擇的 watchArenaId 不在篩選後的列表中
      setValue("arenaId", ""); // 將表單中的 arenaId 設置為空字符串，避免選擇無效場館
    }
  }, [filteredArenas, watchArenaId, setValue]);

  const isShuttlecockProvide = watch("shuttlecockProvide");
  useEffect(() => {
    if (isShuttlecockProvide === "2") {
      clearErrors("shuttlecockId");
    } else if (isShuttlecockProvide === "1") {
      setError("shuttlecockId", {
        type: "manual", //手動設置error message
        message: "羽毛球型號為必填",
      });
    }
  }, [isShuttlecockProvide, clearErrors, setError]);

  const handleArenaSearchChange = (e) => {
    const value = e.target.value;
    setArenaSearch(value); // 使用 setArenaSearch 更新 arenaSearch 的值
  };

  const handleShuttlecockSearchChange = (e) => {
    const value = e.target.value;
    setShuttlecockSearch(value);
  };
  // 驗證日期
  const validateDate = (value) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      return "日期不得早於現在時間!";
    }
    return true;
  };

  const onSubmit = async (formData) => {
    formData.numsOfPeople = parseInt(formData.numsOfPeople);
    formData.totalPeople = parseInt(formData.totalPeople);
    formData.fee = parseInt(formData.fee);

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

    formData.hostId = user && user.id;
    const response = await createActivity(formData);
    if (response && response.status === "Success") {
      Swal.fire({
        position: "top",
        title: "成功建立活動！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      return;
    } else {
      Swal.fire({
        position: "top",
        title: "建立活動失敗！",
        timer: 1000,
        text: response.message,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <Header />
      <FormBox onSubmit={handleSubmit(onSubmit)}>
        <Button
          className={styles.autoFillButton}
          text={"一鍵輸入"}
          type="button"
          onClick={handleQuickFill}
        />
        <FormGroup>
          <div className="formLabel">
            <label htmlFor="regionId">場館</label>
          </div>
          <div className={styles.formRow}>
            <div className={styles.selectContainer}>
              <Select
                id="regionId"
                name="regionId"
                options={regions.map((region) => ({
                  value: region.id,
                  name: region.region,
                }))}
                onChange={handleRegionChange}
                item={"請選擇縣市"}
                value={watchRegionId}
              />
            </div>
            <Input
              type="text"
              id="arenaSearch"
              name="arenaSearch"
              placeholder="搜尋場館"
              value={arenaSearch}
              onChange={handleArenaSearchChange}
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.selectContainer}>
              {watchArenaId ? (
                <Select
                  id="selectedArenaId"
                  name="selectedArenaId"
                  item={"請選擇場館"}
                  options={[
                    {
                      value: watchArenaId,
                      name: `${
                        filteredArenas.find(
                          (arena) => arena.arenaId === parseInt(watchArenaId)
                        )?.name
                      } (${
                        filteredArenas.find(
                          (arena) => arena.arenaId === parseInt(watchArenaId)
                        )?.address
                      })`,
                    },
                    ...filteredArenas
                      .filter(
                        (arena) => arena.arenaId !== parseInt(watchArenaId)
                      ) // 排除已選擇的場館
                      .map((arena) => ({
                        value: arena.arenaId,
                        name: `${arena.name} (${arena.address})`,
                      })),
                  ]}
                  value={watchArenaId}
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
                        (arena) => arena.arenaId !== parseInt(watchArenaId)
                      ) // 排除已選擇的場館
                      .map((arena) => ({
                        value: arena.arenaId,
                        name: `${arena.name} (${arena.address})`,
                      })),
                  ]}
                  value={watchArenaId}
                  onChange={handleArenaChange}
                  size={
                    filteredArenas.length > 0 ? filteredArenas.length + 1 : 1
                  }
                  {...register("arenaId", {
                    required: "場館為必填",
                  })}
                  error={errors.arenaId?.message}
                />
              )}
            </div>
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
                {...register("shuttlecockProvide", {
                  required: "供球為必填",
                })}
                error={errors.shuttlecockProvide?.message}
              />
            </div>
            <div className={styles.box}>
              <Select
                label={"程度"}
                id="levelId"
                name="levelId"
                options={levels.map((level) => ({
                  value: level.id,
                  name: level.level,
                }))}
                item={"請選擇程度"}
                {...register("levelId", {
                  required: "程度為必填",
                })}
                error={errors.levelId?.message}
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
              options={
                shuttlecockSearch === ""
                  ? shuttlecocks.map((shuttlecock) => ({
                      value: shuttlecock.id,
                      name: shuttlecock.name,
                    }))
                  : filteredShuttlecocks.map((shuttlecock) => ({
                      value: shuttlecock.id,
                      name: shuttlecock.name,
                    }))
              }
              item={"請選擇羽毛球型號"}
              disabled={isShuttlecockProvide === "2"}
              {...register("shuttlecockId")}
            />
            <Input
              type="text"
              id="shuttlecockSearch"
              name="shuttlecockSearch"
              placeholder="搜尋型號"
              {...register("shuttlecockSearch")}
              value={shuttlecockSearch}
              onChange={handleShuttlecockSearchChange}
              disabled={isShuttlecockProvide === "2"}
            />
          </div>
          <div className="errorPlaceholder">
            {errors && <p className="error">{errors.shuttlecockId?.message}</p>}
          </div>
        </FormGroup>
        <FormGroup>
          <div className={styles.box}>
            <Input
              type="date"
              id="date"
              name="date"
              label={"日期"}
              {...register("date", {
                required: "日期為必填",
                validate: validateDate,
              })}
              error={errors.date?.message}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <label htmlFor="timeStart">時間</label>
          <div className={styles.timeInput}>
            <div className={styles.inputWithError}>
              <Input
                type="time"
                id="timeStart"
                name="timeStart"
                {...register("timeStart", {
                  required: "開始時間為必填",
                })}
                error={errors.timeStart?.message}
              />
            </div>
            <span className={styles.timeRangeSeparator}>至</span>
            <div className={styles.inputWithError}>
              <Input
                type="time"
                id="timeEnd"
                name="timeEnd"
                {...register("timeEnd", {
                  required: "結束時間為必填",
                })}
                error={errors.timeEnd?.message}
              />
            </div>
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
                {...register("fee", {
                  required: "費用為必填",
                  validate: {
                    nonNegative: (value) =>
                      parseFloat(value) >= 0 || "費用不得為負數",
                  },
                })}
                error={errors.fee?.message}
              />
            </div>
            <div className={styles.box}>
              <Input
                type="number"
                id="numsOfPeople"
                name="numsOfPeople"
                label={"需求人數"}
                placeholder="請輸入需求人數"
                {...register("numsOfPeople", {
                  required: "需求人數為必填",
                  validate: {
                    nonNegative: (value) =>
                      parseFloat(value) > 0 || "需求人數不得為負數或零",
                  },
                })}
                error={errors.numsOfPeople?.message}
              />
            </div>
            <div className={styles.box}>
              <Input
                type="number"
                id="totalPeople"
                name="totalPeople"
                label={"總人數"}
                placeholder="請輸入總人數"
                {...register("totalPeople", {
                  required: "總人數為必填",
                  validate: {
                    nonNegative: (value) =>
                      parseFloat(value) > 0 || "總人數不得為負數或零",
                  },
                })}
                error={errors.totalPeople?.message}
              />
            </div>
          </div>
        </FormGroup>
        <FormGroup>
          <TextArea
            id="description"
            name="description"
            label={"描述"}
            placeholder="最多150字元"
            {...register("description", {
              required: "描述為必填",
              maxLength: {
                value: 150,
                message: "描述最多不超過150個字元",
              },
            })}
            error={errors.description?.message}
          />
        </FormGroup>
        <Button className={styles.submitButton} text={"送出"} type="submit" />
      </FormBox>
      <Footer />
    </>
  );
};

export default CreateActivityPage;
