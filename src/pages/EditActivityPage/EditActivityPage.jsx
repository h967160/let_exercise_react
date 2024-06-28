import FormBox from "@/components/Form/FormBox";
import FormGroup from "@/components/Form/FormGroup";
import Input from "@/components/Common/Input";
import Select from "@/components/Common/Select";
import TextArea from "@/components/Common/TextArea";
import { Button } from "@/components/Common/Button/Button";
import styles from "./EditActivityPage.module.scss";
import Header from "@/components/Layouts/Header/Header";
import Footer from "@/components/Layouts/Footer/Footer";
import { useArena } from "@/contexts/ArenaContext";
import { useActivity } from "@/contexts/ActivityContext";
import { useAuth } from "@/contexts/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useShuttlecock } from "@/contexts/ShuttlecockContext";
import { formatEditDate } from "@/utils/format";

const EditActivityPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { id: activityId } = useParams();
  const {
    regions,
    setSelectedRegion,
    arenaSearch,
    setArenaSearch,
    filteredArenas,
    selectArena,
    fetchArena,
    arena,
    selectedArenaId,
  } = useArena();
  const { updateActivity, fetchActivity, activity, levels } = useActivity();
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
      arenaId: activity?.arenaId,
      shuttlecockProvide: activity?.shuttlecockProvide,
      levelId: activity?.levelId,
      shuttlecockId: activity?.shuttlecockId,
      date: activity?.date,
      timeStart: activity?.timeStart,
      timeEnd: activity?.timeEnd,
      fee: activity?.fee,
      numsOfPeople: activity?.numsOfPeople,
      totalPeople: activity?.totalPeople,
      description: activity?.description,
    },
  });
  const navigate = useNavigate();

  // 供球
  const yesNo = [
    { value: 1, name: "是" },
    { value: 0, name: "否" },
  ];

  const handleRegionChange = (event) => {
    const selectedRegionId = parseInt(event.target.value);
    setValue("regionId", selectedRegionId);
    setValue("selectedArenaId", ""); // 在篩選縣市後清空抓取到的場館
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
    if (isShuttlecockProvide === "0") {
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

  useEffect(() => {
    if (activityId) {
      fetchActivity(activityId); // 請確保這個函數從 API 加載活動資料
    }
  }, [activityId, fetchActivity]);

  useEffect(() => {
    // 確保 activity 資料非空才設置表單的預設值
    if (activity) {
      setValue("arenaId", activity.arenaId);
      setValue("shuttlecockProvide", activity.shuttlecockProvide ? 1 : 0);
      setValue("levelId", activity.levelId);
      setValue("shuttlecockId", activity.shuttlecockId);
      setValue("date", formatEditDate(activity.date));
      setValue("timeStart", activity.timeStart);
      setValue("timeEnd", activity.timeEnd);
      setValue("fee", activity.fee);
      setValue("numsOfPeople", activity.numsOfPeople);
      setValue("totalPeople", activity.totalPeople);
      setValue("description", activity.description);

      // 根據 activity 中的 arenaId 加載對應的 arena 資料
      if (activity.arenaId) {
        const loadArena = async () => {
          try {
            const fetchedArena = await fetchArena(activity.arenaId);
            // 確保 fetchedArena 非空才更新表單值
            if (fetchedArena) {
              setValue("arenaId", fetchedArena.arenaId);
              // 如果需要在表單中顯示 arena 的名稱和地址，可以這樣設置
              setValue(
                "selectedArena",
                `${fetchedArena.name} (${fetchedArena.address})`
              );
            }
          } catch (error) {
            console.error("Failed to fetch arena:", error);
            // 處理其他錯誤情況，例如顯示錯誤訊息給用戶
          }
        };

        loadArena();
      }
    }
  }, [activity, setValue, fetchArena]);
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

    const currentUserId = user && user.id;

    // // 確認只有主辦人可以更新活動
    // if (currentUserId !== activity.hostId) {
    //   Swal.fire({
    //     position: "top",
    //     title: "您無權更新此活動！",
    //     timer: 1000,
    //     icon: "error",
    //     showConfirmButton: false,
    //   });
    //   return;
    // }

    formData.hostId = currentUserId; // 使用 currentUserId 作為主辦人 ID
    const response = await updateActivity(activityId, formData);
    if (response && response.status === "Success") {
      Swal.fire({
        position: "top",
        title: "成功更新活動！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      return;
    } else {
      Swal.fire({
        position: "top",
        title: "更新活動失敗！",
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
                        arena?.name ??
                        filteredArenas.find(
                          (arena) => arena.arenaId === parseInt(watchArenaId)
                        )?.name
                      } (${
                        arena?.address ??
                        filteredArenas.find(
                          (arena) => arena.arenaId === parseInt(watchArenaId)
                        )?.address
                      })`,
                    },
                    ...filteredArenas
                      .filter(
                        (arena) => arena.arenaId !== parseInt(watchArenaId)
                      )
                      .map((arena) => ({
                        value: arena.arenaId,
                        name: `${arena.name} (${arena.address})`,
                      })),
                  ]}
                  value={selectedArenaId || undefined} // 使用 undefined 可以讓 Select 變為 uncontrolled component (避免報錯)
                  onChange={handleArenaChange}
                />
              ) : (
                <Select
                  id="arenaId"
                  name="arenaId"
                  item={"請選擇場館"}
                  options={filteredArenas.map((arena) => ({
                    value: arena.arenaId,
                    name: `${arena.name} (${arena.address})`,
                  }))}
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
                value={watch("shuttlecockProvide")}
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
              disabled={isShuttlecockProvide === "0"}
              {...register("shuttlecockId", {
                setValueAs: (value) =>
                  isShuttlecockProvide === "0" ? null : value,
              })}
            />
            <Input
              type="text"
              id="shuttlecockSearch"
              name="shuttlecockSearch"
              placeholder="搜尋型號"
              {...register("shuttlecockSearch")}
              value={shuttlecockSearch}
              onChange={handleShuttlecockSearchChange}
              disabled={isShuttlecockProvide === "0"}
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

export default EditActivityPage;
