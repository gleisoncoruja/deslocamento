import { ButtonLink } from "@/components/Buttons";
import { StyledTableContent } from "@/components/Table";
import { ICustomers } from "@/interfaces/customerInterface";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface ITableProps extends ICustomers {
  search: string;
}

export const CustomersTable = ({ customers, search }: ITableProps) => {
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
          {customers
            ?.filter(({ nome }) =>
              nome?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            )
            .map((customer) => (
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
                  <ButtonLink href={`/customers/${customer.id}`}>
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
