import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import HeaderCocinero from "../components/Cocinero/Header/HeaderCocinero";
import AuthenticationGuard from "../components/Auth0/AuthenticationGuard";
import TablePedidosCocinero from "../components/Cocinero/Pedido/TablePedidosCocinero";
const Home = lazy(() => import("../components/Empleado/HomeEmpleado"));
const TableRubro = lazy(() => import("../components/Cocina/Rubro/TableRubro"));
const TableArticuloManufacturado = lazy(() => import("../components/Cocina/ArticuloManufacturado/TableArticuloManufacturado"));
const AMArticuloManufacturado = lazy(() => import("../components/Cocina/ArticuloManufacturado/AMArticuloManufacturado"));
const TableArticuloInsumo = lazy(() => import("../components/Cocina/ArticuloInsumo/TableArticuloInsumo"));
const AMArticuloInsumo = lazy(() => import("../components/Cocina/ArticuloInsumo/AMArticuloInsumo"));

/**
 * Componente de enrutamiento para la sección de Cocinero.
 * @returns Un elemento JSX que representa el enrutamiento de la sección de Cocinero.
 */
function CocineroRoutes(): JSX.Element {
    return (
        <>
            <HeaderCocinero />
            <Routes>
                <Route path="/" element={<Home permission="cocinero" />} />
                <Route path="/rubros" element={<TableRubro />} />
                <Route path="/stock/productos" element={<TableArticuloManufacturado />} />
                <Route path="/stock/productos/form">
                    <Route path=":id" element={<AMArticuloManufacturado />} />
                </Route>
                <Route path="/stock/ingredientes" element={<TableArticuloInsumo />} />
                <Route path="/stock/ingredientes/form">
                    <Route path=":id" element={<AMArticuloInsumo />} />
                </Route>
                <Route path="/pedidos" element={<AuthenticationGuard component={TablePedidosCocinero} />} />
            </Routes>
        </>
    );
}

export default CocineroRoutes;