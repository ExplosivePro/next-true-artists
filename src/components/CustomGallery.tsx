// @ts-ignore
import Gallery from "react-grid-gallery";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Generate suitable image list from image array backend response
const generateImageList = (list: Resource.TattooDetail[]) => {
  const imageList: Resource.Tattoos[] = [];

  list.map((tattoo) => {
    imageList.push({
      src: tattoo.image.image_url,
      thumbnail: tattoo.image.image_url,
      thumbnailWidth: 320,
      thumbnailHeight: 183,
    });
  });

  return imageList;
};

export default function CustomGallery({ className, tattoos }: Props) {
  const router = useRouter();

  const [images, setImages] = useState(generateImageList(tattoos));

  const onClickImage = () => {
    router.push("/tattoos/1");
  };

  useEffect(() => {
    setImages(generateImageList(tattoos));
  }, [tattoos]);

  return (
    <Gallery
      images={images}
      enableImageSelection={false}
      showCloseButton={false}
      onClickThumbnail={onClickImage}
      className={className}
    />
  );
}

interface Props {
  className?: string;
  tattoos: Resource.TattooDetail[];
}
