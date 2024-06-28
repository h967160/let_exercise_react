import Main from "@/components/Main/Main";
import Footer from "@/components/Layouts/Footer/Footer";
import Header from "@/components/Layouts/Header/Header";
import UserProfileInfo from "@/components/User/UserProfile/UserProfileInfo";
import Tabs from "@/components/User/Tabs/Tabs";

const UserProfilePage = () => {
  return (
    <>
      <Header />
      <Main>
        <div className="container">
          <UserProfileInfo />
          <Tabs />
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default UserProfilePage;
