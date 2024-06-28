import Main from "@/components/Main/Main";
import Footer from "@/components/Layouts/Footer/Footer";
import Header from "@/components/Layouts/Header/Header";
import UserProfileInfo from "@/components/User/UserProfile/UserProfileInfo";
import Tabs from "@/components/User/Tabs/Tabs";
import TabContent from "@/components/User/Tabs/TabContent";

const UserProfilePage = () => {
  return (
    <>
      <Header />
      <Main>
        <div className="container">
          <UserProfileInfo />
          <Tabs />
          <TabContent />
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default UserProfilePage;
