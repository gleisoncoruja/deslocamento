import Image from "next/image";
import PageContainer from "@/components/Container";
import secretaria from "@/assets/images/secretaria.jpg";

export default function Home() {
  return (
    <PageContainer>
      <Image src={secretaria} alt="Secretária Naty" layout="responsive" />
    </PageContainer>
  );
}
