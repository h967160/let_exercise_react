import Main from "@/components/Main/Main";
import Footer from "@/components/Layouts/Footer/Footer";
import Header from "@/components/Layouts/Header/Header";
import UserProfileInfo from "@/components/User/UserProfile/UserProfileInfo";
import Tabs from "@/components/User/Tabs/Tabs";
import TabContent from "@/components/User/Tabs/TabContent";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";

const UserProfilePage = () => {
  const { user: getTokenUser } = useAuth();
  const { fetchUserData } = useUser();
  const [activeTab, setActiveTab] = useState("followers");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (getTokenUser) {
        await fetchUserData(getTokenUser.id);
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
          <Tabs activeTab={activeTab} handleTabChange={handleTabChange} />
          <TabContent activeTab={activeTab} />
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default UserProfilePage;
