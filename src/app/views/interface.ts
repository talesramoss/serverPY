export interface Suplemento {
  filter(arg0: (s: any) => boolean): Suplemento;
  suplemento_id: number;
  nomeSuplemento: string;
  marca: string;
  valor: number;
}
