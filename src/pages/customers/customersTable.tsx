import { StyledTableContent } from "@/components/Table";
import { ICustomers } from "@/interfaces/customerInterface";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const CustomersTable = ({ customers }: ICustomers) => {
  const headRows = [
    "ID",
    "Nome",
    "Número documento",
    "Tipo documento",
    "Logradouro",
    "Número",
    "Bairro",
    "Cidade",
    "UF",
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
          {customers?.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.nome}</TableCell>
              <TableCell>{customer.numeroDocumento}</TableCell>
              <TableCell>{customer.tipoDocumento}</TableCell>
              <TableCell>{customer.logradouro}</TableCell>
              <TableCell>{customer.numero}</TableCell>
              <TableCell>{customer.bairro}</TableCell>
              <TableCell>{customer.cidade}</TableCell>
              <TableCell>{customer.uf}</TableCell>
              <TableCell>
                <Button variant="contained">Detalhes</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContent>
  );
};
