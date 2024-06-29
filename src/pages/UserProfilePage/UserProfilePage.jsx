import Main from "@/components/Main/Main";
import Footer from "@/components/Layouts/Footer/Footer";
import Header from "@/components/Layouts/Header/Header";
import UserProfileInfo from "@/components/User/UserProfile/UserProfileInfo";
import Tabs from "@/components/User/Tabs/Tabs";
import TabContent from "@/components/User/Tabs/TabContent";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";

const UserProfilePage = () => {
  const { user: getTokenUser } = useAuth();
  const { fetchUserData } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (getTokenUser) {
        const userData = await fetchUserData(getTokenUser.id);
        console.log("userData: ", userData);
      }
    };

    fetchData();
  }, [getTokenUser, fetchUserData]);

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
