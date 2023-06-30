import { useNavigate } from "react-router-dom";
import { Pedido } from "../../types/Pedido";
import { Button, Col, Row } from "react-bootstrap";
import './ItemPedido.css'

function ItemPedido(props: Pedido): JSX.Element {

    const navigate = useNavigate();

    function handleButtonClick() {
        navigate(`abm/${props.id}`);
    }

    return(
        <>
            <Row id="tabla-cuerpo">
                <Col className="col-pedido">
                    { props.id }
                </Col>

                <Col className="col-pedido">
                    {props.fecha + "\t"} 
                    {props.horaEstimadaFin}
                </Col>

                <Col className="col-pedido">
                    { props.tipoEntregaPedido?.descripcion }
                </Col>

                <Col className="col-pedido">
                    { props.tipoPagoPedido?.descripcion }
                </Col>
                <Col className="col-pedido">
                    Estado del pago
                </Col>
                <Col className="col-pedido">
                    Estado del pedido
                </Col>
                <Col className="col-pedido">
                    <Button id="boton-detalle">Detalle</Button>
                </Col>
            </Row>
        </>
    );
}

export default ItemPedido;