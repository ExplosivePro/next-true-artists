// @ts-ignore
import Gallery from "react-grid-gallery";
import React from "react";
import { useRouter } from "next/router";

const images = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
  },
  {
    src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 183,
  },
  {
    src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
    thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
    thumbnailWidth: 271,
    thumbnailHeight: 320,
  },
  {
    src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
    thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
    thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
    thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
  {
    src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
    thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
    thumbnailWidth: 257,
    thumbnailHeight: 320,
  },
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 174,
  },
  {
    src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
    thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 183,
  },
  {
    src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
    thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
    thumbnailWidth: 271,
    thumbnailHeight: 320,
  },
  {
    src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
    thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
    thumbnailWidth: 320,
    thumbnailHeight: 213,
  },
];

export default function CustomGallery() {
  const router = useRouter();

  const onClickImage = () => {
    router.push("/tattoos/1");
  };

  return (
    <Gallery images={images} enableImageSelection={false} showCloseButton={false} onClickThumbnail={onClickImage} />
  );
}
