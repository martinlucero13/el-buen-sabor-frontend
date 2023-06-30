import React, { FormEvent, useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, DropdownButton, Form, FormControl, Row, Table } from "react-bootstrap";
import './ListadoPedido.css';
import { Pedido } from "../../types/Pedido";
import { useAuth0 } from "@auth0/auth0-react";
import { findAllPedidos } from "../../services/PedidoService";
import ItemPedido from "./ItemPedido";

const ListadoPedido: React.FC = () => {
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Agregar lógica de búsqueda
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    handleFilter(option);
  };

  const handleFilter = (option: string) => {
    // Agregar lógica de filtrado según la opción seleccionada
  };

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
          <h1>Listado De Pedidos</h1>
        </Row>
        <Row id="fila-buscar">
          <Col>
            <DropdownButton
              id="filter-dropdown"
              title={selectedOption || 'Filtrar por estado'}
            >
              <Dropdown.Item
                eventKey="Cocina"
                onSelect={() => handleSelect("Cocina")}
              >
                Cocina
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="A Confirmar"
                onSelect={() => handleSelect("A Confirmar")}
              >
                A Confirmar
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="Listo"
                onSelect={() => handleSelect("Listo")}
              >
                Listo
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            <Form onSubmit={handleSearch} id="form-buscar">
              <FormControl type="text" placeholder="Buscar Pedido" id="form-control-buscar" />
              <Button variant="outline-success" type="submit">Buscar</Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container>
        <Table id="tabla">
            <Row id="tabla-titulo">
              <Col>Pedido</Col>
              <Col>Fecha y Hora</Col>
              <Col>Forma de Entrega</Col>
              <Col>Forma de Pago</Col>
              <Col>Pagado</Col>
              <Col>Estado</Col>
              <Col>Detalles</Col>
            </Row>
            {
              pedidos.map((item: Pedido, index: number) =>
                  <ItemPedido key={index} {...item} />
              )
            }
        </Table>
      </Container>
    </>
  );
}

export default ListadoPedido;
