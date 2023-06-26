import { IDisplacement } from "@/interfaces/displacementInterface";
import { api } from "@/utils/api";

interface IEndDisplacementEnd {
  id: number | string | string[] | undefined;
  kmFinal: number | undefined;
  fimDeslocamento: string;
  observacao?: string;
}

interface IEndDisplacementStart {
  kmInicial: number | undefined;
  inicioDeslocamento: string;
  motivo?: string;
  checkList?: string;
  idCondutor: number;
  idVeiculo: number;
  idCliente?: number;
}

interface IUpdateDisplacementProps {
  id: number | string | string[] | undefined;
  data: IEndDisplacementEnd;
}

interface IDeleteDisplacementProps {
  id: number | string | string[] | undefined;
}

interface ICreateDisplacementProps {
  data: IEndDisplacementStart;
}

const getDisplacements = async () => {
  const url = "/deslocamento";
  return await api.get(url);
};

const getDisplacement = async ({
  id,
}: {
  id: string | string[] | undefined;
}) => {
  const url = `/deslocamento/${id}`;
  return await api.get(url);
};

const endDisplacement = async ({ id, data }: IUpdateDisplacementProps) => {
  const url = `/deslocamento/${id}/encerrardeslocamento`;
  return await api.put(url, data);
};

const deleteDisplacement = async ({ id }: IDeleteDisplacementProps) => {
  const url = `/deslocamento/${id}`;
  const data = {
    id: id,
  };
  return await api.delete(url, {
    data,
  });
};

const startDisplacement = async ({ data }: ICreateDisplacementProps) => {
  const url = `/deslocamento/iniciardeslocamento`;
  return await api.post(url, data);
};

const displacementServices = {
  getDisplacements,
  getDisplacement,
  endDisplacement,
  deleteDisplacement,
  startDisplacement,
};
export default displacementServices;
