import { Route, Routes } from "react-router-dom";
import CarritoProvider from "../components/Context/CarritoContext";
import Home from "../components/Layout/Home/Home";
import NavBar from "../components/Layout/NavBar/NavBar";
import { DetalleArticuloManufacturado } from "../components/Usuario/ArticuloManufacturado/DetalleArticuloManufacturado";
import { ListArticuloManufacturado } from "../components/Usuario/ArticuloManufacturado/ListArticuloManufacturado";

import { ConfirmarPedido } from "../components/CarritoCompras/ConfirmarPedido";
import ListadoPedidoCarrito from '../components/CarritoCompras/ListaPedidosCarrito';
import DetallePedidoSN from "../components/CarritoCompras/DetallePedidoSN";
import { DatosPerfil } from "../components/Usuario/Perfil/DatosPerfil";


function UserRouter(): JSX.Element {
    return (
        <>
            <CarritoProvider>
                <NavBar />
                <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path="/productos/:termino" element={<ListArticuloManufacturado />} />
                    <Route path="/detalle/:id" element={<DetalleArticuloManufacturado />} />
                    <Route path="/perfil" element={<DatosPerfil />} />
                    <Route path="/carrito" element={<ListadoPedidoCarrito />} />
                    <Route path="/carrito/confirmarPedido" element={<ConfirmarPedido />} />
                    <Route path="/carrito/confirmarPedido/detallePedido" element={<DetallePedidoSN />} />
                </Routes>
            </CarritoProvider>
        </>
    );
}

export default UserRouter;