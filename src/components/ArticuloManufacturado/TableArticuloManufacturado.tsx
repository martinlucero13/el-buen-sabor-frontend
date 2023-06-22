import "./ArticuloManufacturado.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Table } from "react-bootstrap";

import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import ItemArticuloManufacturado from "./ItemArticuloManufacturado";
import { findAllArticuloManufacturados } from "../../services/ArticuloManufacturadoService";
import { Link } from 'react-router-dom';

function TableArticuloManufacturado(): JSX.Element {
    const [articulosManufactuados, setArticulosManufacturados] = useState<ArticuloManufacturado[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllArticuloManufacturados();
    }, []);

    const getAllArticuloManufacturados = async () => {
        const token = await getAccessTokenSilently();
        const newArticulosManufactuados = await findAllArticuloManufacturados(token);
        setArticulosManufacturados(newArticulosManufactuados);
    };

    return(
        <>
            <Container className="d-flex mt-3">
                <h1>Articulos Manufacturados</h1>
                <Link to={"abm/0"}><Button variant="success">
                    Nuevo
                </Button></Link>
            </Container>
            
            <Container className="mt-3">
                <Table responsive bordered hover>
                    <thead className="thead-articulo-manufacturado">
                        <tr>
                            <th>Denominación</th>
                            <th>Rubro</th>
                            <th>Tiempo Preparación</th>
                            <th>Precio Venta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articulosManufactuados.map((item: ArticuloManufacturado, index: number) =>
                                <ItemArticuloManufacturado key={index} {...item} />
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default TableArticuloManufacturado;