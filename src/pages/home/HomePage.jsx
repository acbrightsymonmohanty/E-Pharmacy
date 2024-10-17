import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";
import Prescription from "../../components/prescription/prescription";
import Support from "../support/Support";
import Description from "../description/Description";
import { Contact } from "lucide-react";
import Whatsapp from "./whatsapp/Whatsapp";
import Add from "./Add";

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <Category />
      <Prescription />
      <Add/>
      <HomePageProductCard />
      <Track />
      <div class="poster lg:p-8">
        <div class="container lg:flex lg:justify-between">
          <img
            src="img/poster.png"
            alt="poster"
            id="poster"
            class="w-full lg:w-auto"
          />
        </div>
      </div>
      <Testimonial />
      <Support />
      <Whatsapp />
      <Description />
    </Layout>
  );
};

export default HomePage;
