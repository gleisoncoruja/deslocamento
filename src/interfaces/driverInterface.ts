export interface IDriver {
  id?: number;
  nome?: string;
  numeroHabilitacao?: string;
  catergoriaHabilitacao?: string;
  categoriaHabilitacao?: string;
  vencimentoHabilitacao?: string;
}

export interface IDrivers {
  drivers: IDriver[];
}
