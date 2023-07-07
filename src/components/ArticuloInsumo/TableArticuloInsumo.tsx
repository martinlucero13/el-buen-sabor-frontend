import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Table } from "react-bootstrap";
import ModalCrearArticuloInsumo from "./ModalCrearArticuloInsumo";
import ItemArticuloInsumo from "./ItemArticuloInsumo";

//Types
import { ArticuloInsumo } from "../../types/ArticuloInsumo";

//Services
import { findAllArticuloInsumo } from "../../services/ArticuloInsumoService";

//Hook
import { useModal } from "../../hooks/useModal";


function TableArticuloInsumo(): JSX.Element {
    const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    const { showModal, handleClose } = useModal();

    useEffect(() => {
        getAllArticuloManufacturados();
    }, []);

    const getAllArticuloManufacturados = async () => {
        const token = await getAccessTokenSilently();
        const newArticulosManufactuados = await findAllArticuloInsumo(token);
        setArticulosInsumos(newArticulosManufactuados);
    };

    return(
        <>
            <Container className="d-flex mt-3">
                <h1>Articulos Insumos</h1>
                <Button variant="success" onClick={handleClose}>
                    Nuevo
                </Button>
            </Container>
            
            <Container className="mt-3">
                <Table responsive bordered hover>
                    <thead className="thead-articulo-manufacturado">
                        <tr>
                            <th>Nombre</th>
                            <th>Rubro</th>
                            <th>Costo</th>
                            <th>Stock Minimo</th>
                            <th>Stock Actual</th>
                            <th>Diferencia</th>
                            <th>Unidad Medida</th>
                            <th>Insumo</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articulosInsumos.map((item: ArticuloInsumo, index: number) =>
                                <ItemArticuloInsumo key={index} {...item} />
                            )
                        }
                    </tbody>
                </Table>
            </Container>
            <ModalCrearArticuloInsumo
                showModal={showModal}
                handleClose={handleClose}
            />

        </>
    );
}

export default TableArticuloInsumo;