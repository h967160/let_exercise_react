import Main from "@/components/Main/Main";
import Footer from "@/components/Layouts/Footer/Footer";
import Header from "@/components/Layouts/Header/Header";
import Activity from "@/components/Activity/Activity";
import Pagination from "@/components/Common/Pagination/Pagination";
import { useActivity } from "@/contexts/ActivityContext";
import Search from "@/components/Common/Search/Search";
import styles from "./ActivityPage.module.scss";
import Swal from "sweetalert2";

const ActivityPage = () => {
  const {
    pagination,
    goToPage,
    currentPage,
    setCurrentPage,
    updateSearchParams,
  } = useActivity();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    goToPage(page); // 切換分頁
  };

  const handleSearch = ({ regionId, level, date }) => {
    if (!regionId) {
      Swal.fire({
        position: "top",
        title: "請選擇地區",
        timer: 1500,
        icon: "error",
        showConfirmButton: false,
      });
    } else {
      updateSearchParams({ regionId, level, date });
    }
  };

  return (
    <>
      <Header />
      <Search className={styles.activitySearch} onSearch={handleSearch} />
      <Main>
        <Activity />
      </Main>
      <Pagination
        currentPage={currentPage}
        totalPage={pagination.totalPage}
        onChange={handlePageChange}
      />
      <Footer />;
    </>
  );
};

export default ActivityPage;
