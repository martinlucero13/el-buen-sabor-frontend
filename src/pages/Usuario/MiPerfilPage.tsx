import { Col, Row } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { useCliente } from "../../hooks/useCliente";
import Panel from "../../components/Usuario/Perfil/Panel";
import MiPerfil from "../../components/Usuario/Perfil/MiPerfil";


function MiPerfilPage(): JSX.Element {
    const { user, logout } = useAuth0();
    const { cliente } = useCliente(undefined, user?.sub);

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

    return (
        <section>
            <Row className="py-3">
                <Col xs={12} sm={6} md={4} xl={3}>
                    <Panel
                        cliente={`${cliente.nombre} ${cliente.apellido}`}
                        handleLogout={handleLogout}
                    />
                </Col>
                <Col xs={12} sm={6} md={8} xl={9} className="mt-sm-0">
                    <MiPerfil
                        cliente={cliente}
                    />
                </Col>
            </Row>
        </section>
    );
}

export default MiPerfilPage;