import { IDisplacements } from "@/interfaces/displacementInterface";

export const formatData = ({ displacements }: IDisplacements) => {
  const formatted = displacements?.map((displacement) => {
    const endDisplacement = displacement.fimDeslocamento
      ? new Date(displacement.fimDeslocamento).toLocaleString()
      : "Em deslocamento";
    return {
      ...displacement,
      inicioDeslocamento: new Date(
        displacement.inicioDeslocamento
      ).toLocaleString(),
      fimDeslocamento: endDisplacement,
    };
  });
  return formatted;
};
