import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Suspense, lazy, useState } from "react";
import { LockFill, Pen, UnlockFill } from "react-bootstrap-icons";

import { Rubro } from "../../../types/Rubro";
import { TipoModal } from "../../../types/TipoModal";
import { useModal } from "../../../hooks/useModal";
import { updateEstado } from "../../../services/BaseService";
import { Endpoint } from "../../../types/Endpoint";
const ModalRubro = lazy(() => import("./ModalRubro"));
const ModalConfirmacion = lazy(() => import("../../Modal/ModalConfirmacion"));

interface Props {
    rubro: Rubro;
    handleReload: () => void;
}

/**
 * Componente que representa un elemento de Rubro en la tabla.s
 */
function ItemRubro({ rubro, handleReload }: Props): JSX.Element {
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();
    const [tipoModal, setTipoModal] = useState<TipoModal>();

    const handleUpdateEstado = async () => {
        const token = await getAccessTokenSilently();

        await updateEstado<Rubro>(Endpoint.Rubro, rubro.id, token);
        handleReload();
        handleClose();
    };

    const changeTipoModal = (tipo: TipoModal) => {
        setTipoModal(tipo);
        handleClose();
    };

    return (
        <>
            <tr className={rubro.bloqueado ? 'table-td-block' : ''}>
                <td>
                    { rubro.denominacion }
                </td>

                <td>
                    { rubro.rubroPadreDenominacion }
                </td>

                <td>
                    { rubro.esInsumo ? 'Insumo' : 'Producto' }
                </td>

                <td>
                    { rubro.bloqueado ? 'Bloqueado' : 'Activo' }
                </td>

                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.Editar)} variant="outline-dark">
                        <Pen />
                    </Button>
                </td>

                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.CambiarEstado)} variant="outline-dark">
                        { rubro.bloqueado ? <UnlockFill /> : <LockFill /> }
                    </Button>
                </td>
            </tr>

            { 
                tipoModal === TipoModal.Editar
                ?
                <Suspense>
                    <ModalRubro 
                        showModal={showModal} 
                        handleClose={handleClose}
                        handleReload={handleReload} 
                        rubro={rubro} 
                    />
                </Suspense>
                :
                <Suspense>
                    <ModalConfirmacion
                        message={`¿Está seguro que desea ${rubro.bloqueado ? 'desbloquear' : 'bloquear'} el Rubro "${rubro.denominacion}"?`}
                        showModal={showModal}
                        onOk={handleUpdateEstado}
                        onCancel={handleClose}
                    />
                </Suspense>
            }
        </>
    );
}

export default ItemRubro;