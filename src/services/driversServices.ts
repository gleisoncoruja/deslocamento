import { IDriver } from "@/interfaces/driverInterface";
import { api } from "@/utils/api";
interface IUpdateDriverProps {
  id: number | string | string[] | undefined;
  data: IDriver;
}

interface IDeleteDriverProps {
  id: number | string | string[] | undefined;
}

interface ICreateDriverProps {
  data: IDriver;
}

const getDrivers = async () => {
  const url = "/condutor";
  return await api.get(url);
};

const getDriver = async ({ id }: { id: string | string[] | undefined }) => {
  const url = `/condutor/${id}`;
  return await api.get(url);
};

const updateDriver = async ({ id, data }: IUpdateDriverProps) => {
  const url = `/condutor/${id}`;
  return await api.put(url, data);
};

const deleteDriver = async ({ id }: IDeleteDriverProps) => {
  const url = `/condutor/${id}`;
  const data = {
    id: id,
  };
  return await api.delete(url, {
    data,
  });
};

const createDriver = async ({ data }: ICreateDriverProps) => {
  const url = `/condutor/`;
  return await api.post(url, data);
};

const driversServices = {
  getDrivers,
  getDriver,
  updateDriver,
  deleteDriver,
  createDriver,
};
export default driversServices;
