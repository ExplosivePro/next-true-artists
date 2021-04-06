// External import
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

import { defaultStudioPortfolioImage } from "../../constants";

export default function ImageCarousels({ data }: Props) {
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
    <>
      {data.length === 0 && <Image src={defaultStudioPortfolioImage} alt="fb" width={446} height={500} />}
      <Slider {...settings}>
        {data.map((item, index) => {
          return <Image src="/images/studio-profile-image.png" alt="fb" width={446} height={500} key={index} />;
        })}
      </Slider>
    </>
  );
}

interface Props {
  data: Resource.Image[];
}
