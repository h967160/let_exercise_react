import Main from "@/components/Main/Main";
import Footer from "@/components/Layouts/Footer/Footer";
import Header from "@/components/Layouts/Header/Header";
import ActivityInfo from "@/components/Activity/ActivityInfo";
import ArenaInfo from "@/components/Arena/ArenaInfo";
import styles from "./ActivityInfo.module.scss";
import UserInfo from "@/components/User/UserInfo";

const ActivityInfoPage = () => {
  return (
    <>
      <Header />
      <Main>
        <div className={`container ${styles.container}`}>
          <ActivityInfo />
          <ArenaInfo />
          <UserInfo />
        </div>
      </Main>
      <Footer />;
    </>
  );
};

export default ActivityInfoPage;
