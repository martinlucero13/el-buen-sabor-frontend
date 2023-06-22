import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import Home from "../../Layout/Home/Home";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { ItemArticuloManufacturado } from "./ItemArticuloManufacturado";
import { useArticulosManufacturados } from "../../../hooks/useArticulosManufacturados";

export function ListArticuloManufacturado() {
    const { termino } = useParams<string>();
    const { articulosManufacturados } = useArticulosManufacturados(termino);

    return (
        <>
            <Home />

            <Container fluid="md" className="mt-3" style={{ height: "100vh" }}>
                <Row>
                    {
                        articulosManufacturados.length !== 0
                            ?
                            (
                                articulosManufacturados.map((item: ArticuloManufacturado, index: number) =>
                                    <ItemArticuloManufacturado key={index}
                                        {...item}
                                    />
                                )
                            )
                            : (
                                <p>
                                    No se encontraron productos para la búsqueda "{termino}"
                                </p>
                            )}
                </Row>
            </Container>
        </>
    );
}
