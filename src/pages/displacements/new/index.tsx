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
import { IDisplacement } from "@/interfaces/displacementInterface";
import displacementServices from "@/services/displacementServices";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { GetServerSideProps } from "next";
import vehiclesServices from "@/services/vehiclesServices";
import driversServices from "@/services/driversServices";
import customersServices from "@/services/customersServices";
import { IVehicle } from "@/interfaces/vehiclesInterface";
import { IDriver } from "@/interfaces/driverInterface";
import { ICustomer } from "@/interfaces/customerInterface";

interface INewDisplacementProps {
  vehicles: [IVehicle];
  drivers: [IDriver];
  customers: [ICustomer];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: vehicles } = await vehiclesServices.getVehicles();
  const { data: drivers } = await driversServices.getDrivers();
  const { data: customers } = await customersServices.getCustomers();
  return {
    props: { vehicles, drivers, customers },
  };
};

export default function NewDisplacement({
  vehicles,
  drivers,
  customers,
}: INewDisplacementProps) {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<IDisplacement>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IDisplacement) => {
    try {
      setLoading(true);
      const { data: id } = await displacementServices.startDisplacement({
        data: {
          idCondutor: data.idCondutor,
          inicioDeslocamento: new Date().toISOString(),
          idVeiculo: data.idVeiculo,
          kmInicial: data.kmInicial,
          checkList: data.checkList,
          idCliente: data.idCliente,
          motivo: data.motivo,
        },
      });
      toast.success("Deslocamento iniciado com sucesso!");
      router.push(`/displacements/${id}`);
    } catch (error) {
      toast.error("Erro ao criar deslocamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title={`Novo deslocamento`} backButton={true}>
      <FormContent>
        <FormTitle variant="h5">Inicie um novo deslocamento</FormTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FieldContent>
            <FormControl fullWidth required>
              <InputLabel id="input-driver">Condutor</InputLabel>
              <Select
                labelId="input-driver"
                label="Condutor"
                required
                {...register("idCondutor")}
              >
                {drivers?.map((driver) => (
                  <MenuItem key={driver.id} value={driver.id}>
                    {driver.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel id="input-customer">Cliente</InputLabel>
              <Select
                labelId="input-customer"
                label="Cliente"
                required
                {...register("idCliente")}
              >
                {customers?.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FieldContent>
          <FieldContent>
            <FormControl fullWidth required>
              <InputLabel id="input-vehicle">Veículo</InputLabel>
              <Select
                labelId="input-vehicle"
                label="Veículo"
                required
                {...register("idVeiculo")}
              >
                {vehicles?.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.placa} - {vehicle.marcaModelo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="KM inicial"
              required
              fullWidth
              {...register("kmInicial")}
            />
          </FieldContent>
          <FieldContent>
            <TextField label="Motivo" fullWidth {...register("motivo")} />
          </FieldContent>
          <FieldContent>
            <TextField
              multiline
              rows={3}
              label="Checklist"
              fullWidth
              {...register("checkList")}
            />
          </FieldContent>
          <FieldContent>
            <TextField
              multiline
              rows={3}
              label="Observação"
              fullWidth
              {...register("observacao")}
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
