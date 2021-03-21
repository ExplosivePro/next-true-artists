// @ts-ignore
import Gallery from "react-grid-gallery";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Generate suitable image list from image array backend response
const generateImageList = (list: Resource.TattooDetail[]) => {
  const imageList: Resource.Tattoos[] = [];

  list.map((tattoo) => {
    if (tattoo.image) {
      imageList.push({
        id: tattoo.id,
        src: tattoo.image.image_url,
        thumbnail: tattoo.image.image_url,
        alt: tattoo.image.name,
      });
    }
  });

  return imageList;
};

export default function CustomGallery({ className, tattoos }: Props) {
  const router = useRouter();

  const [images, setImages] = useState(generateImageList(tattoos));

  const onClickImage = (index: number) => {
    router.push(`/tattoos/${images[index].id}`);
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
