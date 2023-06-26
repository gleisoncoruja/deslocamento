import { IVehicle } from "@/interfaces/vehiclesInterface";
import { api } from "@/utils/api";
interface IUpdateVehicleProps {
  id: number | string | string[] | undefined;
  data: IVehicle;
}

interface IDeleteVehicleProps {
  id: number | string | string[] | undefined;
}

interface ICreateVehicleProps {
  data: IVehicle;
}

const getVehicles = async () => {
  const url = "/veiculo";
  return await api.get(url);
};

const getVehicle = async ({ id }: { id: string | string[] | undefined }) => {
  const url = `/veiculo/${id}`;
  return await api.get(url);
};

const updateVehicle = async ({ id, data }: IUpdateVehicleProps) => {
  const url = `/veiculo/${id}`;
  return await api.put(url, data);
};

const deleteVehicle = async ({ id }: IDeleteVehicleProps) => {
  const url = `/veiculo/${id}`;
  const data = {
    id: id,
  };
  return await api.delete(url, {
    data,
  });
};

const createVehicle = async ({ data }: ICreateVehicleProps) => {
  const url = `/veiculo/`;
  return await api.post(url, data);
};

const vehiclesServices = {
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
  createVehicle,
};
export default vehiclesServices;
