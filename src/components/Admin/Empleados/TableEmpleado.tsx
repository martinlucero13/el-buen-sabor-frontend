import { Plus } from "react-bootstrap-icons";
import { Suspense, useEffect, useState, lazy } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

import ItemEmpleado from "./ItemEmpleado";
import { useModal } from "../../../hooks/useModal";
import { useReload } from "../../../hooks/useReload";
import { useClientes } from "../../../hooks/useClientes";
import { Cliente, TipoCliente } from "../../../types/Cliente";
import NoSearch from "../../Layout/Table/NoSearch";
const ModalEmpleado = lazy(() => import("./ModalEmpleado"));

/**
 * Componentes que muestra una tabla de Empleados.
 * Vista de Admin.
 */
function TableEmpleado(): JSX.Element {
    const { reload, handleReload } = useReload();
    const { showModal, handleClose } = useModal();
    const [search, setSearch] = useState<string>('');
    const [empleados, setEmpleados] = useState<Cliente[]>([]);
    const { entities } = useClientes(TipoCliente.Empleado, reload);

    useEffect(() => {
        getEmpleados();
    }, [entities, search]);

    const getEmpleados = async () => {
        if (search === '') {
            setEmpleados(entities);
        } else {
            setEmpleados(filterEmpleados(entities, search));
        }
    };

    const filterEmpleados = (empleados: Cliente[], search: string): Cliente[] => {
        return empleados.filter((empleado) =>
            empleado.nombre.toLowerCase().includes(search.toLowerCase()) ||
            empleado.apellido.toLowerCase().includes(search.toLowerCase()) ||
            empleado.usuario.email.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <section>
            <Container className="py-3">
                <h1>Empleados</h1>

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
                            placeholder="Buscar empleados..."
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
                                empleados.length === 0 ? (
                                    <NoSearch colSpan={7} search={search} />
                                ) : (
                                    empleados.map((item: Cliente, index: number) => (
                                        <ItemEmpleado
                                            key={index}
                                            empleado={item}
                                            handleReload={handleReload}
                                        />
                                    ))
                                )}
                        </tbody>
                    </Table>
                </div>

                <Suspense>
                    <ModalEmpleado
                        showModal={showModal}
                        handleClose={handleClose}
                        handleReload={handleReload}
                    />
                </Suspense>
            </Container>
        </section>
    );
}

export default TableEmpleado;