import Image from "next/image";
import { useResource } from "../Resource/ResourceContext";

export default function Logo() {
  const resources = useResource();

  if (!resources?.logo) {
    return null;
  }

  return (
    <div className="w-32 h-32">
      <Image src={resources.logo} alt="Logo" width={100} height={100} />
    </div>
  );
}
