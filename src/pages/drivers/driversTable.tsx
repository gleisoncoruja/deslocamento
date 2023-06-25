import { ButtonLink } from "@/components/Buttons";
import { StyledTableContent } from "@/components/Table";
import { IDrivers } from "@/interfaces/driverInterface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface ITableProps extends IDrivers {
  search: string;
}

export const DriversTable = ({ drivers, search }: ITableProps) => {
  const headRows = [
    "ID",
    "Nome",
    "Número habilitação",
    "Categoria habilitação",
    "Vencimento habilitação",
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
          {drivers
            ?.filter(({ nome }) =>
              nome?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            )
            .map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>{driver.id}</TableCell>
                <TableCell>{driver.nome}</TableCell>
                <TableCell>{driver.numeroHabilitacao}</TableCell>
                <TableCell>{driver.catergoriaHabilitacao}</TableCell>
                <TableCell>{driver.vencimentoHabilitacao}</TableCell>
                <TableCell>
                  <ButtonLink href={`/drivers/${driver.id}`}>
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
