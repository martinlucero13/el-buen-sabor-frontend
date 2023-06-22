import "./ArticuloManufacturadoReceta.css";
import { Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ArticuloInsumo } from '../../types/ArticuloInsumo';
import { findArticuloInsumoById } from "../../services/ArticuloInsumoService";

type ProductoParams = {
    idArticuloInsumo: number;
    idArticuloManufacturadoInsumo: number;
    cantidad?: number;
    borrarProducto: (idInsumo: number, idArticuloManufacturadoInsumo:number) => void;
}

function ItemArticuloInsumoReceta(props: ProductoParams): JSX.Element {

    const { getAccessTokenSilently } = useAuth0();
    const [articulosInsumosItems, setArticulosInsumosItems] = useState<ArticuloInsumo>();

    function borrarItemRecetaProducto() {
        const confirmarSeguirEditando = window.confirm("¿ Deseas borrar "+articulosInsumosItems?.denominacion+" de tu receta ?");
        if (confirmarSeguirEditando) {
            props.borrarProducto(Number(articulosInsumosItems?.id),Number(props.idArticuloManufacturadoInsumo));
        }
        
    }

    const traerItemsArticuloInsumo = async () => {

        const token = await getAccessTokenSilently();


        const newArticuloInsumo = await findArticuloInsumoById(Number(props.idArticuloInsumo), token);

          
        setArticulosInsumosItems(newArticuloInsumo);

    };

    useEffect(() => {

        traerItemsArticuloInsumo();

    }, []);



    return (
        <>
          <Card id="grid-articulo-manufacturado-receta">
            <Card.Text>{articulosInsumosItems?.denominacion}</Card.Text>
            <Card.Text>{props.cantidad}</Card.Text>
            <Card.Text>{articulosInsumosItems?.unidadMedida.denominacion}</Card.Text>
            <Button id="boton-item-receta-ingrediente" onClick={borrarItemRecetaProducto}><i className="bi bi-trash"></i></Button>
          </Card>
        </>
    );
}

export default ItemArticuloInsumoReceta;