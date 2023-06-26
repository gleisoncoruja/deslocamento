export interface IVehicle {
  id: number;
  placa?: string;
  marcaModelo?: string;
  anoFabricacao: number;
  kmAtual: number;
}

export interface IVehicles {
  vehicles: IVehicle[];
}
