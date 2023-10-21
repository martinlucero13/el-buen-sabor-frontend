import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Suspense, lazy, useState } from "react";
import { Eye, LockFill, Pen, UnlockFill } from "react-bootstrap-icons";

import { Endpoint } from "../../../types/Endpoint";
import { useModal } from "../../../hooks/useModal";
import { TipoModal } from "../../../types/TipoModal";
import { updateEstado } from "../../../services/BaseService";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
const ModalReceta = lazy(() => import("../../Cocinero/Receta/ModalReceta"));
const ModalConfirmacion = lazy(() => import("../../Modal/ModalConfirmacion"));

interface Props {
    articuloManufacturado: ArticuloManufacturado;
    handleReload: () => void;
}

/**
 * Componente que representa un Producto en la tabla.
 */
function ItemArticuloManufacturado({ articuloManufacturado, handleReload }: Props): JSX.Element {
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();
    const [tipoModal, setTipoModal] = useState<TipoModal>();

    const handleUpdateEstado = async () => {
        const token = await getAccessTokenSilently();

        await updateEstado<ArticuloManufacturado>(Endpoint.ArticuloManufacturado, articuloManufacturado.id, token);
        handleReset();
    };

    const handleReset = () => {
        handleClose();
        handleReload();
    };

    const changeTipoModal = (tipo: TipoModal) => {
        setTipoModal(tipo);
        handleClose();
    };

    return(
        <>
            <tr className={articuloManufacturado.bloqueado ? 'table-td-block' : ''}>
                <td>
                    { articuloManufacturado.denominacion }
                </td>

                <td>
                    { articuloManufacturado.rubro?.denominacion }
                </td>

                <td>
                    { articuloManufacturado.tiempoEstimadoCocina }
                </td>

                <td>
                    ${ articuloManufacturado.precioVenta }
                </td>

                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.Detalle)} variant="outline-dark">
                        <Eye />
                    </Button>
                </td>

                <td>
                    <NavLink
                        to={`/admin/stock/productos/form/${articuloManufacturado.id}`}
                        className="btn btn-outline-dark"
                    >
                        <Pen />
                    </NavLink>
                </td>

                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.CambiarEstado)} variant="outline-dark">
                        { articuloManufacturado.bloqueado ? <UnlockFill /> : <LockFill /> }
                    </Button>
                </td>
            </tr>

            {
                tipoModal === TipoModal.CambiarEstado ? (
                    <Suspense>
                        <ModalConfirmacion
                            message={`¿Está seguro que desea ${articuloManufacturado.bloqueado ? 'desbloquear' : 'bloquear'} el Producto "${articuloManufacturado.denominacion}"?`}
                            showModal={showModal}
                            onOk={handleUpdateEstado}
                            onCancel={handleClose}
                        />
                    </Suspense>
                ) : (
                    <Suspense>
                        <ModalReceta 
                            showModal={showModal}
                            handleClose={handleClose}
                            articuloManufacturado={articuloManufacturado}
                        />
                    </Suspense>
                )
            }
        </>
    );
}

export default ItemArticuloManufacturado;