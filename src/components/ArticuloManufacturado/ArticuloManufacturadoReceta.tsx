import { useState, useEffect  } from "react";
import { Button, ListGroup, Form, Container } from "react-bootstrap";
import { useParams,useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import ItemArticuloInsumoReceta from "./ItemArticuloInsumoReceta";
import "./ArticuloManufacturadoReceta.css";

//Util
import {validateNumericInput} from '../../util/numerosUtil';

//types
import { ArticuloInsumo } from '../../types/ArticuloInsumo';
import { ArticuloManufacturadoInsumo } from '../../types/ArticuloManufacturadoInsumo';
import { Receta } from '../../types/Receta';

//Services
import { findArticuloInsumoById, findAllArticuloInsumo } from "../../services/ArticuloInsumoService";
import { findByArticuloManufacturadoId, saveReceta, updateReceta } from "../../services/RecetaService";
import { deleteArticuloManufacturadoInsumo, findByArticuloManufacturado, findArticuloManufacturadoInsumoById, saveArticuloManufacturadoInsumo, updateArticuloManufacturadoInsumo } from "../../services/ArticuloManufacturadoInsumoService";




export const ArticuloManufacturadoReceta = () =>{

    const { idArticulo: idArticuloManufacturado } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    
    const [receta, setReceta] = useState<Receta>();
    const [articulosManufacturadosInsumos, setArticulosManufacturadosInsumos] = useState<ArticuloManufacturadoInsumo[]>([]);
    const [articuloInsumoAll, setAllArticulosInsumos] = useState<ArticuloInsumo[]>([]);
    const [unidadMedida, setUnidadMedida] = useState("");
    const currentPath = location.pathname;
    const navigate = useNavigate();
    

    const getArticuloManufacturadoInsumo = async () => {
        const token = await getAccessTokenSilently();

        const newArticulosManufacturadosInsumos = await findByArticuloManufacturado(Number(idArticuloManufacturado), token);
        
        setArticulosManufacturadosInsumos(newArticulosManufacturadosInsumos);
    };

    const getReceta = async () => {
        const token = await getAccessTokenSilently();
      
        const recetaNueva = await findByArticuloManufacturadoId(Number(idArticuloManufacturado), token);
        setReceta(recetaNueva);
    
    };

    const getAllArticulosInsumos= async () => {
        const token = await getAccessTokenSilently();
        const newArticuloInsumo= await findAllArticuloInsumo(token);
        setAllArticulosInsumos(newArticuloInsumo);
    };

    useEffect(() => {
        getReceta();
        getArticuloManufacturadoInsumo();
        getAllArticulosInsumos();
      
    }, []);

    

    
    const handleCancelar= () => {
        let modifiedPath = currentPath.replace(`/abm/receta/${idArticuloManufacturado}`, `/abm/${idArticuloManufacturado}`);
        navigate(modifiedPath);
    }

    //Nos permite que al momento de seleccionar a un ingrediente en el formulario, este muestre la unidad medida correspodiente
    const handleOnChange = async(e: any) => {
        
        const { value } = e.target;
        if(value!=="0"){
            const token = await getAccessTokenSilently();
            const newArticuloInsumo = await findArticuloInsumoById(value, token);
            setUnidadMedida(newArticuloInsumo?.unidadMedida.denominacion);
        }
        else{
            setUnidadMedida("");
        }
    };

    //Para poder modificar al procedimiento de la receta
    const handleModificar= async() => {
        
        if(!receta?.descripcion|| articulosManufacturadosInsumos.length==0){
            alert("Minimo 1 ingrediente y debe existir el Procedimiento");
            return;
        }
        else{

            const token = await getAccessTokenSilently();

            articulosManufacturadosInsumos.map(async (element) => {
                //alert(element.cantidad);
                //alert(element.articuloInsumoId);
                //alert(element.articuloManufacturadoId);
                
                if(element.id===0){
                    alert("save");
                    await saveArticuloManufacturadoInsumo(element, token);
                }
                else{

                    const existingArticuloManufacturadoInsumo = await findArticuloManufacturadoInsumoById(
                        element.id,
                        token
                    );

                    if (
                        element.cantidad !== existingArticuloManufacturadoInsumo.cantidad
                    ) {
                        // Al menos un campo ha cambiado, realizar la actualización del ArticuloManufacturadoInsumo
                        alert("update manufacturado insumo");
                        await updateArticuloManufacturadoInsumo(element.id, element, token);
                     }
                }
            })    

            
            if(receta?.id===0){
                alert("save receta");
                
                await saveReceta(receta, token);
            }
            else if (receta?.id) {

                const existingReceta = await findByArticuloManufacturadoId(
                    Number(idArticuloManufacturado),
                    token
                );

                if (receta?.descripcion !== existingReceta.descripcion) {
                    alert("Actualizar receta");
                    await updateReceta(receta.id, receta, token);
                }
            }

        }     
    }

    const handleDescripcionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setReceta((prevReceta) => {
            if(prevReceta){
                return {
                    ...prevReceta,
                    descripcion: value,
                }
            }
        });
    };



    //Agrega Ingredientes-En caso de que ya existan los suma al ingrediente existente
    const handleAgregar = () => {
        const articuloInsumoId = (document.getElementsByName('articuloInsumoId')[0] as HTMLSelectElement).value;
        const cantidad = (document.getElementsByName('cantidad')[0] as HTMLInputElement).value;
  
        if (articuloInsumoId=="0" || !cantidad) {
            alert('Por favor, complete todos los campos');
            return;
        }
        
        const nuevoArticuloManufacturadoinsumo: ArticuloManufacturadoInsumo= {
            id: 0,
            articuloManufacturadoId: Number(idArticuloManufacturado),
            cantidad: parseInt(cantidad),
            articuloInsumoId: Number(articuloInsumoId),
        };

        const existingArticuloManufacturadoInsumoIndex = articulosManufacturadosInsumos.findIndex(
            (articulo) =>
              articulo.articuloInsumoId === nuevoArticuloManufacturadoinsumo.articuloInsumoId &&
              articulo.articuloManufacturadoId === nuevoArticuloManufacturadoinsumo.articuloManufacturadoId
        );
        alert(existingArticuloManufacturadoInsumoIndex);
        if (existingArticuloManufacturadoInsumoIndex !== -1) {
            // The ArticuloManufacturadoInsumo already exists, update its cantidad property
            const updatedArticulosManufacturadosInsumos = [...articulosManufacturadosInsumos];
            updatedArticulosManufacturadosInsumos[existingArticuloManufacturadoInsumoIndex].cantidad += parseInt(cantidad);
            setArticulosManufacturadosInsumos(updatedArticulosManufacturadosInsumos);
            alert('1');
        } else {
            // The ArticuloManufacturadoInsumo doesn't exist, add it to the array
            const updatedArticulosManufacturadosInsumos = [...articulosManufacturadosInsumos, nuevoArticuloManufacturadoinsumo];
            setArticulosManufacturadosInsumos(updatedArticulosManufacturadosInsumos);
            alert('2');
        }
       
    }

    //Borra el ingrediente de la lista
    async function borrarItemRecetaProducto(idInsumo: number, idArticuloManufacturadoInsumo: number) {
        const token = await getAccessTokenSilently();
        
        if (idArticuloManufacturadoInsumo !== 0) {
            alert("borrando");
            await deleteArticuloManufacturadoInsumo(idArticuloManufacturadoInsumo, token);
            window.location.reload();
        } else {
          const updatedArticulosManufacturadosInsumos = articulosManufacturadosInsumos.filter(element => element.articuloInsumoId !== idInsumo);
          setArticulosManufacturadosInsumos(updatedArticulosManufacturadosInsumos);
        }
    }

      
      
    return (
        <>
        <Container fluid="md" id="articulo-manufacturado-abm-contenedor">
            <Form id="grid-articulo-manufacturado-receta">
                    <Form.Group>
                        <Form.Label id="titulos-articulo-manufacturado-receta">Articulo Insumo</Form.Label>
                        <Form.Select name="articuloInsumoId" required id="input" onChange={handleOnChange}>
                            <option value="0"></option>
                            {articuloInsumoAll && articuloInsumoAll.map((element: ArticuloInsumo) => (
                            <option key={element.id} value={element.id}>
                                {element.denominacion}
                            </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label id="titulos-articulo-manufacturado-receta">Cantidad</Form.Label>
                        <Form.Control name="cantidad" type="number" id="input" required  min={1} step={1} onKeyDown={validateNumericInput}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label id="titulos-articulo-manufacturado-receta">Unidad de Medida</Form.Label>
                        <Form.Control name="unidadMedida" id="input" value={unidadMedida} disabled />
                    </Form.Group>
                    <Button id="button-agregar-articulo-manufacturado-receta" onClick={handleAgregar}>
                        Agregar
                    </Button>
            </Form>
            <Form>
                <ListGroup>
                    {articulosManufacturadosInsumos?.map((element) => {
    
                        return (
                            <ItemArticuloInsumoReceta
                                key={element.id}
                                idArticuloInsumo={element.articuloInsumoId}
                                idArticuloManufacturadoInsumo={element.id}
                                cantidad={element.cantidad}
                                borrarProducto={borrarItemRecetaProducto}
                            />
                        );
                    })}
                </ListGroup>
                {receta && (
                    <Form.Group>
                        <Form.Label id="titulos-articulo-manufacturado-receta">Procedimiento</Form.Label>
                        <Form.Control
                        value={receta.descripcion}
                        onChange={handleDescripcionChange}
                        name="descripcion"
                        id="procedimiento-articulo-manufacturado-receta"
                        as="textarea"
                        rows={5}
                        />
                    </Form.Group>
                )}
                <div className="d-flex justify-content-center">
                    <Button variant="dark" id="button" onClick={handleCancelar}>
                        Cancelar
                    </Button>
                    <Button variant="dark" id="button" onClick={handleModificar}>
                        Modificar Cambios
                    </Button>
                </div>
            </Form>
        </Container>
        </>

    );

}

export default ArticuloManufacturadoReceta;