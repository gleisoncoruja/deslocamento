import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { IDrivers } from "@/interfaces/driverInterface";
import PageContainer from "@/components/Container";
import PageContent from "@/components/Content";
import { DriversTable } from "./driversTable";
import DriversServices from "@/services/driversServices";
import { SearchAndNewContent } from "@/components/Content/SearchAndNewContent";
import { SearchInput } from "@/components/SearchInput";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "@/utils/debaunce";
import { ButtonLink } from "@/components/Buttons";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: drivers } = await DriversServices.getDrivers();
  return {
    props: { drivers },
  };
};

export default function Drivers({ drivers }: IDrivers) {
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
    <PageContainer title="Condutores">
      <PageContent>
        <SearchAndNewContent>
          <SearchInput
            label="Pesquisar"
            placeholder="Pesquisar pelo nome"
            onChange={debaunceSearch}
          />
          <ButtonLink href={"drivers/new"}>Novo cadastro</ButtonLink>
        </SearchAndNewContent>
        <DriversTable drivers={drivers} search={search} />
      </PageContent>
    </PageContainer>
  );
}
