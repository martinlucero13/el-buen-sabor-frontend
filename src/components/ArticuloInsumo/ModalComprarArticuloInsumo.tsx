import { saveArticuloInsumo,  updateArticuloInsumo } from "../../services/ArticuloInsumoService";
import { ArticuloInsumo } from '../../types/ArticuloInsumo';
import { useEffect,useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Modal, Button } from 'react-bootstrap';
import { ArticuloInsumoStockActual } from '../../types/ArticuloInsumoStockActual';


type Props = {
    showModal: boolean,
    handleClose: () => void,
    id?: Number
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
            values.stockActual
        ) {
            values.stockActual+=cantidad;
            values.fecha== new Date();
            const token = await getAccessTokenSilently();
            
            console.log("update")
            //await updateArticuloInsumo(values.id, values, token);
            
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
                            min={0}
                            value={cantidad}
                            onChange={handleCantidadChange}
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