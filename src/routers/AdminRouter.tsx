import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import HeaderAdmin from "../components/Layout/Admin/Header/HeaderAdmin";
import TableUsuario from "../components/Layout/Admin/Usuarios/TableUsuario";
import TableRubro from "../components/Rubro/TableRubro";
import TableArticuloManufacturado from "../components/ArticuloManufacturado/TableArticuloManufacturado";
import { ArticuloManufacturadoAbm } from '../components/ArticuloManufacturado/ArticuloManufacturadoAbm';
import ArticuloManufacturadoReceta from "../components/ArticuloManufacturado/ArticuloManufacturadoReceta";
import TableArticuloInsumo from "../components/ArticuloInsumo/TableArticuloInsumo";

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
            </Routes>
        </>
    );
}

export default AdminRouter;