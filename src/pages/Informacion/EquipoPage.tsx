import { Github, Instagram, Twitter } from "react-bootstrap-icons";
import { Card, Container, ListGroup, Row, Col, Button } from "react-bootstrap";


function EquipoPage(): JSX.Element {
    return (
        <section>
            <Container className="py-3">
                <h1>
                    Conoce al equipo
                </h1>

                <Row className="mt-5 justify-content-center align-items-center">
                    <Col md={6} lg={3} className="mb-4">
                        <Card className="bg-dark mx-auto">
                            <Card.Img
                                src="/images/zair-bulos.jpg"
                                alt="zair-bulos"
                                loading="lazy"
                                variant="top"
                            />
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item className="text-white text-uppercase bg-dark">
                                    Zair Bulos
                                </ListGroup.Item>
                            </ListGroup>
                            <Card.Body className="text-center">
                                <Card.Link href="https://github.com/ZairAlejandroBulos" target="_blank">
                                    <Button variant="dark">
                                        <Github color="white" />
                                    </Button>
                                </Card.Link>
                                <Card.Link href="https://www.instagram.com/cristiano/" target="_blank">
                                    <Button variant="dark">
                                        <Instagram color="white" />
                                    </Button>
                                </Card.Link>
                                <Card.Link href="https://twitter.com/Cristiano?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank">
                                    <Button variant="dark">
                                        <Twitter color="white" />
                                    </Button>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={3} className="mb-4">
                        <Card className="bg-dark mx-auto">
                            <Card.Img
                                src="/images/santiago-castillo.jpeg"
                                alt="santiago-castillo"
                                loading="lazy"
                                variant="top"
                            />
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item className="text-white text-uppercase bg-dark">
                                    Santiago Castillo
                                </ListGroup.Item>
                            </ListGroup>
                            <Card.Body className="text-center">
                                <Card.Link href="https://github.com/SantyCastillo" target="_blank">
                                    <Button variant="dark">
                                        <Github color="white" />
                                    </Button>
                                </Card.Link>
                                <Card.Link href="https://www.instagram.com/leomessi/" target="_blank">
                                    <Button variant="dark">
                                        <Instagram color="white" />
                                    </Button>
                                </Card.Link>
                                <Card.Link href="https://twitter.com/leomessisite?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank">
                                    <Button variant="dark">
                                        <Twitter color="white" />
                                    </Button>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default EquipoPage;