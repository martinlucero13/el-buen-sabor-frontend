import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import HeaderAdmin from "../components/Layout/Admin/Header/HeaderAdmin";
import TableUsuario from "../components/Layout/Admin/Usuarios/TableUsuario";
import TableRubro from "../components/Rubro/TableRubro";
import TableArticuloManufacturado from "../components/ArticuloManufacturado/TableArticuloManufacturado";
import { ArticuloManufacturadoAbm } from '../components/ArticuloManufacturado/ArticuloManufacturadoAbm';
import ArticuloManufacturadoReceta from "../components/ArticuloManufacturado/ArticuloManufacturadoReceta";
import TableArticuloInsumo from "../components/ArticuloInsumo/TableArticuloInsumo";
import ProductosRanking from "../components/Layout/Admin/Estadistica/ProductosRanking";
import MovMonetariosRanking from "../components/Layout/Admin/Estadistica/MovMonetariosRanking";
import { lazy } from "react";
const ClientesRanking = lazy(() => import("../components/Layout/Admin/Estadistica/ClientesRanking"));

function AdminRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <HeaderAdmin />
            <Routes>
                <Route path="/usuarios" element={<TableUsuario />} />
                <Route path="/rubros" element={<TableRubro />} />
                <Route path="/stock/articulom" element={<TableArticuloManufacturado />} />
                <Route path="/stock/articulom/abm/:idArticulo" element={<ArticuloManufacturadoAbm />} />
                <Route path="/stock/articulom/abm/receta/:idArticulo" element={<ArticuloManufacturadoReceta />} />
                <Route path="/stock/articuloi" element={<TableArticuloInsumo />} />
                <Route path="/estadistica/clientes" element={<ClientesRanking />} />
                <Route path="/estadistica/productos" element={<ProductosRanking />} />
                <Route path="/estadistica/monetarios" element={<MovMonetariosRanking />} />
            </Routes>
        </>
    );
}

export default AdminRouter;