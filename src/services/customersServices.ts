import { ICustomer } from "@/interfaces/customerInterface";
import { api } from "@/utils/api";
interface IUpdateCustomerProps {
  id: number | string | string[] | undefined;
  data: ICustomer;
}

const getCustomers = async () => {
  const url = "/cliente";
  return await api.get(url);
};

const getCustomer = async ({ id }: { id: string | string[] | undefined }) => {
  const url = `/cliente/${id}`;
  return await api.get(url);
};

const updateCustomer = async ({ id, data }: IUpdateCustomerProps) => {
  const url = `/cliente/${id}`;
  return await api.put(url, data);
};

const customersServices = {
  getCustomers,
  getCustomer,
  updateCustomer,
};
export default customersServices;
