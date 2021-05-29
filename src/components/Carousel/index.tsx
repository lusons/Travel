import React from "react";
import { Carousel as AntdCarousel } from "antd";
import carousel1 from "../../assets/images/carousel_1.jpg";
import carousel2 from "../../assets/images/carousel_2.jpg";
import carousel3 from "../../assets/images/carousel_3.jpg";

const contentStyle: React.CSSProperties = {
  height: "242.08px",
  color: "#fff",
  lineHeight: "242.08px",
  textAlign: "center",
  background: "#364d79",
  overflow: "hidden",
};

const Carousel: React.FC = () => {
  return (
    <div>
      <AntdCarousel autoplay style={contentStyle}>
        <img src={carousel1} alt="" />
        <img src={carousel2} alt="" />
        <img src={carousel3} alt="" />
      </AntdCarousel>
    </div>
  );
};

export default Carousel;
