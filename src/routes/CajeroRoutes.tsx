import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AuthenticationGuard from "../components/Auth0/AuthenticationGuard";

const TablePedidosCajero = lazy(() => import("../components/Cajero/TablePedidosCajero"));
const Home = lazy(() => import("../components/Empleado/HomeEmpleado"));
/**
 * Componente de enrutamiento para la sección de Cajero.
 * @returns Un elemento JSX que representa el enrutamiento de la sección de Cajero.
 */
function CajeroRoutes(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home permission="cajero" />} />
            <Route path="/pedidos" element={<AuthenticationGuard component={TablePedidosCajero} />} />
        </Routes>
    );
}

export default CajeroRoutes;