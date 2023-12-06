import { Col, Row } from "react-bootstrap";

import CardProducto from "./CardProducto";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";

interface Props {
    productos: ArticuloManufacturado[];
}

/**
 * Componente que agrupa y muestra los productos por categoría.
 */
function GroupedProductos({ productos }: Props): JSX.Element {
    const uniqueCategorias = [...new Set(productos.map((item) => item.categoria))];

    return (
        <>
            {
                uniqueCategorias.map((categoria) => (
                    <div key={categoria} className="mt-3">
                        <Row xs={1} md={2} lg={3} className="g-5">
                            { productos
                                .filter(item => item.categoria === categoria)
                                .map((item: ArticuloManufacturado) => (
                                    <Col key={item.id}>
                                        <CardProducto key={item.id} producto={item} />
                                    </Col>
                                ))
                            }
                        </Row>
                    </div>
                ))
            }
        </>
    );
}

export default GroupedProductos;