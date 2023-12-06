import "./Informacion.css";
import { Button, Image, Row, Col } from "react-bootstrap";
import { Bicycle, CreditCard, Person } from "react-bootstrap-icons";


function InformacionPage(): JSX.Element {
    return(
        <div className="container-informacion">
            <Image 
                src="/images/informacion-page.jpg"
                alt="informacion-page"
                loading="lazy"
                className="img-informacion"
            />

            <div className="overlay text-center">
                <Row>
                    <Col xs={12} md={4} sm={4} lg={4}>
                        <Button variant="link" className="btn-informacion p-3">
                            <CreditCard size={40} color="white" />
                        </Button>
                        <h5 className="text-white mt-1">
                            Formas de Pago
                        </h5>
                        <p className="text-white">
                            Actualmente solo aceptamos efectivo y Mercado Pago.
                        </p>
                    </Col>

                    <Col xs={12} md={4} sm={4} lg={4}>
                        <Button variant="link" className="btn-informacion p-3">
                            <Person size={40} color="white" />
                        </Button>
                        <h5 className="text-white mt-1">
                            Atención al Cliente
                        </h5>
                        <p className="text-white">
                            No dudes en contactar a nuestro equipo al +54 9 261 205-5507.
                        </p>
                    </Col>

                    <Col xs={12} md={4} sm={4} lg={4}>
                        <Button variant="link" className="btn-informacion p-3">
                            <Bicycle size={40} color="white" />
                        </Button>
                        <h5 className="text-white mt-1">
                            Envíos
                        </h5>
                        <p className="text-white">
                            Take Away y envíos a todo Mendoza.
                        </p>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default InformacionPage;