import Image from "material-ui-image";

export default function FullWidthCover() {
  return <Image src="/images/fullwidth-cover.png" cover={true} aspectRatio={4.3} style={{ width: "100%" }} />;
}
