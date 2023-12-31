import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import customersServices from "@/services/customersServices";
import { ICustomers } from "@/interfaces/customerInterface";

import PageContainer from "@/components/Container";
import PageContent from "@/components/Content";
import { CustomersTable } from "./customersTable";
import { SearchAndNewContent } from "@/components/Content/SearchAndNewContent";
import { useState, ChangeEvent } from "react";
import { useDebounce } from "@/utils/debaunce";
import { SearchInput } from "@/components/SearchInput";
import { ButtonLink } from "@/components/Buttons";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: customers } = await customersServices.getCustomers();
  return {
    props: { customers },
  };
};

export default function Customers({ customers }: ICustomers) {
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
    <PageContainer title="Clientes">
      <PageContent>
        <SearchAndNewContent>
          <SearchInput
            label="Pesquisar"
            placeholder="Pesquisar pelo nome"
            onChange={debaunceSearch}
          />
          <ButtonLink href={"customers/new"}>Novo cadastro</ButtonLink>
        </SearchAndNewContent>

        <CustomersTable customers={customers} search={search} />
      </PageContent>
    </PageContainer>
  );
}
