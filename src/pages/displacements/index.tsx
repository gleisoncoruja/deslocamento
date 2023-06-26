import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import PageContainer from "@/components/Container";
import PageContent from "@/components/Content";
import { SearchAndNewContent } from "@/components/Content/SearchAndNewContent";
import { SearchInput } from "@/components/SearchInput";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/utils/debaunce";
import { ButtonLink } from "@/components/Buttons";
import { DisplacementsTable } from "./displacementsTable";
import displacementServices from "@/services/displacementServices";
import {
  IDisplacement,
  IDisplacements,
} from "@/interfaces/displacementInterface";
import { formatData } from "./utils/formatData";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: displacements } = await displacementServices.getDisplacements();
  return {
    props: { displacements },
  };
};

export default function Displacements({ displacements }: IDisplacements) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [formattedData, setFormattedData] = useState<IDisplacement[]>([]);
  const debaunceSearch = useDebounce({ fn: handleSearch, delay: 800 });

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setSearch(value);
  }

  useEffect(() => {
    setFormattedData(formatData({ displacements }));
  }, [displacements]);

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  return (
    <PageContainer title="Deslocamentos">
      <PageContent>
        <SearchAndNewContent>
          <SearchInput
            label="Pesquisar"
            placeholder="ID: Cliente, Condutor ou veículo"
            onChange={debaunceSearch}
          />
          <ButtonLink href={"displacements/new"}>Novo deslocamento</ButtonLink>
        </SearchAndNewContent>
        <DisplacementsTable displacements={formattedData} search={search} />
      </PageContent>
    </PageContainer>
  );
}
