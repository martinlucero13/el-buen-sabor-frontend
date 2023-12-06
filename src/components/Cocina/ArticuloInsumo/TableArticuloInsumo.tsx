import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Plus } from "react-bootstrap-icons";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

import { Endpoint } from "../../../types/Endpoint";
import { ArticuloInsumo } from "../../../types/ArticuloInsumo";
import { useEntities } from "../../../hooks/useEntities";
import { useReload } from "../../../hooks/useReload";
import NoSearch from "../../Layout/Table/NoSearch";
import ItemArticuloInsumo from "./ItemArticuloInsumo";

/**
 * Componente que muestra una lista de Ingredientes.
 */
function TableArticuloInsumo(): JSX.Element {
    const { reload, handleReload } = useReload();
    const [search, setSearch] = useState<string>('');
    const { entities } = useEntities<ArticuloInsumo>(Endpoint.ArticuloInsumo, reload);
    const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);

    useEffect(() => {
        getArticulosInsumos();
    }, [entities, search]);

    const getArticulosInsumos = async () => {
        if (search === '') {
            setArticulosInsumos(entities);
        } else {
            setArticulosInsumos(filterArticulosInsumos(entities, search));
        }
    };

    const filterArticulosInsumos = (articulosInsumos: ArticuloInsumo[], search: string): ArticuloInsumo[] => {
        return articulosInsumos.filter((articuloInsumo) =>
            articuloInsumo.denominacion.toLowerCase().includes(search.toLowerCase()) ||
            articuloInsumo.unidadMedida.toLowerCase().includes(search.toLowerCase()) ||
            articuloInsumo.rubro?.denominacion.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <section>
            <Container className="py-3">
                <h1>Ingredientes</h1>

                <Row className="py-3">
                    <Col xs={12} md={6}>
                        <NavLink to="/admin/stock/ingredientes/form/-1">
                            <Button variant="success">
                                <Plus size={20} />
                            </Button>
                        </NavLink >
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Control
                            id="search"
                            name="search"
                            type="search"
                            placeholder="Buscar ingredientes..."
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
                                <th>Costo</th>
                                <th>Stock Actual</th>
                                <th>Stock Mínimo</th>
                                <th>Unidad de Medida</th>
                                <th>Estado</th>
                                <th colSpan={3}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                articulosInsumos.length === 0 ? (
                                    <NoSearch colSpan={10} search={search} />
                                ) : (
                                    articulosInsumos.map((item: ArticuloInsumo) =>
                                        <ItemArticuloInsumo
                                            key={item.id}
                                            articuloInsumo={item}
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

export default TableArticuloInsumo;