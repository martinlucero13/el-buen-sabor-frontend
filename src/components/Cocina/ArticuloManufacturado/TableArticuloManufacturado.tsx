import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Plus } from "react-bootstrap-icons";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

import { Endpoint } from "../../../types/Endpoint";
import { useReload } from "../../../hooks/useReload";
import { useEntities } from "../../../hooks/useEntities";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import ItemArticuloManufacturado from "./ItemArticuloManufacturado";
import NoSearch from "../../Layout/Table/NoSearch";

/**
 * Componente que muestra una tabla de Productos.
 * Vista de Admin/Cocinero.
 */
function TableArticuloManufacturado(): JSX.Element {
    const { reload, handleReload } = useReload();
    const [search, setSearch] = useState<string>('');
    const { entities } = useEntities<ArticuloManufacturado>(Endpoint.ArticuloManufacturado, reload);
    const [articulosManufacturados, setArticulosManufacturados] = useState<ArticuloManufacturado[]>([]);

    useEffect(() => {
        getArticulosManufacturados();
    }, [entities, search]);

    const getArticulosManufacturados = async () => {
        if (search === '') {
            setArticulosManufacturados(entities);
        } else {
            setArticulosManufacturados(filterArticulosManufacurados(entities, search));
        }
    };

    const filterArticulosManufacurados = (articulosManufacturados: ArticuloManufacturado[], search: string): ArticuloManufacturado[] => {
        return articulosManufacturados.filter((articuloManufacturado) =>
            articuloManufacturado.denominacion.toLowerCase().includes(search.toLowerCase()) ||
            articuloManufacturado.rubro?.denominacion.toLocaleLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <section>
            <Container className="py-3">
                <h1>Productos</h1>

                <Row className="py-3">
                    <Col xs={12} md={6}>
                        <NavLink to="/admin/stock/productos/form/-1">
                            <Button variant="success">
                                <Plus size={20} />
                            </Button>
                        </NavLink>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Control
                            id="search"
                            name="search"
                            type="search"
                            placeholder="Buscar productos..."
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
                                <th>Denominación</th>
                                <th>Rubro</th>
                                <th>Tiempo de Preparación</th>
                                <th>Precio Venta</th>
                                <th colSpan={3}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                articulosManufacturados.length === 0 ? (
                                    <NoSearch colSpan={6} search={search} />
                                ) : (
                                    articulosManufacturados.map((item: ArticuloManufacturado) =>
                                        <ItemArticuloManufacturado
                                            key={item.id}
                                            articuloManufacturado={item}
                                            handleReload={handleReload}
                                        />
                                    )
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
        </section>
    );
}

export default TableArticuloManufacturado;