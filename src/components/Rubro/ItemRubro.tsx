import { Button } from "react-bootstrap";
import ModalRubro from "./ModalRubro";

//Types
import { Rubro } from "../../types/Rubro";

//Hook
import { useModal } from "../../hooks/useModal";

function ItemRubro(props: Rubro): JSX.Element {
    const { showModal, handleClose } = useModal();

    return (
        <>
            <tr>
                <td>
                    {props.denominacion}
                </td>

                <td>
                    {/* TODO: Mostrar rubroPadre */}
                    {props.rubroPadre?.denominacion || "-"}
                </td>

                <td>
                    <Button onClick={() => handleClose()}>
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button className="btn btn-danger" onClick={() => handleClose()}>
                            <i className="bi bi-trash"></i>
                    </Button>
                </td>
            </tr>

            <ModalRubro
                showModal={showModal}
                handleClose={handleClose}
                rubro={props}
            />
        </>
    );
}

export default ItemRubro;