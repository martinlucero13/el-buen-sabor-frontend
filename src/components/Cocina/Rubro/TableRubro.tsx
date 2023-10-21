import { Plus } from "react-bootstrap-icons";
import { Suspense, lazy, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

import ItemRubro from "./ItemRubro";
import { Rubro } from "../../../types/Rubro";
import { Endpoint } from "../../../types/Endpoint";
import { useModal } from "../../../hooks/useModal";
import { useReload } from "../../../hooks/useReload";
import { useEntities } from "../../../hooks/useEntities";
import NoSearch from "../../Layout/Table/NoSearch";
const ModalRubro = lazy(() => import("./ModalRubro"));

/**
 * Componente que muestra una tabla de Rubros.
 * Vista de Admin/Cocinero.
 */
function TableRubro(): JSX.Element {
    const { reload, handleReload } = useReload();
    const { showModal, handleClose } = useModal();
    const [search, setSearch] = useState<string>('');
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const { entities } = useEntities<Rubro>(Endpoint.Rubro, reload);

    useEffect(() => {
        getRubros();
    }, [entities, search]);

    const getRubros = async () => {
        if (search === '') {
            setRubros(entities);
        } else {
            setRubros(filterRubros(entities, search));
        }
    };

    const filterRubros = (rubros: Rubro[], search: string): Rubro[] => {
        return rubros.filter((rubro) =>
            rubro.denominacion.toLowerCase().includes(search.toLowerCase()) ||
            (rubro.rubroPadreDenominacion && rubro.rubroPadreDenominacion.toLowerCase().includes(search.toLowerCase()))
        );
    };

    return (
        <section>
            <Container className="py-3">
                <h1>Rubros</h1>

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
                            placeholder="Buscar rubros..."
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
                                <th>Rubro Principal</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                <th colSpan={2}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rubros.length === 0 ? (
                                    <NoSearch colSpan={6} search={search} />
                                ) : (
                                    rubros.map((item: Rubro) =>
                                        <ItemRubro
                                            key={item.id}
                                            rubro={item}
                                            handleReload={handleReload}
                                        />
                                    )
                                )
                            }
                        </tbody>
                    </Table>
                </div>

                <Suspense>
                    <ModalRubro
                        showModal={showModal}
                        handleClose={handleClose}
                        handleReload={handleReload}
                    />
                </Suspense>
            </Container>
        </section>
    );
}

export default TableRubro;