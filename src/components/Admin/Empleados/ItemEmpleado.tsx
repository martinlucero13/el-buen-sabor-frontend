import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Suspense, useState, lazy } from "react";
import { LockFill, Pen, UnlockFill } from "react-bootstrap-icons";

import { Cliente } from "../../../types/Cliente";
import { useModal } from "../../../hooks/useModal";
import { TipoModal } from "../../../types/TipoModal";
import { updateEstadoUsuario } from "../../../services/ClienteService";
import { updateEstadoAuth0Usuario } from "../../../services/Auth0Service";
const ModalEmpleado= lazy(() => import("./ModalEmpleado"));
const ModalConfirmacion = lazy(() => import("../../Modal/ModalConfirmacion"));

interface Props {
    empleado: Cliente;
    handleReload: () => void;
}

/**
 * elemento de Empleado en la tabla.
 */
function ItemEmpleado({ empleado, handleReload }: Props): JSX.Element {
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();
    const [tipoModal, setTipoModal] = useState<TipoModal>();

    const handleChangeEstado = async () => {
        const token = await getAccessTokenSilently();

        await updateEstadoAuth0Usuario(empleado.usuario.auth0Id, !empleado.usuario.bloqueado, token);
        await updateEstadoUsuario(empleado.id, token);

        handleReload();
        handleClose();
    };

    const changeTipoModal = (tipo: TipoModal) => {
        setTipoModal(tipo);
        handleClose();
    };

    return(
        <>
            <tr style={{ backgroundColor: empleado.usuario.bloqueado ? '#BFC5CA' : '' }}>
                <td>
                    { empleado.nombre } { empleado.apellido }
                </td>
                <td>
                    { empleado.usuario.email }
                </td>
                <td>
                    { empleado.telefono }
                </td>
                <td>
                    { empleado.domicilio.calle }, { empleado.domicilio.numero }, { empleado.domicilio.localidad.nombre }
                </td>
                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.Editar)} variant="outline-dark">
                        <Pen />
                    </Button>
                </td>
                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.CambiarEstado)} variant="outline-dark">
                        { empleado.usuario.bloqueado ? <UnlockFill /> : <LockFill /> }
                    </Button>
                </td>
            </tr>

            {
                tipoModal === TipoModal.Editar
                ?
                <Suspense>
                    <ModalEmpleado
                        showModal={showModal}
                        handleClose={handleClose}
                        handleReload={handleReload}
                        empleado={empleado}
                    />
                </Suspense>
                :
                <Suspense>
                    <ModalConfirmacion
                        message={`¿Está seguro que desea ${empleado.usuario.bloqueado ? 'desbloquear' : 'bloquear'} al Empleado "${empleado.nombre}"?`}
                        showModal={showModal}
                        onOk={handleChangeEstado}
                        onCancel={handleClose}
                    />
                </Suspense>
            }
        </>
    );
}

export default ItemEmpleado;