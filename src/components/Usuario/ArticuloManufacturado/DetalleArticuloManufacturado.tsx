import { useEffect, useState, useContext } from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./ArticuloManufacturado.css";
import { ArticuloInsumo } from "../../../types/ArticuloInsumo";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { ArticuloManufacturadoInsumo } from "../../../types/ArticuloManufacturadoInsumo";
import { findArticuloInsumoById } from "../../../services/ArticuloInsumoService";
import { findArticuloManufacturadoById } from "../../../services/ArticuloManufacturadoService";
import { findByArticuloManufacturado } from "../../../services/ArticuloManufacturadoInsumoService";
import { CarritoContext } from '../../Context/CarritoContext';

export const DetalleArticuloManufacturado = () => {
    const { id } = useParams();
    const [articuloManufacturado, setArticuloManufacturado] = useState<ArticuloManufacturado>();
    const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);
    const [articulosManufacturadosInsumos, setArticulosManufacturadosInsumos] = useState<ArticuloManufacturadoInsumo[]>([]);
    const { getAccessTokenSilently } = useAuth0();
    const { agregarAlCarrito } = useContext(CarritoContext);

    useEffect(() => {
        getArticuloManufacturado();
    }, []);

    const getArticuloManufacturado = async () => {
        const token = await getAccessTokenSilently();

        // Articulo Manufacturado
        const newArticuloManufacturado = await findArticuloManufacturadoById(Number(id), token);

        // Articulo Manufacturado Insumo
        const newArticulosManufacturadosInsumos = await findByArticuloManufacturado(newArticuloManufacturado.id, token);

        // Articulo Insumo
        let articulosInsumosArray = [];
        for (const item of newArticulosManufacturadosInsumos) {
            const id = item.articuloInsumoId;
            const newArticuloInsumo = await findArticuloInsumoById(id, token);

            articulosInsumosArray.push(newArticuloInsumo);
        };

        setArticuloManufacturado(newArticuloManufacturado);
        setArticulosManufacturadosInsumos(newArticulosManufacturadosInsumos);
        setArticulosInsumos(articulosInsumosArray);
    };

    return (
        <Container className='container-detalle'>
            <Row>
                <Col>
                    <img
                        src={articuloManufacturado?.imagen.imagenUrl}
                        alt={articuloManufacturado?.denominacion}
                        className="maxAltoImg"
                    />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <h1>
                                {articuloManufacturado?.denominacion}
                            </h1>
                        </Col>

                        <Col>
                            <h2>
                                <strong>
                                    ${articuloManufacturado?.articuloManufacturadoPrecioVenta.precioVenta} 
                                </strong>
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        {
                            articulosInsumos.length !== 0 &&
                            <>
                                <h4>Ingredientes</h4>
                                <ul className='lista-ingrediente'>
                                    {
                                        articulosInsumos?.map((item: ArticuloInsumo, index: number) =>
                                            <li key={index}>{item.denominacion}</li>
                                        )
                                    }
                                </ul>
                            </>
                        }
                    </Row>
                    <Row>
                        <Col>
                            <Link to={`/productos/all`}>
                                <Button variant='success'>
                                    Seguir Comprando
                                </Button>
                            </Link>
                        </Col>
                        <Col>
                        <Button
                            variant="primary"
                            onClick={() => {
                                if (articuloManufacturado) {
                                agregarAlCarrito(articuloManufacturado);
                                }
                            }}>
                            Agregar al carrito
                        </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}