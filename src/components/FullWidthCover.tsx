import Image from "material-ui-image";

export default function FullWidthCover({ src }: Props) {
  return <Image src={src} cover={true} aspectRatio={4.3} style={{ width: "100%" }} />;
}

interface Props {
  src: string;
}
