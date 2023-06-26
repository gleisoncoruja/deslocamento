import { ButtonLink } from "@/components/Buttons";
import { StyledTableContent } from "@/components/Table";
import { IDisplacements } from "@/interfaces/displacementInterface";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface ITableProps extends IDisplacements {
  search: string;
}

export const DisplacementsTable = ({ displacements, search }: ITableProps) => {
  const headRows = [
    "ID",
    "Condutor ID",
    "Cliente ID",
    "Início",
    "Fim",
    "Veículo ID",
    "KM Inicial",
    "KM Final",
    "",
  ];

  return (
    <StyledTableContent>
      <Table>
        <TableHead>
          <TableRow>
            {headRows?.map((row) => (
              <TableCell key={row}>{row}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {displacements
            ?.filter(({ idCondutor, idCliente, idVeiculo }) => {
              return (
                idCondutor?.toString().includes(search) ||
                idCliente?.toString().includes(search) ||
                idVeiculo?.toString().includes(search)
              );
            })
            .map((displacement) => (
              <TableRow key={displacement.id}>
                <TableCell>{displacement.id}</TableCell>
                <TableCell>{displacement.idCondutor}</TableCell>
                <TableCell>{displacement.idCliente}</TableCell>
                <TableCell>{displacement.inicioDeslocamento}</TableCell>
                <TableCell>{displacement.fimDeslocamento}</TableCell>
                <TableCell>{displacement.idVeiculo}</TableCell>
                <TableCell>{displacement.kmInicial}</TableCell>
                <TableCell>{displacement.kmFinal}</TableCell>
                <TableCell>
                  <ButtonLink href={`/displacements/${displacement.id}`}>
                    Detalhes
                  </ButtonLink>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </StyledTableContent>
  );
};
