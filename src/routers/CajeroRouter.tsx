import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import ListadoPedido from "../components/Pedido/ListadoPedido";

function CajeroRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <Routes>
                <Route path="/*" element={< ListadoPedido/>} />
                <Route path="/pedidos" element={< ListadoPedido/>} />
            </Routes>
        </>
    );
}

export default CajeroRouter;