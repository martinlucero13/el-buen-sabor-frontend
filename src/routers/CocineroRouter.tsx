import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import HeaderCocinero from "../components/Layout/Cocinero/Header/HeaderCocinero";
import TableRubro from "../components/Rubro/TableRubro";
import TableArticuloManufacturado from "../components/ArticuloManufacturado/TableArticuloManufacturado";
import { ArticuloManufacturadoAbm } from '../components/ArticuloManufacturado/ArticuloManufacturadoAbm';
import ArticuloManufacturadoReceta from "../components/ArticuloManufacturado/ArticuloManufacturadoReceta";
import TableArticuloInsumo from '../components/ArticuloInsumo/TableArticuloInsumo';
import ListadoPedidoCocinero from "../components/Pedido/Cocinero/ListadoPedidoCocinero";

function CocineroRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <HeaderCocinero />
            <Routes>
                <Route path="/rubros" element={<TableRubro />} />
                <Route path="/pedidos" element={< ListadoPedidoCocinero/>} />
                <Route path="/stock/articulom" element={<TableArticuloManufacturado />} />
                <Route path="/stock/articulom/abm/:idArticulo" element={<ArticuloManufacturadoAbm />} />
                <Route path="/stock/articulom/abm/receta/:idArticulo" element={<ArticuloManufacturadoReceta />} />
                <Route path="/stock/articuloi" element={<TableArticuloInsumo />} />
            </Routes>
        </>
    );
}

export default CocineroRouter;