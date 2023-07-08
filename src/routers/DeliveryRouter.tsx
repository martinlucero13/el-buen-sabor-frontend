import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import ListadoPedidoDelivery from "../components/Pedido/ListadoPedidoDelivery";

function DeliveryRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <Routes>
                <Route path="/*" element={< ListadoPedidoDelivery/>} />
                <Route path="/pedidosdelivery" element={< ListadoPedidoDelivery/>} />
            </Routes>
        </>
    );
}

export default DeliveryRouter;