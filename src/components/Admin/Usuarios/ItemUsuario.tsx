import { Button } from "react-bootstrap";
import { useModal } from "../../../hooks/useModal";

import ModalRegistro from "./ModalRegistro";
import { Cliente } from "../../../types/Cliente";

/**
 * Componente que representa un elemento de Cliente en la tabla.
 * @author Bulos 
 */
function ItemUsuario(props: Cliente): JSX.Element {
    const { showModal, handleClose } = useModal();

    // TODO: Implementar delete
    /*
    const handleDelete = (id: number) => {

    };*/

    return(
        <>
            <tr>
                <td>
                    { props.nombre }
                </td>
                <td>
                    { props.apellido }
                </td>
                <td>
                    { props.telefono }
                </td>
                <td>
                    { props.usuario.usuario }
                </td>
                <td>
                    { props.domicilio.calle }
                    &nbsp;
                    { props.domicilio.numero }
                </td>
                <td>
                    { props.domicilio.localidad.nombre }
                </td>
                <td>
                    <Button onClick={() => handleClose()} variant="warning">
                        Modificar
                    </Button>
                </td>
                <td>
                    {/* TODO: Implementar delete */}
                    <Button variant="danger">
                        Eliminar
                    </Button>
                </td>
            </tr>

            <ModalRegistro
                showModal={showModal}
                handleClose={handleClose}
                cliente={props}
            />
        </>
    );
}

export default ItemUsuario;