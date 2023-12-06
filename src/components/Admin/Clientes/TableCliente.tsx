import { Plus } from "react-bootstrap-icons";
import { Suspense, useEffect, useState, lazy } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";

import ItemCliente from "./ItemCliente";
import { Cliente, TipoCliente } from "../../../types/Cliente";
import { useModal } from "../../../hooks/useModal";
import { useReload } from "../../../hooks/useReload";
import { useClientes } from "../../../hooks/useClientes";
import NoSearch from "../../Layout/Table/NoSearch";
const ModalCliente = lazy(() => import("./ModalCliente"));

/**
 * tabla de Clientes.
 * Vista de Admin.
 */
function TableCliente(): JSX.Element {
    const { reload, handleReload } = useReload();
    const { showModal, handleClose } = useModal();
    const [search, setSearch] = useState<string>('');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const { entities } = useClientes(TipoCliente.Cliente, reload);

    useEffect(() => {
        getClientes();
    }, [entities, search]);

    const getClientes = async () => {
        if (search === '') {
            setClientes(entities);
        } else {
            setClientes(filterClientes(entities, search));
        }
    };

    const filterClientes = (clientes: Cliente[], search: string): Cliente[] => {
        return clientes.filter((cliente) =>
            cliente.nombre.toLowerCase().includes(search.toLowerCase()) ||
            cliente.apellido.toLowerCase().includes(search.toLowerCase()) ||
            cliente.usuario.email.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <Container className="py-3">
            <h1>Clientes</h1>

            <Row className="py-3">
                <Col xs={12} md={6}>
                    <Button onClick={handleClose} variant="success">
                        <Plus size={20} />
                    </Button>
                </Col>
                
                <Col xs={12} md={6}>
                    <Form.Control
                        id="search"
                        name="search"
                        type="search"
                        placeholder="Buscar clientes..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="form-control-search"
                    />
                </Col>
            </Row>

            <div className="table-scrollable">
                <Table responsive bordered hover>
                    <thead className="table-thead">
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Estado</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.length === 0 ? (
                                <NoSearch colSpan={7} search={search} />
                            ) : (
                                clientes.map((item: Cliente, index: number) => (
                                    <ItemCliente
                                        key={index}
                                        cliente={item}
                                        handleReload={handleReload}
                                    />
                                ))
                            )}
                    </tbody>
                </Table>
            </div>

            <Suspense>
                <ModalCliente
                    showModal={showModal}
                    handleClose={handleClose}
                    handleReload={handleReload}
                />
            </Suspense>
        </Container>
    );
}

export default TableCliente;