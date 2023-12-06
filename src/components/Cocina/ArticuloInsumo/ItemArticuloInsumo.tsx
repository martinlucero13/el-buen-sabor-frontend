import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Suspense, lazy, useState } from "react";
import { Pen, Shop, LockFill, UnlockFill } from "react-bootstrap-icons";

import { Endpoint } from "../../../types/Endpoint";
import { TipoModal } from "../../../types/TipoModal";
import { ArticuloInsumo } from "../../../types/ArticuloInsumo";
import { useModal } from "../../../hooks/useModal";
import { updateEstado } from "../../../services/BaseService";
const ModalCompra = lazy(() => import("./ModalCompra"));
const ModalConfirmacion = lazy(() => import("../../Modal/ModalConfirmacion"));

interface Props {
    articuloInsumo: ArticuloInsumo;
    handleReload: () => void;
}

/**
 * Componente que representa un Ingrediente en la lista.
 */
function ItemArticuloInsumo({ articuloInsumo, handleReload }: Props): JSX.Element {
    let className = '';
    const [tipoModal, setTipoModal] = useState<TipoModal>();
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();
    
    if (articuloInsumo.stockActual !== undefined && articuloInsumo.stockMinimo !== undefined) {
        const isStockDanger = articuloInsumo.stockActual <= articuloInsumo.stockMinimo;
        const isStockWarning = articuloInsumo.stockActual <= articuloInsumo.stockMinimo + (articuloInsumo.stockMinimo * 0.2) && !isStockDanger;

        className += articuloInsumo.bloqueado ? 'table-td-block' : '';
        className += isStockWarning ? 'table-td-warning' : '';
        className += isStockDanger ? 'table-td-danger' : '';
    }

    const handleUpdateEstado = async () => {
        const token = await getAccessTokenSilently();

        await updateEstado<ArticuloInsumo>(Endpoint.ArticuloInsumo, articuloInsumo.id, token);
        handleReset();
    };

    const handleModal = (tipo: TipoModal) => {
        setTipoModal(tipo);
        handleClose();
    };

    const handleReset = () => {
        handleClose();
        handleReload();
    };

    return (
        <>
            <tr className={className}>
                <td>
                    { articuloInsumo.denominacion }
                </td>
                
                <td>
                    { articuloInsumo.rubro?.denominacion }
                </td>
                
                <td>
                    ${ articuloInsumo.precioCompra }
                </td>
                
                <td>
                    { articuloInsumo.stockActual }
                </td>

                <td>
                    { articuloInsumo.stockMinimo }
                </td>
                
                <td>
                    { articuloInsumo.unidadMedida }
                </td>
                
                <td>
                    { articuloInsumo.bloqueado ? 'Bloqueado' : 'Activo' }
                </td>

                <td>
                    <NavLink
                        to={'/admin/stock/ingredientes/form/' + articuloInsumo.id}
                        className="btn btn-outline-dark"
                    >
                        <Pen />
                    </NavLink>
                </td>

                <td>
                    <Button onClick={() => handleModal(TipoModal.Editar)} variant="outline-dark">
                        <Shop />
                    </Button>
                </td>

                <td>
                    <Button onClick={() => handleModal(TipoModal.CambiarEstado)} variant="outline-dark">
                        { articuloInsumo.bloqueado ? <UnlockFill /> : <LockFill /> }
                    </Button>
                </td>
            </tr>

            {
                tipoModal === TipoModal.Editar
                ?
                <Suspense>
                    <ModalCompra
                        showModal={showModal}
                        handleClose={handleClose}
                        handleReload={handleReload}
                        articuloInsumo={articuloInsumo}
                    />
                </Suspense>
                :
                <Suspense>
                    <ModalConfirmacion
                        message={`¿Está seguro que desea ${articuloInsumo.bloqueado ? 'desbloquear' : 'bloquear'} el Ingrediente "${articuloInsumo.denominacion}"?`}
                        showModal={showModal}
                        onOk={handleUpdateEstado}
                        onCancel={handleClose}
                    />
                </Suspense>
            }
        </>
    );
}

export default ItemArticuloInsumo;