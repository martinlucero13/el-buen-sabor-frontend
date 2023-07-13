import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import '../ListadoPedido.css';
import { Pedido } from "../../../types/Pedido";
import { useAuth0 } from "@auth0/auth0-react";
import ItemPedidoDelivery from "./ItemPedidoDelivery";

//Service
import { cambiarEstado, findPedidoByEstado } from "../../../services/PedidoService";


const ListadoPedidoDelivery: React.FC = () => {

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAllPedidosDelivery();
  }, []);

  const actualizarEstadoPedido = async (id:number) => {
    try {
      const token = await getAccessTokenSilently();

      const pedidoActualizado = await cambiarEstado(id, "Terminado",token);
      setPedidos((prevPedidos) => prevPedidos.filter((p) => p.id !== pedidoActualizado.id));


    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    }

  }

  const getAllPedidosDelivery = async () => {
      const token = await getAccessTokenSilently();
      const newPedidos = await findPedidoByEstado("Delivery",token);
      setPedidos(newPedidos);
  };

  return (
    <>
      <Container id="contenedor">
        <Row>
          <h1>Pedidos A Entregar</h1>
        </Row>
      </Container>

      <Container>
        <Table id="tabla">
            <Row id="tabla-titulo">
              <Col>Pedido</Col>
              <Col>Fecha y Hora</Col>
              <Col>Nombre</Col>
              <Col>Direccion</Col>
              <Col>Departamento</Col>
              <Col>Telefono</Col>
              <Col>Estado</Col>
              <Col>Detalle</Col>
            </Row>
            {
              pedidos.map((pedido: Pedido, index: number) => (
                <ItemPedidoDelivery key={index} pedido={pedido} cambiarEstado={actualizarEstadoPedido}/>
              ))
            }
        </Table>
      </Container>
    </>
  );
}

export default ListadoPedidoDelivery;