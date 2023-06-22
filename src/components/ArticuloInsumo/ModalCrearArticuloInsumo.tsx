import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { Rubro } from "../../types/Rubro";
import { UnidadMedida } from '../../types/UnidadMedida';
import { useAlert } from "../../hooks/useAlert";
import { findAllRubro, findRubroById } from "../../services/RubroService";
import { findAllUnidadMedida, findUnidadMedidaById } from "../../services/UnidadMedidaService";
import { saveArticuloInsumo,  updateArticuloInsumo } from "../../services/ArticuloInsumoService";
import { ArticuloInsumo } from '../../types/ArticuloInsumo';


type Props = {
    showModal: boolean,
    handleClose: () => void,
    articuloInsumo?: ArticuloInsumo
}

function ModalCrearArticuloInsumo({ showModal, handleClose, articuloInsumo }: Props): JSX.Element {
    const [values, setValues] = useState<ArticuloInsumo>()

    const [rubros, setRubros] = useState<Rubro[]>([]);
    const [medidas, setMedidas] = useState<UnidadMedida[]>([]);
    const { showAlert, handleAlert } = useAlert();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getRubros();
        getUnidades();
        getArticuloResto();
    }, []);

    const getArticuloResto = () => {

        if(articuloInsumo){
          setValues(articuloInsumo);
        }
        else{
          //Instanciamos ArticuloInsumo
          const nuevoArticuloInsumo: ArticuloInsumo = {
            id: 0,
            denominacion: "",
            esInsumo: false,
            unidadMedida: {
                id: 0,
                denominacion: ""
            },
            articuloInsumoPrecioCompra: {
                id: 0,
                fecha: new Date(),
                monto: 0
            },
            articuloInsumoStockMinimo: {
                id: 0,
                stockMinimo: 0,
                fecha: new Date()
            },
            articuloInsumoStockActual: {
                id: 0,
                stockActual: 0,
                fecha: new Date()
            },
            rubro: {
                id: 0,
                denominacion: ""
            }
            }
          setValues(nuevoArticuloInsumo);
        }
      }

    const getRubros = async () => {
      const token = await getAccessTokenSilently();
      const newRubros: Rubro[] = await findAllRubro(token);

      setRubros(newRubros);
    };

    const getUnidades = async () => {
        const token = await getAccessTokenSilently();
        const newUnidades: UnidadMedida[] = await findAllUnidadMedida(token);

        setMedidas(newUnidades);
    };

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setValues((prevInsumo) => {
        if (prevInsumo) {
          return { ...prevInsumo, [name]: value };
        }
  
      });
    };

    const handleRubroChange = async(event: React.ChangeEvent<HTMLSelectElement>) => {
        const rubroId = parseInt(event.target.value);
        if (rubroId !== 0) {
    
          try {
            const token = await getAccessTokenSilently();
            const rubro = await findRubroById(rubroId, token);
            setValues((prevProductos) => {
              if (prevProductos) {
                return { ...prevProductos, rubro: { ...rubro } };
              }
            });
          } catch (error) {
            console.error('Error fetching rubro by ID:', error);
          }
        }
    };

    const handleUnidadMedidaChange = async(event: React.ChangeEvent<HTMLSelectElement>) => {
      const unidadId = parseInt(event.target.value);
      if (unidadId !== 0) {
  
        try {
          const token = await getAccessTokenSilently();
          const unidadMedida = await findUnidadMedidaById(unidadId, token);
          setValues((prevProductos) => {
            if (prevProductos) {
              return { ...prevProductos, unidadMedida: { ...unidadMedida } };
            }
          });
        } catch (error) {
          console.error('Error fetching unidad medida by ID:', error);
        }
      }
    };

    const handleInputChangePrecio = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = event.target;
        setValues((prevArticuloInsumo) => {
        if (prevArticuloInsumo) {
            return {
              ...prevArticuloInsumo,
              articuloInsumoPrecioCompra: {
                ...prevArticuloInsumo.articuloInsumoPrecioCompra,
                monto: parseFloat(value),
              },
            };
          }
        });
    }

    const handleStockActualChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = event.target;
            setValues((prevArticuloInsumo) => {
            if (prevArticuloInsumo) {
                return {
                ...prevArticuloInsumo,
                articuloInsumoStockActual: {
                    ...prevArticuloInsumo.articuloInsumoStockActual,
                    stockActual: parseFloat(value),
                },
                };
            }
        });
    }

    const handleStockMinimoChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = event.target;
        setValues((prevArticuloInsumo) => {
          if (prevArticuloInsumo) {
            return {
              ...prevArticuloInsumo,
              articuloInsumoStockMinimo: {
                ...prevArticuloInsumo.articuloInsumoStockMinimo,
                stockMinimo: parseFloat(value),
              },
            };
          }
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = event.target.value === '1';
      setValues((prevInsumo) => {
        if (prevInsumo) {
          return { ...prevInsumo, esInsumo: newValue };
        }  
      });
    };


    const handleSubmit = async () => {
          if (
            values &&
            values.denominacion &&
            values.articuloInsumoPrecioCompra.monto &&
            values.articuloInsumoStockMinimo.stockMinimo &&
            values.articuloInsumoStockActual.stockActual &&
            values.unidadMedida.denominacion &&
            values.rubro?.denominacion
          ) {
            const fechaActual = new Date();
            values.articuloInsumoPrecioCompra.fecha=fechaActual;
            values.articuloInsumoStockMinimo.fecha=fechaActual;
            values.articuloInsumoStockActual.fecha=fechaActual;
            const token = await getAccessTokenSilently();
            if (values.id === 0) {
              console.log("save");
              await saveArticuloInsumo(values, token);
            } else {
              console.log("update")
              await updateArticuloInsumo(values.id, values, token);
            }
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
                {articuloInsumo
                    ?
                    <Modal.Title className="text-center">Editar Articulo Insumo</Modal.Title>
                    :
                    <Modal.Title className="text-center">Nuevo Articulo Insumo</Modal.Title>
                }
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="denominacion">Denominación</Form.Label>
                        <Form.Control
                            type="text"
                            id="denominacion"
                            name="denominacion"
                            placeholder="Ingrese denominacion"
                            value={values?.denominacion || ""}
                            onChange={handleChangeInput}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="denominacion">Es Insumo ?</Form.Label>
                        <Form.Select
                          name="esInsumo"
                          value={values?.esInsumo ? '1' : '0'}
                          id="esInsumo"
                          onChange={handleChange}  
                        >
                          <option value="1">Sí</option>
                          <option value="0">No</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="Stock Minimo">Stock Mínimo</Form.Label>
                        <Form.Control
                            type="number"
                            id="articuloInsumoStockMinimo"
                            name="articuloInsumoStockMinimo"
                            placeholder="Ingrese stock mínimo"
                            min={0}
                            value={values?.articuloInsumoStockMinimo.stockMinimo || ""}
                            onChange={handleStockMinimoChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="Stock Actual">Stock Actual</Form.Label>
                        <Form.Control
                            type="number"
                            id="articuloInsumoStockActual"
                            name="articuloInsumoStockActual"
                            placeholder="Ingrese stock actual"
                            min={0}
                            value={values?.articuloInsumoStockActual.stockActual || ""}
                            onChange={handleStockActualChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="Precio Costo">Precio Costo</Form.Label>
                        <Form.Control
                            type="number"
                            id="articuloInsumoPrecioCompra"
                            name="articuloInsumoPrecioCompra"
                            placeholder="Ingrese precio costo"
                            min={0}
                            value={values?.articuloInsumoPrecioCompra.monto || ""}
                            onChange={handleInputChangePrecio}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="Unidad Medida">Unidad Medida</Form.Label>
                        <Form.Select name="unidadMedida" value={values?.unidadMedida.id} onChange={handleUnidadMedidaChange} id="unidadMedida">
                          <option value="0">Seleccione una unidad de medida</option>
                          {medidas.map((medida) => (
                            <option key={medida.id} value={medida.id}>
                              {medida.denominacion}
                            </option>
                          ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rubro Artículo</Form.Label>
                        <Form.Select name="rubro" value={values?.rubro?.id} onChange={handleRubroChange} id="rubro">
                          <option value="0">Seleccione un rubro</option>
                          {rubros.map((rubro) => (
                            <option key={rubro.id} value={rubro.id}>
                              {rubro.denominacion}
                            </option>
                          ))}
                        </Form.Select>
                    </Form.Group>
                </Form>
                <Alert show={showAlert} onClick={handleAlert} variant="danger" dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>Debe llenar todos los campos</p>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="danger buttons-modal-form">
                    Cerrar
                </Button>

                <Button onClick={handleSubmit} variant="success">
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalCrearArticuloInsumo;