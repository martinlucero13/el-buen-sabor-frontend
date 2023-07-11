import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import '../ListadoPedido.css';
import { Pedido } from "../../../types/Pedido";
import { useAuth0 } from "@auth0/auth0-react";
import ItemPedidoCocinero from "./ItemPedidoCocinero";

//Services
import { sumarMinutosPedido,cambiarEstado } from "../../../services/PedidoService";
import { findPedidoByEstado } from "../../../services/PedidoService";

const ListadoPedidoCocinero: React.FC = () => {

  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
      getAllPedidosCocinero();
  }, []);

  const getAllPedidosCocinero = async () => {
      const token = await getAccessTokenSilently();
      const newPedidos = await findPedidoByEstado("Cocina",token);
      setPedidos(newPedidos);
  };

  const actualizarFechaPedido = async (id:number,pedido: Pedido) => {
    try {
      const token = await getAccessTokenSilently();

      const pedidoActualizado = await sumarMinutosPedido(id, pedido,token);
      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.id === pedidoActualizado.id ? pedidoActualizado : pedido
        )
      );

    } catch (error) {
      // Manejar el error de actualización del pedido
      console.error('Error al actualizar el pedido:', error);
    }

  }

  const actualizarEstadoPedido = async (id:number,pedido: Pedido) => {
    try {
      const token = await getAccessTokenSilently();

      const pedidoActualizado = await cambiarEstado(id, pedido,token);
      setPedidos((prevPedidos) => prevPedidos.filter((p) => p.id !== pedidoActualizado.id));


    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    }

  }

  
  return (
    <>
      <Container>
        <Table id="tabla" >
            <Row><h1>Listado Pedidos Cocinero</h1></Row>
            <Row id="tabla-titulo">
              <Col>Pedido</Col>
              <Col>Fecha/Hora</Col>
              <Col>Tiempo Preparación</Col>
              <Col>Hora Estimada</Col>
              <Col>Detalles</Col>
              <Col>Acciones</Col>
            </Row>
            {
              pedidos.map((pedido: Pedido, index: number) =>(
                <ItemPedidoCocinero key={index} pedido={pedido} actualizarPedido={actualizarFechaPedido} cambiarEstado={actualizarEstadoPedido}/>
              ))
            }
        </Table>
      </Container>
    </>
  );
}

export default ListadoPedidoCocinero;
