import { Button } from "react-bootstrap";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { useNavigate } from 'react-router-dom';

function ItemArticuloManufacturado(props: ArticuloManufacturado): JSX.Element {

    const navigate = useNavigate();

    function handleButtonClick() {
        navigate(`abm/${props.id}`);
    }

    return(
        <>
            <tr>
                <td>
                    { props.denominacion }
                </td>

                <td>
                    {props.rubro?.denominacion}
                </td>

                <td>
                    { props.tiempoEstimadoCocina }
                </td>

                <td>
                    ${ props.articuloManufacturadoPrecioVenta.precioVenta }
                </td>

                <td>
                    {/* TODO: Implementar update */}
                    <Button variant="warning"  onClick={handleButtonClick}>
                        Editar
                    </Button>
                    
                </td>

            </tr>
        </>
    );
}

export default ItemArticuloManufacturado;