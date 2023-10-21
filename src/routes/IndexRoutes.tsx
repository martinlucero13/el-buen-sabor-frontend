import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import CajeroRoutes from "./CajeroRoutes";
import CocineroRoutes from "./CocineroRoutes";
import DeliveryRoutes from "./DeliveryRoutes";

import { CarritoProvider } from "../context/CarritoContext";
import { PermissionProvider } from "../context/PermissionContext";

import Header from "../components/Layout/Header/Header";
import AuthenticationGuard from "../components/Auth0/AuthenticationGuard";

const Page401 = lazy(() => import("../pages/401/Page401"));
const PageCallback = lazy(() => import("../pages/Callback/CallbackPage"));
const Registro = lazy(() => import("../components/Usuario/Registro/Registro"));

/**
 * Componente de enrutamiento principal para la aplicación.
 * @returns Un elemento JSX que representa el enrutamiento principal de la aplicación.
 */
function IndexRoutes(): JSX.Element {
    return (
        <PermissionProvider>
            <CarritoProvider>
                <Header />
                <Suspense>
                    <Routes>
                        <Route path="/*" element={<UserRoutes />} />
                        <Route path="/admin/*" element={<AuthenticationGuard component={AdminRoutes} />} />
                        <Route path="/cajero/*" element={<AuthenticationGuard component={CajeroRoutes} />} />
                        <Route path="/cocinero/*" element={<AuthenticationGuard component={CocineroRoutes} />} />
                        <Route path="/delivery/*" element={<AuthenticationGuard component={DeliveryRoutes} />} />
                        <Route path="/registro" element={<AuthenticationGuard component={Registro} />} />
                        <Route path="/callback" element={<PageCallback />} />
                        <Route path="/unauthorized" element={<Page401 />} />
                    </Routes>
                </Suspense >
            </CarritoProvider>
        </PermissionProvider>
    );
}

export default IndexRoutes;