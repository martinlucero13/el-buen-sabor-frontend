import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PedidoProvider } from "../context/PedidoContext";

import Home from "../pages/Home/HomePage";
const Page404 = lazy(() => import("../pages/404/Page404"));
const MapPage = lazy(() => import("../pages/Informacion/MapPage"));
const MiPerfil = lazy(() => import("../pages/Usuario/MiPerfilPage"));
const EquipoPage = lazy(() => import("../pages/Informacion/EquipoPage"));
const OpinionesPage = lazy(() => import("../pages/Informacion/OpinionesPage"));
const InformacionPage = lazy(() => import("../pages/Informacion/InformacionPage"));
const DetalleCarrito = lazy(() => import("../components/Usuario/Cart/DetalleCarrito"));
const ListProducto = lazy(() => import("../components/Home/Productos/ListProducto"));
const DetalleProducto = lazy(() => import("../components/Home/Productos/DetalleProducto"));
const AuthenticationGuard = lazy(() => import("../components/Auth0/AuthenticationGuard"));
const PedidoForm = lazy(() => import("../components/Pedido/PedidoForm"));
const TablePedidosUsuario = lazy(() => import("../components/Usuario/Pedido/TablePedidosUsuario"));
const PedidoExitoso = lazy(() => import("../components/Pedido/PedidoExitoso"));
const PedidoEnvio = lazy(() => import("../components/Pedido/PedidoEnvio"));
const MercadoPagoPayment = lazy(() => import("../components/Pedido/MercadoPagoPayment"));


/**
 * Componente de enrutamiento para la sección de Usuario.
 * @returns Un elemento JSX que representa el enrutamiento de la sección de usuario.
 */
function UserRoutes(): JSX.Element {
    return (
        <PedidoProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos">
                    <Route path=":termino" element={<ListProducto />} />
                </Route>
                <Route path="/detalle-producto">
                    <Route path=":id" element={<DetalleProducto />} />
                </Route>
                <Route path="/carrito-detalle" element={<AuthenticationGuard component={DetalleCarrito} />} />
                <Route path="/mi-perfil" element={<AuthenticationGuard component={MiPerfil} />} />
                <Route path="/informacion/principal" element={<InformacionPage />} />
                <Route path="/informacion/ubicacion" element={<MapPage />} />
                <Route path="/informacion/opiniones" element={<OpinionesPage />} />
                <Route path="/informacion/equipo" element={<EquipoPage />} />
                <Route path="/pedido-form" element={<PedidoForm />} />
                <Route path="/pedido-detalle" element={<AuthenticationGuard component={PedidoEnvio} />} />
                <Route path="/post-pago" element={<AuthenticationGuard component={Home} />} />
                <Route path="/mis-pedidos">
                    <Route path=":id" element={<TablePedidosUsuario />} />
                </Route>
                <Route path="/pedido-exito" element={<AuthenticationGuard component={PedidoExitoso} />} />
                <Route path="/pedido-mp" element={<AuthenticationGuard component={MercadoPagoPayment} />} />
                <Route path="/*" element={<Page404 />} />
            </Routes>
        </PedidoProvider>


    );
}

export default UserRoutes;