import * as Yup from "yup";

export const validationSchemaRubro = () => {
    return Yup.object().shape({
        id: Yup.number()
            .integer()
            .min(0),
        denominacion: Yup.string()
            .required('La denominación es requerida')
            .trim(),
        bloqueado: Yup.boolean()
            .nullable(),
        esInsumo: Yup.boolean()
            .required('El tipo de Rubro es requerido'),
        rubroPadreId: Yup.number()
            .notOneOf([Yup.ref('id')], 'No se puede seleccionar el rubro actual como rubro principal')
            .min(0)
            .nullable(),
        rubroPadreDenominacion: Yup.string()
            .nullable()
    });
};