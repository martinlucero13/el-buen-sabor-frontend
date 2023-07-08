import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import './ListadoPedido.css';
import { Pedido } from "../../types/Pedido";
import { useAuth0 } from "@auth0/auth0-react";
import { findAllPedidos } from "../../services/PedidoService";
import ItemPedidoDelivery from "./ItemPedidoDelivery";

const ListadoPedidoDelivery: React.FC = () => {

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
      getAllPedidos();
  }, []);

  const getAllPedidos = async () => {
      const token = await getAccessTokenSilently();
      const newPedidos = await findAllPedidos(token);
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
              pedidos.map((item: Pedido, index: number) => {
                if (item.tipoEntregaPedido?.descripcion === "Delivery") {
                  return <ItemPedidoDelivery key={index} {...item} />;
                } else {
                  return null;
                }
              })
            }
        </Table>
      </Container>
    </>
  );
}

export default ListadoPedidoDelivery;