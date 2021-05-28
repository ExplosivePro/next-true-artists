import { useRouter } from "next/router";

import UploadTattoos from "../../../components/Dashboard/UploadTattoos";

export default function EditTattoo() {
  const { query } = useRouter();

  return <UploadTattoos id={parseInt(query.id as string)} />;
}
