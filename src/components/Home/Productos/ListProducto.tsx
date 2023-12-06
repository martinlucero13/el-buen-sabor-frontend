import "./Producto.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";

import Loader from "../../Layout/Loader/Loader";
import GroupedProductos from "./GroupedProductos";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { useArticulosManufacturadosSearch } from "../../../hooks/useArticulosManufacturadosSearch";

/**
 * Componente que muestra una lista de productos filtrados por un término de búsqueda.
 */
function ListProducto(): JSX.Element {
    const { termino } = useParams<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const { articulosManufacturados } = useArticulosManufacturadosSearch(termino);
    const [filterProductos, setFilterProductos] = useState<ArticuloManufacturado[]>(articulosManufacturados);

    useEffect(() => {
        setLoading(true);
        setFilterProductos(articulosManufacturados);
    }, [termino, articulosManufacturados]);

    useEffect(() => {
        setLoading(false);
    }, [articulosManufacturados, filterProductos]);

    useEffect(() => {
        const filtered = filteredProductos(articulosManufacturados, search);
        setFilterProductos(filtered);
    }, [search, articulosManufacturados]);

    const filteredProductos = (productos: ArticuloManufacturado[], search: string): ArticuloManufacturado[] => {
        return productos.filter((producto) =>
            producto.denominacion.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <section>
            <Container className="py-3">
                <Row>
                    <Col xs={12} md={6} lg={4}></Col>
                    <Col xs={12} md={6} lg={4}></Col>
                    <Col xs={12} md={6} lg={4}>
                        <Form.Control
                            id="search"
                            type="search"
                            name="search"
                            placeholder="Buscar productos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="form-control-search"
                        />
                    </Col>
                </Row>

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {filterProductos.length > 0 ? (
                            <GroupedProductos productos={filterProductos} />
                        ) : (
                            <p className="error-message">
                                No se encontraron productos para su búsqueda.
                            </p>
                        )}
                    </>
                )}
            </Container>
        </section>
    );
}

export default ListProducto;