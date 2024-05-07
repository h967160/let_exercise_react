import Background from "@/components/Main/Background/Background";
import Main from "@/components/Main/Main";
import Footer from "@/components/Layouts/Footer/Footer";
import Header from "@/components/Layouts/Header/Header";

const HomePage = () => {
  return (
    <>
      <Header />
      <Main>
        <Background />
      </Main>
      <Footer />
    </>
  );
};

export default HomePage;
