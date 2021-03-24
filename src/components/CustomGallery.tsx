import Gallery, { PhotoProps } from "react-photo-gallery";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";

// Generate suitable image list from image array backend response
const generateImageList = (list: Resource.TattooDetail[]) => {
  const imageList: PhotoProps[] = [];

  list.map((tattoo) => {
    if (tattoo.image) {
      imageList.push({
        src: tattoo.image.image_url,
        alt: tattoo.image.name,
        width: 1,
        height: 1,
        key: tattoo.id.toString(),
      });
    }
  });

  return imageList;
};

export default function CustomGallery({ tattoos }: Props) {
  const router = useRouter();

  const [images, setImages] = useState(generateImageList(tattoos));

  const onClickImage = useCallback((event: any, { photo }) => {
    router.push(`/tattoos/${photo.key}`);
  }, []);

  useEffect(() => {
    setImages(generateImageList(tattoos));
  }, [tattoos]);

  return <Gallery photos={images} onClick={onClickImage} margin={12} />;
}

interface Props {
  className?: string;
  tattoos: Resource.TattooDetail[];
}
