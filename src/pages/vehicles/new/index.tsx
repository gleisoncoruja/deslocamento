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
import vehiclesServices from "@/services/vehiclesServices";
import { IVehicle } from "@/interfaces/vehiclesInterface";

export default function NewVehicle() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<IVehicle>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IVehicle) => {
    try {
      setLoading(true);
      const { data: id } = await vehiclesServices.createVehicle({
        data,
      });
      toast.success("Cadastro criado com sucesso!");
      router.push(`/vehicles/${id}`);
    } catch (error) {
      toast.error("Erro ao criar cadastro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title={`Novo cadastro`} backButton={true}>
      <FormContent>
        <FormTitle variant="h5">Cadastre um novo veículo</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FieldContent>
            <TextField
              required
              label="Placa"
              placeholder="Ex.: LUT3S88"
              fullWidth
              {...register("placa")}
            />
            <TextField
              required
              label="Marca / Modelo"
              placeholder="Ex.: Sentra 2013"
              fullWidth
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
              {...register("anoFabricacao")}
            />
            <TextField
              required
              label="KM atual"
              placeholder="Ex.: 7500"
              type="number"
              fullWidth
              {...register("kmAtual")}
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
