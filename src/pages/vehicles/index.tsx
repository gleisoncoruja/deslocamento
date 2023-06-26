import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import PageContainer from "@/components/Container";
import PageContent from "@/components/Content";
import DriversServices from "@/services/driversServices";
import { SearchAndNewContent } from "@/components/Content/SearchAndNewContent";
import { SearchInput } from "@/components/SearchInput";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "@/utils/debaunce";
import { ButtonLink } from "@/components/Buttons";
import { IVehicles } from "@/interfaces/vehiclesInterface";
import { VehiclesTable } from "./vehiclesTable";
import vehiclesServices from "@/services/vehiclesServices";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: vehicles } = await vehiclesServices.getVehicles();
  return {
    props: { vehicles },
  };
};

export default function Vehicles({ vehicles }: IVehicles) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const debaunceSearch = useDebounce({ fn: handleSearch, delay: 800 });

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setSearch(value);
  }

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <PageContainer title="Veículos">
      <PageContent>
        <SearchAndNewContent>
          <SearchInput
            label="Pesquisar"
            placeholder="Placa,marca ou ano"
            onChange={debaunceSearch}
          />
          <ButtonLink href={"vehicles/new"}>Novo cadastro</ButtonLink>
        </SearchAndNewContent>
        <VehiclesTable vehicles={vehicles} search={search} />
      </PageContent>
    </PageContainer>
  );
}
