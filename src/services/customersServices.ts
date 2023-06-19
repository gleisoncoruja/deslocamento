import { ICustomer } from "@/interfaces/customerInterface";
import { api } from "@/utils/api";
interface IUpdateCustomerProps {
  id: number | string | string[] | undefined;
  data: ICustomer;
}

interface IDeleteCustomerProps {
  id: number | string | string[] | undefined;
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

const deleteCustomer = async ({ id }: IDeleteCustomerProps) => {
  const url = `/cliente/${id}`;
  const data = {
    id: id,
  };
  return await api.delete(url, {
    data,
  });
};

const customersServices = {
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
export default customersServices;
