import React from "react";
import Header from "../Header/Header";
import CarouselEffect from "../Carousel/Carousel";

function LayOut({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default LayOut;
