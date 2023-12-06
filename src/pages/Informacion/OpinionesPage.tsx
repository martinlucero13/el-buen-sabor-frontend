import "./Informacion.css";
import { StarFill, StarHalf } from "react-bootstrap-icons";
import { Card, Container, Row, Col } from "react-bootstrap";


function OpinionesPage(): JSX.Element {
    return (
        <section className="section-bg-gradient">
            <Container className="py-3">
                <h1 className="text-white">
                    ¿Qué dicen nuestros usuarios?
                </h1>

                <Row className="mt-5 justify-content-center text-dark">
                    <Col md={6} lg={3} className="mb-3">
                        <Card className="card-clientes">
                            <div className="container-img-persona">
                                <Card.Img
                                    variant="top"
                                    src="https://www.caracteristicasdel.com/wp-content/uploads/2020/09/Caracteristicas-de-la-Persona.jpg"
                                    alt="persona-1"
                                    loading="lazy"
                                />
                            </div>
                            <Card.Body>
                                <Card.Title>Sofi Merlino</Card.Title>
                                <Card.Text>
                                    "Sabores únicos, muy abundante, 10/10."
                                </Card.Text>
                                <Card.Footer className="bg-white">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <StarFill key={star} />
                                    ))}
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={3} className="mb-3">
                        <Card className="card-clientes">
                            <div className="container-img-persona">
                                <Card.Img
                                    variant="top"
                                    src="https://img.freepik.com/foto-gratis/retrato-hombre-blanco-aislado_53876-40306.jpg"
                                    alt="persona-2"
                                    loading="lazy"
                                />
                            </div>
                            <Card.Body>
                                <Card.Title>Diego Sanguinetti</Card.Title>
                                <Card.Text>
                                    "Excelente atención, buenos precios."
                                </Card.Text>
                                <Card.Footer className="bg-white">
                                    {[1, 2, 3].map((star) => (
                                        <StarFill key={star} />
                                    ))}
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={3} className="mb-3">
                        <Card className="card-clientes">
                            <div className="container-img-persona">
                                <Card.Img
                                    variant="top"
                                    src="https://www.mundopsicologos.com/site/article/60606/50895/las-10-cualidades-de-una-persona-mas-valoradas-0_ai1.jpg"
                                    alt="persona-3"
                                    loading="lazy"
                                />
                            </div>
                            <Card.Body>
                                <Card.Title>Romina Rodriguez</Card.Title>
                                <Card.Text>
                                    "Muy buenos los sabores, no se parece a nada en Mendoza."
                                </Card.Text>
                                <Card.Footer className="bg-white">
                                    {[1, 2, 3].map((star) => (
                                        <StarFill key={star} />
                                    ))}
                                    <StarHalf />
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default OpinionesPage;