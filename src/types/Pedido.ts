import { Base } from './Base';
import { Factura } from './Factura';
import { FormaPago } from './FormaPago';
import { TipoEnvio } from './TipoEnvio';

export interface Pedido extends Base{
  fecha: Date;
  estado: string;
  formaPago: FormaPago;
  formaEntrega: TipoEnvio;
  subtotal: number;
  descuento: number;
  total: number;
  numeroPedido: string;
  factura: Factura | null;
  cliente: number;
  tiempoEstimadoPedido: string;
}