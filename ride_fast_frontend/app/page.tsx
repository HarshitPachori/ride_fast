import Banner from "./components/User/HomePage/Banner";
import CardVideoSection from "./components/User/HomePage/CardVideoSection";
import Footer from "./components/User/HomePage/Footer";
import NavBar from "./components/User/HomePage/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <Banner />
      <CardVideoSection />
      <Footer />
    </>
  );
}
