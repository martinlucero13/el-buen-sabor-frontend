import React from "react";
import UserRouter from "./UserRouter";
import AdminRouter from "./AdminRouter";
import CajeroRouter from "./CajeroRouter";
import CocineroRouter from "./CocineroRouter";
import DeliveryRouter from "./DeliveryRouter";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function IndexRouter(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<UserRouter />} />
                <Route path="/admin/*" element={<AdminRouter />} />
                <Route path="/cajero/*" element={<CajeroRouter />} />
                <Route path="/cocinero/*" element={<CocineroRouter />} />
                <Route path="/delivery/*" element={<DeliveryRouter />} />
            </Routes>
        </BrowserRouter>
    );
}

export default IndexRouter;