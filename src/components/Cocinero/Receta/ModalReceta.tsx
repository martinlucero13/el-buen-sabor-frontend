import "./ModalReceta.css";
import { useEffect } from "react";
import { Col, Image, Modal, Row } from "react-bootstrap";

import { findImagenByName } from "../../../services/ImagenService";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { DetalleArticuloManufacturado } from "../../../types/DetalleArticuloManufacturado";

interface Props {
    showModal: boolean;
    handleClose: () => void;
    articuloManufacturado: ArticuloManufacturado;
}

/**
 * Componente que muestra la receta de un Artículo Manufacturado.
 */
function ModalReceta({ showModal, handleClose, articuloManufacturado }: Props): JSX.Element {

    useEffect(() => {
        getImagen();
    }, [articuloManufacturado])

    const getImagen = async () => {
        articuloManufacturado.imagenURL = await findImagenByName(articuloManufacturado.imagen);
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered backdrop="static" size="lg">
            <Modal.Header closeButton className="modal-receta"/>
            <Modal.Body className="modal-receta">
                <Row>
                    <Col>
                        <Image
                            src={articuloManufacturado.imagenURL}
                            alt={articuloManufacturado.denominacion}
                            fluid
                            rounded 
                        />
                    </Col>
                    <Col>
                        <Row>
                            <Row>
                                <h1 className="fw-bolder">
                                    { articuloManufacturado.denominacion }
                                </h1>
                            </Row>
                            <Row>
                                <h4>
                                    { articuloManufacturado.tiempoEstimadoCocina } minutos
                                </h4>
                            </Row>
                        </Row>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <h4 className="fw-semibold modal-receta-subtitles">Ingredientes</h4>

                    <ul className="ms-4">
                        {
                            articuloManufacturado.detalles.map((item: DetalleArticuloManufacturado) =>
                                <li key={item.id}>
                                    { item.articuloInsumo.denominacion }
                                </li>
                            )
                        }
                    </ul>
                </Row>

                <Row className="mt-3">
                    <h4 className="fw-semibold modal-receta-subtitles">Preparación</h4>
                    
                    <p className="ms-2">
                        { articuloManufacturado.receta }
                    </p>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default ModalReceta;