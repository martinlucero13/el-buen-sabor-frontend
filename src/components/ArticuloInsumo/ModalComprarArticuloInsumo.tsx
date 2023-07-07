import { useEffect,useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Modal, Button } from 'react-bootstrap';

//Types
import { ArticuloInsumoStockActual } from '../../types/ArticuloInsumoStockActual';

//Services
import { comprarArticuloInsumo } from "../../services/ArticuloInsumoStockActualService";

//Util
import {validateNumericInput} from '../../util/numerosUtil';


type Props = {
    showModal: boolean,
    handleClose: () => void,
    articuloInsumoStockActual?: ArticuloInsumoStockActual
}

function ModalComprarArticuloInsumo({ showModal, handleClose, articuloInsumoStockActual }: Props): JSX.Element {
    const [values, setValues] = useState<ArticuloInsumoStockActual>()
    const { getAccessTokenSilently } = useAuth0();
    const [cantidad, setCantidad] = useState<number>(0);


    useEffect(() => {
        getArticuloStockActualResto();
    }, []);

    const getArticuloStockActualResto = () => {

        if(articuloInsumoStockActual){
          setValues(articuloInsumoStockActual);
        }
        
    }

    const handleCantidadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setCantidad(parseInt(value, 10)); // Parsea el valor a número entero
    };

    
    const handleSubmit = async () => {
        if (
            values &&
            cantidad>0
        ) {
            values.stockActual+=cantidad;
            const fechaActual = new Date();
            values.fecha = fechaActual;
            alert(values.fecha);
            const token = await getAccessTokenSilently();
            
            console.log("update")
            await comprarArticuloInsumo(values.id, values, token);
            
            handleClose();
            window.location.reload();
        }
        else {
            alert("Faltan campos requeridos");
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>

                <Modal.Title className="text-center">Comprar Articulo Insumo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="Cantidad">Cantidad: {values?.stockActual}</Form.Label>
                        <Form.Control
                            type="number"
                            id="cantidad"
                            name="cantidad"
                            placeholder="Ingrese la cantidad"
                            min={1}
                            value={cantidad}
                            onChange={handleCantidadChange}
                            onKeyDown={validateNumericInput}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="danger buttons-modal-form">
                    Cerrar
                </Button>

                <Button onClick={handleSubmit} variant="success">
                    Comprar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComprarArticuloInsumo;