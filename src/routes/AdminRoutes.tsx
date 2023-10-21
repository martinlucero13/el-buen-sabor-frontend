import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import HeaderAdmin from "../components/Admin/Header/HeaderAdmin";
import ProductosRanking from "../components/Admin/Estadistica/ProductosRanking";
import MovMonetariosRanking from "../components/Admin/Estadistica/MovMonetariosRanking";


const Home = lazy(() => import("../components/Empleado/HomeEmpleado"));
const TableCliente = lazy(() => import("../components/Admin/Clientes/TableCliente"));
const TableEmpleado = lazy(() => import("../components/Admin/Empleados/TableEmpleado"));
const TableRubro = lazy(() => import("../components/Cocina/Rubro/TableRubro"));
const TableArticuloManufacturado = lazy(() => import("../components/Cocina/ArticuloManufacturado/TableArticuloManufacturado"));
const AMArticuloManufacturado = lazy(() => import("../components/Cocina/ArticuloManufacturado/AMArticuloManufacturado"));
const TableArticuloInsumo = lazy(() => import("../components/Cocina/ArticuloInsumo/TableArticuloInsumo"));
const AMArticuloInsumo = lazy(() => import("../components/Cocina/ArticuloInsumo/AMArticuloInsumo"));
const ClientesRanking = lazy(() => import("../components/Admin/Estadistica/ClientesRanking"));

/**
 * Componente de enrutamiento para la sección de Administrador.
 * @returns Un elemento JSX que representa el enrutamiento de la sección de Administrador.
 */
function AdminRoutes(): JSX.Element {
    return (
        <>
            <HeaderAdmin />
            <Routes>
                <Route path="/" element={<Home permission="admin" />} />
                <Route path="/usuarios/clientes" element={<TableCliente />} />
                <Route path="/usuarios/empleados" element={<TableEmpleado />} />
                <Route path="/rubros" element={<TableRubro />} />
                <Route path="/stock/productos" element={<TableArticuloManufacturado />} />
                <Route path="/stock/productos/form">
                    <Route path=":id" element={<AMArticuloManufacturado />} />
                </Route>
                <Route path="/stock/ingredientes" element={<TableArticuloInsumo />} />
                <Route path="/stock/ingredientes/form">
                    <Route path=":id" element={<AMArticuloInsumo />} />
                </Route>
                <Route path="/estadistica/clientes" element={<ClientesRanking />} />
                <Route path="/estadistica/productos" element={<ProductosRanking />} />
                <Route path="/estadistica/monetarios" element={<MovMonetariosRanking />} />
            </Routes>
        </>
    );
}

export default AdminRoutes;