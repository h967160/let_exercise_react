import Main from "@/components/Main/Main";
import Footer from "@/components/Layouts/Footer/Footer";
import Header from "@/components/Layouts/Header/Header";
import Activity from "@/components/Activity/Activity";
import Pagination from "@/components/Common/Pagination/Pagination";
import { useActivity } from "@/contexts/ActivityContext";
import Search from "@/components/Common/Search/Search";
import styles from "./ActivityPage.module.scss";

const ActivityPage = () => {
  const { pagination, goToPage, currentPage, setCurrentPage } = useActivity();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    goToPage(page); // 切換分頁
  };

  return (
    <>
      <Header />
      <Search className={styles.activitySearch} />
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
