import Image from "next/image";
import ProductList from "../components/ProductList/ProductList"
import Footer from "@/components/Footer/Footer";
import SliderPage from "../components/SliderPage/SliderPage";

export default function Home() {
  return (
   <>
   <SliderPage/>
   <ProductList />
   
   <Footer />
   </>
  );
}
