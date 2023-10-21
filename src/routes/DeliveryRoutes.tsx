import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AuthenticationGuard from "../components/Auth0/AuthenticationGuard";
import TablePedidoDelivery from "../components/Delivery/TablePedidoDelivery";

const Home = lazy(() => import("../components/Empleado/HomeEmpleado"));

/**
 * Componente de enrutamiento para la sección de Delevery.
 * @returns Un elemento JSX que representa el enrutamiento de la sección de Delivery.
 */
function DeliveryRoutes(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home permission="delivery" />} />
            <Route path="/pedidos" element={<AuthenticationGuard component={TablePedidoDelivery} />} />
        </Routes>
    );
}

export default DeliveryRoutes;