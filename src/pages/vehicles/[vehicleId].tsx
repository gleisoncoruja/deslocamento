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
import { AxiosError } from "axios";
import vehiclesServices from "@/services/vehiclesServices";
import { IVehicle } from "@/interfaces/vehiclesInterface";
interface IVehicleProps {
  vehicle: IVehicle;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.vehicleId;
  const { data: vehicle } = await vehiclesServices.getVehicle({
    id,
  });
  return {
    props: { vehicle },
  };
};

export default function Vehicle({ vehicle }: IVehicleProps) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<IVehicle>();
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const onSubmit = async (data: IVehicle) => {
    try {
      setLoading(true);
      data.id = vehicle.id;
      await vehiclesServices.updateVehicle({
        id: vehicle.id,
        data,
      });
      toast.success("Alterações salvas com sucesso!");
    } catch (error: AxiosError | any) {
      toast.error(`Erro ao salvar alterações:  ${error.response?.data}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async () => {
    try {
      setLoading(true);
      await vehiclesServices.deleteVehicle({
        id: vehicle.id,
      });
      toast.success("Cadastro excluído com sucesso!");
      setOpenConfirm(false);
      router.push("/vehicles");
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
    deleteVehicle();
  };

  return (
    <PageContainer title={`Detalhes do cadastro`} backButton={true}>
      <FormContent>
        <FormTitle variant="h5">Edite ou exclua o cadastro</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FieldContent>
            <TextField
              required
              label="Placa"
              placeholder="Ex.: LUT3S88"
              fullWidth
              disabled
              defaultValue={vehicle.placa}
              {...register("placa")}
            />
            <TextField
              required
              label="Marca / Modelo"
              placeholder="Ex.: Sentra 2013"
              fullWidth
              defaultValue={vehicle.marcaModelo}
              {...register("marcaModelo")}
            />
          </FieldContent>
          <FieldContent>
            <TextField
              required
              label="Ano de fabricação"
              placeholder="Ex.: 2013"
              type="number"
              fullWidth
              defaultValue={vehicle.anoFabricacao}
              {...register("anoFabricacao")}
            />
            <TextField
              required
              label="KM atual"
              placeholder="Ex.: 7500"
              type="number"
              fullWidth
              defaultValue={vehicle.kmAtual}
              {...register("kmAtual")}
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
