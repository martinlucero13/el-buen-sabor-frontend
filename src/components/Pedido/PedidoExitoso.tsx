import { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";

/**
 * Componente para notificar de un pedido que se realizo correctamente.
 * Vista de Usuario.
 */
function PedidoExitoso(): JSX.Element {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } if (countdown === 5) {
        } else {
            window.location.href = "/";
        }
    }, [countdown]);


    return (
        <section className="section-bg">
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Alert variant="success">
                            <Alert.Heading>Pedido Creado Exitosamente</Alert.Heading>
                            <p>
                                ¡Gracias por elegirnos! Serás redirigido automáticamente al home en {countdown} segundos.
                            </p>
                        </Alert>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default PedidoExitoso;