// External import
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

// TODO: load all studio image
const list = [1, 2, 3];

export default function ImageCarousels() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    slidesToShow: 1,
    dotsClass: "custom-slick-dots dot-right",
  };

  return (
    <Slider {...settings}>
      {list.map((item, index) => {
        return <Image src="/images/studio-profile-image.png" alt="fb" width={446} height={500} key={index} />;
      })}
    </Slider>
  );
}
