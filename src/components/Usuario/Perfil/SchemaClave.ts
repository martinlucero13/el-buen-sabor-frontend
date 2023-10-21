import * as Yup from "yup";

export const validationSchemaClave= () => {
    return Yup.object().shape({
        clave: Yup.string()
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
            .trim(),
        confirmarClave: Yup.string()
            .required('Confimar Contraseña es requerida')
            .oneOf([Yup.ref('clave')], 'Las contraseñas deben coincidir')
    })
}