import Image from "next/image";
import ProductList from "../components/ProductList/ProductList"
import SliderPage from "../components/SliderPage/SliderPage";
import BlogsList from "../components/BlogsList/BlogsList";

export default function Home() {
  return (
   <>
   <SliderPage/>
   <ProductList />
   <BlogsList/>
   
   </>
  );
}
