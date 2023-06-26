import { ButtonLink } from "@/components/Buttons";
import { StyledTableContent } from "@/components/Table";
import { IVehicles } from "@/interfaces/vehiclesInterface";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface ITableProps extends IVehicles {
  search: string;
}

export const VehiclesTable = ({ vehicles, search }: ITableProps) => {
  const headRows = [
    "ID",
    "Placa",
    "Marca/Modelo",
    "Ano fabricação",
    "KM atual",
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
          {vehicles
            ?.filter(({ placa, marcaModelo, anoFabricacao }) => {
              const searchValue = search.toLocaleLowerCase();
              return (
                placa?.toLocaleLowerCase().includes(searchValue) ||
                marcaModelo?.toLocaleLowerCase().includes(searchValue) ||
                anoFabricacao?.toString().includes(searchValue)
              );
            })
            .map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.id}</TableCell>
                <TableCell>{vehicle.placa}</TableCell>
                <TableCell>{vehicle.marcaModelo}</TableCell>
                <TableCell>{vehicle.anoFabricacao}</TableCell>
                <TableCell>{vehicle.kmAtual}</TableCell>
                <TableCell>
                  <ButtonLink href={`/vehicles/${vehicle.id}`}>
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
