import { api } from "@/utils/api";

const getCustomers = async () => {
  const url = "/cliente";
  return await api.get(url);
};

const customersServices = {
  getCustomers,
};
export default customersServices;
