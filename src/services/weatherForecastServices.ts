import { api } from "@/utils/api";

const getWeatherForecast = async () => {
  const url = "/weatherforecast";
  return await api.get(url);
};

const weatherForecastServices = {
  getWeatherForecast,
};
export default weatherForecastServices;
