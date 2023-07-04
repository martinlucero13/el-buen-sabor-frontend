import { Button, Card } from "react-bootstrap";
import "./ItemPedidoCliente.css"
function ItemPedidoCliente(props: { id: number }): JSX.Element {

    return (
        <>
          <Card id="grid-item-pedido-cliente">
            <Card.Text>N°Pedido: {props.id}</Card.Text>
            <Card.Text>Total: $</Card.Text>
            <Card.Text>Estado</Card.Text>
            <Button variant="success" className="button-item-pedido-cliente">Detalle</Button>
            <Button variant="primary" className="button-item-pedido-cliente">Factura</Button>
            <Card.Text className="fecha-item-pedido-cliente">4/7/2023 - 16:46</Card.Text>
          </Card>
        </>
    );
}

export default ItemPedidoCliente;