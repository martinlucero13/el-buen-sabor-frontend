import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import {ArticuloManufacturado} from "../../types/ArticuloManufacturado";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { findAllRubro,findRubroById } from "../../services/RubroService";
import { findArticuloManufacturadoById, saveArticuloManufacturado, updateArticuloManufacturado } from "../../services/ArticuloManufacturadoService";
import { Rubro } from '../../types/Rubro';
import { useModal } from "../../hooks/useModal";
import { useAuth0 } from "@auth0/auth0-react";
import "./ArticuloManufacturadoAbm.css";
import ModalComprarArticuloInsumo from "../ArticuloInsumo/ModalCrearArticuloInsumo";


export const ArticuloManufacturadoAbm = () =>{
  const {idArticulo: idArticuloManufacturado} = useParams();
  const [rubros, setRubros] = useState<Array<Rubro>>([]);
  const { showModal, handleClose } = useModal();
  const [articuloManufacturado, setArticuloManufacturado] = useState<ArticuloManufacturado>();
  const { getAccessTokenSilently } = useAuth0();
  const currentPath = location.pathname;
  let modifiedPath = currentPath.replace(`/articulom/abm/${idArticuloManufacturado}`, '/articulom');

  
  //Traer todos los rubros de producto
  const fetchRubros = async () => {
    try {
      const token = await getAccessTokenSilently();
      const fetchedRubros = await findAllRubro(token)
      setRubros(fetchedRubros);
    } catch (error) {
      console.error('Error fetching rubros:', error);
    }
  };
  

  const getArticuloResto = async () => {

    if(idArticuloManufacturado !== "0"){
        const token = await getAccessTokenSilently();
        let dato:ArticuloManufacturado = await findArticuloManufacturadoById(Number(idArticuloManufacturado),token);
        setArticuloManufacturado(dato);
    }
    else{
      //Instanciamos ArticuloManufacturado
      const nuevoArticuloManufacturado: ArticuloManufacturado = {
        id: 0, 
        denominacion: '',
        descripcion: '',
        tiempoEstimadoCocina: '',
        articuloManufacturadoPrecioVenta: {
          id: 0,
          precioVenta: 0,
          fecha: new Date(), 
        },
        imagen: {
          id: 0,
          nombre: '',
          imagenUrl: '',
        },

      };
      setArticuloManufacturado(nuevoArticuloManufacturado);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setArticuloManufacturado((prevArticuloManufacturado) => {
      if (prevArticuloManufacturado) {
        return { ...prevArticuloManufacturado, [name]: value };
      }

    });
  };

  const handleInputChangePrecio = (event: React.ChangeEvent<HTMLInputElement>) => {

    
    const { value } = event.target;
      setArticuloManufacturado((prevArticuloManufacturado) => {
      if (prevArticuloManufacturado) {
        return {
          ...prevArticuloManufacturado,
          articuloManufacturadoPrecioVenta: {
            ...prevArticuloManufacturado.articuloManufacturadoPrecioVenta,
            precioVenta: parseFloat(value),
          },
        };
      }
    });
  }


  const handleRubroChange = async(event: React.ChangeEvent<HTMLSelectElement>) => {
    const rubroId = parseInt(event.target.value);
    if (rubroId !== 0) {

      try {
        const token = await getAccessTokenSilently();
        const rubro = await findRubroById(rubroId, token);
        setArticuloManufacturado((prevProductos) => {
          if (prevProductos) {
            return { ...prevProductos, rubro: { ...rubro } };
          }
        });
      } catch (error) {
        console.error('Error fetching rubro by ID:', error);
      }
    }
  };

  
  const handleModificarClick = async() => {
      //Formato para validar que cumpla el formato
      const tiempoEstimadoRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/;
      if (
          articuloManufacturado &&
          articuloManufacturado.denominacion &&
          tiempoEstimadoRegex.test(articuloManufacturado.tiempoEstimadoCocina) &&
          articuloManufacturado.articuloManufacturadoPrecioVenta.precioVenta &&
          articuloManufacturado.descripcion &&
          articuloManufacturado.imagen.nombre
      ) {
          const fechaActual = new Date(); // Obtener la fecha actual
          articuloManufacturado.articuloManufacturadoPrecioVenta.fecha = fechaActual;  //Asignamos la fecha
          const token = await getAccessTokenSilently();
          let idNuevoArticulo:number=0;
          if (idArticuloManufacturado === "0") {
            alert("save");
            idNuevoArticulo = await saveArticuloManufacturado(articuloManufacturado, token);
          } else {
            alert("update");
            await updateArticuloManufacturado(Number(idArticuloManufacturado), articuloManufacturado, token);
          }
          const confirmarSeguirEditando = window.confirm("¿Desea seguir editando?");
          if (!confirmarSeguirEditando) {
            window.location.href=(modifiedPath);
          }
          else{
            if(idNuevoArticulo!==0){
              modifiedPath = currentPath.replace(`/abm/${idArticuloManufacturado}`, `/abm/${idNuevoArticulo}`);
              window.location.href=(modifiedPath);
            }
          }
        } else {
          alert("Faltan campos requeridos");
      }
  };

  const navigate = useNavigate();
  
  const handleReceta = async() => {
  
    if(articuloManufacturado?.id!==0){
      modifiedPath = currentPath.replace(`/abm/${idArticuloManufacturado}`, `/abm/receta/${idArticuloManufacturado}`);
      navigate(modifiedPath);
    }
    else{
      alert("Debes crear el articulo manufacturado antes de acceder a su receta");
    }
    
  };  

  const handleImagenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setArticuloManufacturado((prevArticuloManufacturado) => {
          if (prevArticuloManufacturado) {
            return {
              ...prevArticuloManufacturado,
              imagen: {
                id: 0,
                nombre: file.name,
                imagenUrl: reader.result as string,
              },
            };
          }
          return prevArticuloManufacturado; 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchRubros();
    getArticuloResto();
  }, []);

    return(
        <>
            <Container fluid="md" id="articulo-manufacturado-abm-contenedor">
                
                <Row>
                    <Col></Col>
                    <Col id="titulo-articulo-manufacturado-abm"><h1>Producto</h1></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                        <label>Nombre</label>
                        <Form.Control id="articulo-manufacturado-abm-input" type="text" name="denominacion" value={articuloManufacturado?.denominacion} onChange={handleInputChange} />
                    </Col>
                    <Col>

                    </Col>
                    <Col>
                        <label>Tiempo Cocina</label>
                        <Form.Control
                          id="articulo-manufacturado-abm-input"
                          type="text"
                          name="tiempoEstimadoCocina"
                          value={articuloManufacturado?.tiempoEstimadoCocina}
                          onChange={handleInputChange}
                          placeholder="HH:mm:ss"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Rubro</label>
                        <Form.Select name="rubro" value={articuloManufacturado?.rubro?.id} onChange={handleRubroChange} id="articulo-manufacturado-abm-input">
                          <option value="0">Seleccione un rubro</option>
                          {rubros.map((rubro) => (
                            <option key={rubro.id} value={rubro.id}>
                              {rubro.denominacion}
                            </option>
                          ))}
                        </Form.Select>
                    </Col>
                    <Col></Col>
                    <Col>
                        <label>Precio Venta</label>
                        <Form.Control id="articulo-manufacturado-abm-input" type="number" name="articuloManufacturadoPrecioVenta" value={articuloManufacturado?.articuloManufacturadoPrecioVenta.precioVenta} onChange={handleInputChangePrecio} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Descripcion</label>
                        <Form.Control id="articulo-manufacturado-abm-input" type="text" name="descripcion" value={articuloManufacturado?.descripcion} onChange={handleInputChange}/>
                    </Col>
                    <Col></Col>
                    <Col>
                        <p></p>
                        <Button id="articulo-manufacturado-abm-boton-agregar-ingrediente" onClick={handleClose}>Agregar Articulo Insumo</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <label>Foto</label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        name="imagen"
                        onChange={handleImagenChange} 
                      />
                      {articuloManufacturado?.imagen?.nombre && (
                        <p>Archivo seleccionado: {articuloManufacturado.imagen.nombre}</p>
                      )}
                    </Col>  
                    <Col></Col>
                    <Col>
                        <p>Receta</p>
                        <Button onClick={handleReceta}>Crear/Modificar</Button>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col id="col-articulo-manufacturado-abm-botones"><Link to={modifiedPath}><Button className="articulo-manufacturado-abm-botones-cancelar-modificar">Cancelar</Button></Link><Button className="articulo-manufacturado-abm-botones-cancelar-modificar" onClick={handleModificarClick}>Modificar</Button></Col>
                    <Col></Col>
                </Row>                
            </Container>

            <ModalComprarArticuloInsumo
                showModal={showModal}
                handleClose={handleClose}
            />
        </>
    );
  
}