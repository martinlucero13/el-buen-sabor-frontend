import { Button, Modal } from "react-bootstrap";

interface Props {
    message: string;
    showModal: boolean;
    onOk: () => void;
    onCancel: () => void;
}

/**
 *  ventana modal de confirmación.
 */
function ModalConfirmacion({ message, showModal, onOk, onCancel }: Props): JSX.Element {
    return(
        <Modal show={showModal} onHide={onCancel} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Confirmación
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{ message }</p> 
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onCancel} variant="dark" className="btn-cancel">
                    Cancelar
                </Button>

                <Button onClick={onOk} variant="dark" className="btn-ok">
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirmacion;