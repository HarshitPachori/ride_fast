import CustomLoader, { CircularProgressBar } from "@/components/CustomLoader";
import Banner from "../components/HomePage/Banner";
import CardVideoSection from "../components/HomePage/CardVideoSection";
import Footer from "../components/HomePage/Footer";
import NavBar from "../components/HomePage/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <Banner />
      <CircularProgressBar />
      <CardVideoSection />
      <Footer />
    </>
  );
}






