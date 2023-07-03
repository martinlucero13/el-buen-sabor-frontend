import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import '../ListadoPedido.css';
import { Pedido } from "../../../types/Pedido";
import { useAuth0 } from "@auth0/auth0-react";
import { findAllPedidos } from "../../../services/PedidoService";
import ItemPedidoCocinero from "./ItemPedidoCocinero";

const ListadoPedidoCocinero: React.FC = () => {

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
      <Container>
        <Table id="tabla" >
            <h1>Listado Pedidos Cocinero</h1>
            <Row id="tabla-titulo">
              <Col>Pedido</Col>
              <Col>Fecha/Hora</Col>
              <Col>Tiempo Preparación</Col>
              <Col>Hora Estimada</Col>
              <Col>Detalles</Col>
              <Col>Acciones</Col>
            </Row>
            {
              pedidos.map((item: Pedido, index: number) =>
                  <ItemPedidoCocinero key={index} {...item} />
              )
            }
        </Table>
      </Container>
    </>
  );
}

export default ListadoPedidoCocinero;
