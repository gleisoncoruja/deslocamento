import PageContainer from "@/components/Container";
import { ICustomer } from "@/interfaces/customerInterface";
import customersServices from "@/services/customersServices";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  FieldContent,
  Form,
  FormActionContent,
  FormContent,
  FormTitle,
} from "@/Form";

export default function Customer() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<ICustomer>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ICustomer) => {
    try {
      setLoading(true);
      const { data: id } = await customersServices.createCustomer({
        data,
      });
      toast.success("Cadastro criado com sucesso!");
      router.push(`/customers/${id}`);
    } catch (error) {
      toast.error("Erro ao criar cadastro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title={`Novo cadastro`} backButton={true}>
      <FormContent>
        <FormTitle variant="h5">Cadastre um novo usuário</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            label="Nome"
            placeholder="Digite seu nome"
            fullWidth
            {...register("nome")}
          />
          <FieldContent>
            <TextField
              required
              label="Nº do documento"
              placeholder="Ex.: 123.456.789-10"
              fullWidth
              {...register("numeroDocumento")}
            />

            <TextField
              required
              label="Tipo do documento"
              placeholder="Ex.: CPF"
              fullWidth
              {...register("tipoDocumento")}
            />
          </FieldContent>
          <FieldContent>
            <TextField
              required
              label="Logradouro"
              placeholder="Digite o logradouro"
              fullWidth
              {...register("logradouro")}
            />
            <TextField
              required
              label="Número"
              placeholder="Ex.: 123"
              fullWidth
              {...register("numero")}
            />
          </FieldContent>
          <FieldContent>
            <TextField
              required
              label="Bairro"
              placeholder="Ex.: Pilar"
              fullWidth
              {...register("bairro")}
            />
            <TextField
              required
              label="Cidade"
              placeholder="Ex.: Duque de Caxias"
              fullWidth
              {...register("cidade")}
            />
            <TextField
              required
              label="UF"
              placeholder="Ex.: UF"
              fullWidth
              {...register("uf")}
            />
          </FieldContent>
          <FormActionContent>
            <LoadingButton
              loading={loading}
              type="reset"
              variant="contained"
              color="error"
            >
              Limpar
            </LoadingButton>
            <LoadingButton loading={loading} type="submit" variant="contained">
              Salvar
            </LoadingButton>
          </FormActionContent>
        </Form>
      </FormContent>
    </PageContainer>
  );
}
