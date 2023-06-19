import PageContainer from "@/components/Container";
import PageContent from "@/components/Content";
import { ICustomer } from "@/interfaces/customerInterface";
import customersServices from "@/services/customersServices";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";

import { Paper } from "@mui/material";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
interface ICustomerProps {
  customer: ICustomer;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.customerId;
  const { data: customer } = await customersServices.getCustomer({
    id,
  });
  return {
    props: { customer },
  };
};

export default function Customer({ customer }: ICustomerProps) {
  const { register, handleSubmit, reset } = useForm<ICustomer>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ICustomer) => {
    try {
      setLoading(true);
      data.id = customer.id;
      const { data: response } = await customersServices.updateCustomer({
        id: customer.id,
        data,
      });
      toast.success("Alterações salvas com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar alterações");
    } finally {
      setLoading(false);
    }

    // Faça algo com os dados do formulário, como enviá-los para o servidor
  };

  return (
    <PageContainer title={`Detalhes do cadastro`}>
      <Container component={Paper} style={{ padding: "1rem" }}>
        <p>Edite ou exclua o cadastro</p>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            required
            id="outlined-required"
            label="Nome"
            defaultValue={customer.nome}
            {...register("nome")}
          />
          <TextField
            required
            id="outlined-required"
            label="Nº do documento"
            defaultValue={customer.numeroDocumento}
            {...register("numeroDocumento")}
          />
          <TextField
            required
            id="outlined-required"
            label="Tipo do documento"
            defaultValue={customer.tipoDocumento}
          />
          <TextField
            required
            id="outlined-required"
            label="Tipo do documento"
            defaultValue={customer.logradouro}
          />
          <TextField
            required
            id="outlined-required"
            label="Número"
            defaultValue={customer.numero}
          />
          <TextField
            required
            id="outlined-required"
            label="Bairro"
            defaultValue={customer.bairro}
          />
          <TextField
            required
            id="outlined-required"
            label="Cidade"
            defaultValue={customer.cidade}
          />
          <TextField
            required
            id="outlined-required"
            label="UF"
            defaultValue={customer.uf}
          />
          <LoadingButton loading={loading} type="submit" variant="contained">
            Salvar
          </LoadingButton>
          <button type="button">Excluir</button>
        </form>
      </Container>
    </PageContainer>
  );
}
