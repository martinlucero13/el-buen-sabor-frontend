import { withAuthenticationRequired } from "@auth0/auth0-react";

import Loader from "../Layout/Loader/Loader";

interface Props {
    component: React.ComponentType<object>;
}

/**
 * Componente que se mostrará si el usuario está autenticado.
 */
function AuthenticationGuard({ component }: Props): JSX.Element {
    const Component = withAuthenticationRequired(
        component, {
            onRedirecting: () => (
                <Loader message="Redireccionando..." />
            )
        }
    )
    
    return <Component />;
}

export default AuthenticationGuard;