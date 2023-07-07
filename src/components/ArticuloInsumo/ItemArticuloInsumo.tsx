import { Button } from "react-bootstrap";
import { useState } from "react";
import ModalCrearArticuloInsumo from './ModalCrearArticuloInsumo';
import ModalComprarArticuloInsumo from "./ModalComprarArticuloInsumo";

//Types
import { ArticuloInsumo } from '../../types/ArticuloInsumo';


function ItemArticuloInsumo(props: ArticuloInsumo): JSX.Element {

    const [modalComprar, setModalComprar] = useState(false);
    const [modalEditarComprar, setModalEditarCrear] = useState(false);

    const abrirModalComprar = () => {
        setModalComprar(true);
    };

    const cerrarModalComprar = () => {
        setModalComprar(false);
    };

    const abrirModalEditarCrear = () => {
        setModalEditarCrear(true);
    };

    const cerrarModalEditarCrear = () => {
        setModalEditarCrear(false);
    };

    let color = '';
    if (props.articuloInsumoStockActual.stockActual-props.articuloInsumoStockMinimo.stockMinimo  === 0) {
        color = '#F94144'; // Rojo
    } else if ((props.articuloInsumoStockActual.stockActual-props.articuloInsumoStockMinimo.stockMinimo) < 3 ) {
        color = '#F9C74F'; // Amarillo
    }
    // Estilos CSS según el color determinado
    const cellStyle: React.CSSProperties = {
      backgroundColor: color,
    };

    return(
        <>
            <tr style={cellStyle}>
                <td>
                    { props.denominacion }
                </td>

                <td>
                    {/* TODO: Mostrar Rubro */}
                    { props.rubro?.denominacion }
                </td>

                <td>
                    {/* TODO: Manejar tiempoEstimadoCocina como Date */}
                    ${ props.articuloInsumoPrecioCompra.monto }
                </td>

                <td>
                    { props.articuloInsumoStockMinimo.stockMinimo }
                </td>

                <td>
                    { props.articuloInsumoStockActual.stockActual }
                </td>

                <td>
                    { props.articuloInsumoStockActual.stockActual-props.articuloInsumoStockMinimo.stockMinimo }
                </td>

                <td>
                    { props.unidadMedida.denominacion}
                </td>

                <td>
                    {props.esInsumo ? 'Si' : 'No'}
                </td>


                <td>
                    {/* TODO: Implementar update */}
                    <Button onClick={abrirModalEditarCrear} variant="btn btn-outline-dark">
                        Editar
                    </Button>
                </td>

                <td>
                    {/* TODO: Implementar update */}
                    <Button onClick={abrirModalComprar} variant="btn btn-outline-dark">
                        Comprar
                    </Button>
                </td>

            </tr>

            <ModalCrearArticuloInsumo
                showModal={modalEditarComprar}
                handleClose={cerrarModalEditarCrear}
                articuloInsumo={props}
            />


            <ModalComprarArticuloInsumo
                showModal={modalComprar}
                handleClose={cerrarModalComprar}
                articuloInsumoStockActual={props.articuloInsumoStockActual}
            />

        </>
    );
}

export default ItemArticuloInsumo;