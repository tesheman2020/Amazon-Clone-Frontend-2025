import React from "react";
import LayOut from "../../Components/LayOut/LayOut";
import Category from "../../Components/category/Category";
import Product from "../../Components/Product/Product";
import CarouselEffect from "../../Components/Carousel/Carousel";
function Landing() {
  return (
    <LayOut>
      <CarouselEffect />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing;
