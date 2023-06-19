import PageContainer from "@/components/Container";
import { ICustomer } from "@/interfaces/customerInterface";
import customersServices from "@/services/customersServices";
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
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<ICustomer>();
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const onSubmit = async (data: ICustomer) => {
    try {
      setLoading(true);
      data.id = customer.id;
      await customersServices.updateCustomer({
        id: customer.id,
        data,
      });
      toast.success("Alterações salvas com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar alterações");
    } finally {
      setLoading(false);
    }
  };

  const deleteCostumer = async () => {
    try {
      setLoading(true);
      await customersServices.deleteCustomer({
        id: customer.id,
      });
      toast.success("Cadastro excluído com sucesso!");
      setOpenConfirm(false);
      router.push("/customers");
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
    deleteCostumer();
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
            defaultValue={customer.nome}
            {...register("nome")}
          />
          <FieldContent>
            <TextField
              required
              label="Nº do documento"
              placeholder="Ex.: 123.456.789-10"
              fullWidth
              defaultValue={customer.numeroDocumento}
              {...register("numeroDocumento")}
            />

            <TextField
              required
              label="Tipo do documento"
              placeholder="Ex.: CPF"
              fullWidth
              defaultValue={customer.tipoDocumento}
            />
          </FieldContent>
          <FieldContent>
            <TextField
              required
              label="Logradouro"
              placeholder="Digite o logradouro"
              fullWidth
              defaultValue={customer.logradouro}
            />
            <TextField
              required
              label="Número"
              placeholder="Ex.: 123"
              fullWidth
              defaultValue={customer.numero}
            />
          </FieldContent>
          <FieldContent>
            <TextField
              required
              label="Bairro"
              placeholder="Ex.: Pilar"
              fullWidth
              defaultValue={customer.bairro}
            />
            <TextField
              required
              label="Cidade"
              placeholder="Ex.: Duque de Caxias"
              fullWidth
              defaultValue={customer.cidade}
            />
            <TextField
              required
              label="UF"
              placeholder="Ex.: UF"
              fullWidth
              defaultValue={customer.uf}
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
            <LoadingButton loading={loading} type="button" variant="contained">
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
