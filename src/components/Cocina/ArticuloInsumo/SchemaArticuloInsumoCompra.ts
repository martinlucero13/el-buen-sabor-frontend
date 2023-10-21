import * as Yup from 'yup';

export const validationSchemaArticuloInsumoCompra = () => {
    return Yup.object().shape({
        stockGanado: Yup.number()
            .min(1)
            .positive('')
            .required('El Stock es requerido'),
        precioCompra: Yup.number()
            .min(0)
            .positive('')
            .required('El Precio de Compra es requerido')
    })
};