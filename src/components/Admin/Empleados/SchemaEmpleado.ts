import * as Yup from "yup";

export const validationSchemaEmpleado = (id: number) => {
    return Yup.object().shape({
        id: Yup.number()
            .integer()
            .min(0),
        nombre: Yup.string()
            .required('El Nombre es requerido')
            .trim(),
        apellido: Yup.string()
            .required('El Apellido es requerido')
            .trim(),
        telefono: Yup.number()
            .required('El Teléfono es requerido')
            .test('len', 'El Teléfono debe contener 10 digitos', val => val.toString().length === 10),

        usuario: Yup.object().shape({
            id: Yup.number()
                .integer()
                .min(0),
            auth0Id: Yup.string(),
            email: Yup.string()
                .email('Ingrese un correo electrónico válido')
                .required('El Email es requerido')
                .trim(),
            bloqueado: Yup.boolean(),
            clave: id === 0 
                ? Yup.string()
                    .required('La contraseña es requerida')
                    .min(8, 'Debe tener al menos 8 caracteres')
                    .matches(/(?=.*[a-z])/g, 'Debe contener al menos una letra minúscula (a-z)')
                    .matches(/(?=.*[A-Z])/g, 'Debe contener al menos una letra mayúscula (A-Z)')
                    .matches(/(?=.*\d)/g, 'Debe contener al menos un número (0-9)')
                    .matches(/(?=.*[!@#$%^&*])/g, 'Debe contener al menos un carácter especial (como !@#$%^&)')
                    .test('passwordComplexity', 'Debe contener al menos 3 de los siguientes 4 tipos de caracteres', (val) => {
                        if (!val) return false;
                        const counts = [/[a-z]/, /[A-Z]/, /\d/, /[!@#$%^&*]/].map((regex) => regex.test(val)).filter((match) => match).length;
                        return counts >= 3;
                    })
                    .trim()
                : Yup.string().nullable().notRequired(),
            confirmarClave: id === 0 
                ? Yup.string()
                    .required('Confimar Contraseña es requerida')
                    .oneOf([Yup.ref('clave')], 'Las contraseñas deben coincidir')
                : Yup.string().nullable().notRequired(),
            rol: Yup.object().shape({
                id: Yup.number(),
                auth0RolId: Yup.string()
                    .required(),
                denominacion: Yup.string()
                    .required('El Rol es requerido')
                    .trim()
            })
        }),

        domicilio: Yup.object().shape({
            id: Yup.number()
                .integer()
                .min(0),
            calle: Yup.string()
                .required('La Calle es requerida')
                .trim(),
            numero: Yup.number()
                .required('El Número es requerido')
                .min(0),
            localidad: Yup.object().shape({
                id: Yup.number()
                    .integer()
                    .min(0),
                nombre: Yup.string()
                    .required('La Localidad es requerida')
                    .trim()
            })
        })
    })
};