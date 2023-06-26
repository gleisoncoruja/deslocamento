import PageContainer from "@/components/Container";
import { GetServerSideProps } from "next";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import { AxiosError } from "axios";
import { IDisplacement } from "@/interfaces/displacementInterface";
import displacementServices from "@/services/displacementServices";
import vehiclesServices from "@/services/vehiclesServices";
import customersServices from "@/services/customersServices";
import { IVehicle } from "@/interfaces/vehiclesInterface";
import { IDriver } from "@/interfaces/driverInterface";
import { ICustomer } from "@/interfaces/customerInterface";
import driversServices from "@/services/driversServices";
interface IDisplacementProps {
  displacement: IDisplacement;
  vehicle: IVehicle;
  driver: IDriver;
  customer: ICustomer;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.displacementId;
  const { data: displacement } = await displacementServices.getDisplacement({
    id,
  });
  const { data: vehicle } = await vehiclesServices.getVehicle({
    id: displacement.idVeiculo,
  });
  const { data: driver } = await driversServices.getDriver({
    id: displacement.idCondutor,
  });
  const { data: customer } = await customersServices.getCustomer({
    id: displacement.idCliente,
  });
  return {
    props: { displacement, vehicle, driver, customer },
  };
};

export default function Displacement({
  displacement,
  vehicle,
  driver,
  customer,
}: IDisplacementProps) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<IDisplacement>();
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [displacementStart, setDisplacementStart] = useState<
    string | undefined
  >("");
  const [displacementEnd, setDisplacementEnd] = useState<string | undefined>(
    ""
  );

  useEffect(() => {
    const endDateTime = displacement.fimDeslocamento
      ? new Date(displacement.fimDeslocamento).toLocaleString()
      : "Em deslocamento";
    setDisplacementStart(
      new Date(displacement.inicioDeslocamento).toLocaleString()
    );
    setDisplacementEnd(endDateTime);
  }, [displacement]);

  const onSubmit = async (data: IDisplacement) => {
    try {
      setLoading(true);
      data.id = displacement.id;
      await displacementServices.endDisplacement({
        id: displacement.id,
        data: {
          id: data.id,
          kmFinal: data.kmFinal,
          fimDeslocamento: new Date().toISOString(),
          observacao: data.observacao,
        },
      });
      toast.success("Alterações salvas com sucesso!");
      router.reload();
    } catch (error: AxiosError | any) {
      toast.error(`Erro ao salvar alterações:  ${error.response?.data}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteDisplacement = async () => {
    try {
      setLoading(true);
      await displacementServices.deleteDisplacement({
        id: displacement.id,
      });
      toast.success("Cadastro excluído com sucesso!");
      setOpenConfirm(false);
      router.push("/displacements");
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
    deleteDisplacement();
  };

  return (
    <PageContainer title={`Detalhes do deslocamento`} backButton={true}>
      <FormContent>
        <FormTitle variant="h5">Finalizar ou excluir deslocamento</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FieldContent>
            <TextField
              required
              label="Condutor"
              fullWidth
              disabled
              defaultValue={driver.nome}
            />
            <TextField
              label="Cliente"
              disabled
              fullWidth
              defaultValue={customer.nome}
            />
          </FieldContent>
          <FieldContent>
            <TextField
              required
              label="Início"
              fullWidth
              disabled
              value={displacementStart}
            />
            <TextField label="Fim" disabled fullWidth value={displacementEnd} />
          </FieldContent>
          <FieldContent>
            <TextField
              label="Veículo (Placa - Modelo)"
              fullWidth
              disabled
              value={`${vehicle.placa} - ${vehicle.marcaModelo}`}
            />
            <TextField
              required
              label="KM Inicial"
              fullWidth
              disabled
              value={displacement.kmInicial}
            />
            <TextField
              label="KM Final"
              disabled={!!displacement.fimDeslocamento}
              required
              fullWidth
              defaultValue={displacement.kmFinal}
              {...register("kmFinal")}
            />
          </FieldContent>
          <FieldContent>
            <TextField
              label="Motivo"
              fullWidth
              disabled
              value={displacement.motivo}
            />
          </FieldContent>
          <FieldContent>
            <TextField
              multiline
              rows={3}
              label="Checklist"
              fullWidth
              disabled
              defaultValue={displacement.checkList}
            />
          </FieldContent>
          <FieldContent>
            <TextField
              multiline
              rows={3}
              label="Observação"
              fullWidth
              disabled={!!displacement.fimDeslocamento}
              defaultValue={displacement.observacao}
              {...register("observacao")}
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
            <LoadingButton
              loading={loading}
              disabled={!!displacement.fimDeslocamento}
              type="submit"
              variant="contained"
            >
              Finalizar
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
