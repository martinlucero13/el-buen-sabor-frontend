import "./Categorias.css"
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

import categorias from "../../../mocks/CategoriasRoutes.json";

/**
 * Componente que muestra las categorías de productos disponibles en el Home.
 */
function Categorias(): JSX.Element {
    return (
        <section>
            <Row xs={1} md={2} lg={2}>
                {categorias.map((categoria, index) => (
                    <Col key={index} className="py-3">
                        <Link to={`/productos/${categoria.nombre.toLowerCase()}`}>
                            <Card className="bg-dark text-white ms-3 me-3 card-categoria">
                                <div className="card-img-container">
                                    <Card.Img
                                        src={categoria.imagen}
                                        alt={categoria.nombre}
                                        className="img-categoria"
                                        loading="lazy"
                                    />
                                </div>
                                <Card.ImgOverlay>
                                    <Card.Title className="text-uppercase fw-semibold">
                                        { categoria.nombre }
                                    </Card.Title>
                                </Card.ImgOverlay>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </section>
    );
}

export default Categorias;