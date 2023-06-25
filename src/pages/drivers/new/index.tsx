import PageContainer from "@/components/Container";
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
import { IDriver } from "@/interfaces/driverInterface";
import driversServices from "@/services/driversServices";

export default function Driver() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<IDriver>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IDriver) => {
    try {
      setLoading(true);
      const { data: id } = await driversServices.createDriver({
        data,
      });
      toast.success("Cadastro criado com sucesso!");
      router.push(`/drivers/${id}`);
    } catch (error) {
      toast.error("Erro ao criar cadastro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title={`Novo cadastro`} backButton={true}>
      <FormContent>
        <FormTitle variant="h5">Cadastre um novo condutor</FormTitle>
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
              label="Nº da habilitação"
              placeholder="Ex.: 123345677"
              fullWidth
              {...register("numeroHabilitacao")}
            />

            <TextField
              required
              label="Categoria da habilitação"
              placeholder="Ex.: B"
              fullWidth
              {...register("categoriaHabilitacao")}
            />
            <TextField
              required
              type="date"
              label="Vencimento da habilitação"
              placeholder="Ex.: 23/08/2024"
              defaultValue={new Date().toISOString().split("T")[0]}
              fullWidth
              {...register("vencimentoHabilitacao")}
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
