import * as Yup from 'yup';

export const validationSchemaArticuloInsumo = () => {
    return Yup.object().shape({
        id: Yup.number()
            .integer()
            .min(0),
        denominacion: Yup.string()
            .required('La Denominación es requerida')
            .trim(),
        bloqueado: Yup.boolean()
            .nullable(),
        esInsumo: Yup.boolean()
            .required('¿Es un Insumo?'),
        unidadMedida: Yup.string()
            .required('La Unidad de Medida es requerida')
            .trim(),
        rubro: Yup.object().shape({
            id: Yup.number()
                .integer()
                .min(0),
            denominacion: Yup.string()
                .required('La denominación es requerida')
                .trim(),
            bloqueado: Yup.boolean()
                .nullable(),
            esInsumo: Yup.boolean()
                .nullable()
        }),
        precioCompra: Yup.number()
            .min(0)
            .positive('')
            .required('El Precio de Compra es requerido'),
        stockMinimo: Yup.number()
            .min(0)
            .positive('')
            .required('El Stock Mínimo es requerido'),
        stockActual: Yup.number()
            .min(0)
            .positive('')
            .required('El Stock Actual es requerido'),
    })
};