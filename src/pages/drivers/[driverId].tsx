import PageContainer from "@/components/Container";

import { GetServerSideProps } from "next";
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
import { ConfirmDialog } from "@/components/Dialogs/ConfirmDialog";
import driversServices from "@/services/driversServices";
import { IDriver } from "@/interfaces/driverInterface";
import { AxiosError } from "axios";
interface IDriverProps {
  driver: IDriver;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.driverId;
  const { data: driver } = await driversServices.getDriver({
    id,
  });
  return {
    props: { driver },
  };
};

export default function Customer({ driver }: IDriverProps) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<IDriver>();
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const onSubmit = async (data: IDriver) => {
    try {
      setLoading(true);
      data.id = driver.id;
      await driversServices.updateDriver({
        id: driver.id,
        data,
      });
      toast.success("Alterações salvas com sucesso!");
    } catch (error: AxiosError | any) {
      toast.error(`Erro ao salvar alterações:  ${error.response?.data}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteDriver = async () => {
    try {
      setLoading(true);
      await driversServices.deleteDriver({
        id: driver.id,
      });
      toast.success("Cadastro excluído com sucesso!");
      setOpenConfirm(false);
      router.push("/drivers");
    } catch (error) {
      toast.error("Erro ao excluir cadastro");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setOpenConfirm(true);
  };

  const handleCancel = () => {
    setOpenConfirm(false);
  };

  const handleConfirm = () => {
    deleteDriver();
  };

  return (
    <PageContainer title={`Detalhes do cadastro`} backButton={true}>
      <FormContent>
        <FormTitle variant="h5">Edite ou exclua o cadastro</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            label="Nome"
            placeholder="Digite seu nome"
            fullWidth
            disabled
            defaultValue={driver.nome}
            {...register("nome")}
          />
          <FieldContent>
            <TextField
              required
              label="Nº da habilitação"
              placeholder="Ex.: 123345677"
              fullWidth
              disabled
              defaultValue={driver.numeroHabilitacao}
              {...register("numeroHabilitacao")}
            />

            <TextField
              required
              label="Categoria da habilitação"
              placeholder="Ex.: B"
              fullWidth
              disabled
              defaultValue={driver.catergoriaHabilitacao}
              {...register("catergoriaHabilitacao")}
            />
            <TextField
              required
              type="date"
              label="Vencimento da habilitação"
              placeholder="Ex.: 23/08/2024"
              fullWidth
              defaultValue={
                driver.vencimentoHabilitacao &&
                new Date(driver.vencimentoHabilitacao)
                  .toISOString()
                  .split("T")[0]
              }
              {...register("vencimentoHabilitacao")}
            />
          </FieldContent>

          <FormActionContent>
            <LoadingButton
              loading={loading}
              type="button"
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Excluir
            </LoadingButton>
            <LoadingButton loading={loading} type="submit" variant="contained">
              Salvar
            </LoadingButton>
          </FormActionContent>
        </Form>
      </FormContent>
      <ConfirmDialog
        open={openConfirm}
        title="Deseja excluir este cadastro?"
        text="Está ação não pode ser desfeita, uma vez excluído o cadastro, não será mais possível recupera-lo"
        cancelAction={handleCancel}
        confirmAction={handleConfirm}
        onClose={handleCancel}
      />
    </PageContainer>
  );
}
