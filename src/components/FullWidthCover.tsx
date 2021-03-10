import Image from "material-ui-image";

import { defaultStudioBanner } from "../constants";

export default function FullWidthCover({ src }: Props) {
  return <Image src={src ? src : defaultStudioBanner} cover={true} aspectRatio={4.3} style={{ width: "100%" }} />;
}

interface Props {
  src: string;
}
