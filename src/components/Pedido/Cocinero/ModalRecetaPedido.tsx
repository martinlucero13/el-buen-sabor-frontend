import "./ModalRecetaPedido.css";
import { Col, Modal, Row  } from "react-bootstrap";
import { ArticuloInsumo } from '../../../types/ArticuloInsumo';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from "react";
import { ArticuloManufacturado } from '../../../types/ArticuloManufacturado';
import { findArticuloInsumoById } from "../../../services/ArticuloInsumoService";
import { findArticuloManufacturadoWithReceta } from "../../../services/ArticuloManufacturadoService";
import { findByArticuloManufacturado } from "../../../services/ArticuloManufacturadoInsumoService";

type ProductoParams = {
    showModal: boolean,
    handleClose: () => void,
    idArticuloManufacturado:number,
}

export const ModalRecetaPedido=(props: ProductoParams)=>{

    const [articuloManufacturado, setArticuloManufacturado] = useState<ArticuloManufacturado>();
    const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getArticuloManufacturado();
    }, []);

    const getArticuloManufacturado = async () => {
        const token = await getAccessTokenSilently();

        // Articulo Manufacturado
        const newArticuloManufacturado = await findArticuloManufacturadoWithReceta(Number(props.idArticuloManufacturado), token);

        // Articulo Manufacturado Insumo
        const newArticulosManufacturadosInsumos = await findByArticuloManufacturado(newArticuloManufacturado.id, token);
        console.log(newArticuloManufacturado.imagen.imagenUrl);
        // Articulo Insumo
        let articulosInsumosArray = [];
        for (const item of newArticulosManufacturadosInsumos) {
            const id = item.articuloInsumoId;
            const newArticuloInsumo = await findArticuloInsumoById(id, token);

            articulosInsumosArray.push(newArticuloInsumo);
        };
        setArticuloManufacturado(newArticuloManufacturado);
        setArticulosInsumos(articulosInsumosArray);
    };

    return(
        <>
            <Modal show={props.showModal} onHide={props.handleClose}>
                <Modal.Header closeButton id="modal-detalle-pedido-header">
                    <Modal.Title><h2>Receta</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body id="modal-detalle-pedido-body"> 
                    <Row>
                        <Col><img className="imagen-receta-pedido" src={articuloManufacturado?.imagen.imagenUrl}></img></Col>
                        <Col>
                            <h3>{articuloManufacturado?.denominacion}</h3>
                            <p>Tiempo Promedio: {articuloManufacturado?.tiempoEstimadoCocina}</p>
                        </Col>
                    </Row>
                    <Row>
                        {
                            articulosInsumos.length !== 0 &&
                            <>
                                <h3>Ingredientes</h3>
                                {
                                    articulosInsumos?.map((item: ArticuloInsumo, index: number) =>
                                        <li key={index}>{item.denominacion}</li>
                                    )
                                }
                            </>
                        }
                    </Row>
                    <Row>
                        <h3>Preparacion:</h3>
                        <Col>{articuloManufacturado?.receta?.descripcion}</Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}