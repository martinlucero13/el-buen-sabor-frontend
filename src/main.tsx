import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './components/Auth0/AuthProvider';
import "./Index.css";

// Configuración de Auth0


// Recuperar el estado de autenticación almacenado en el localStorage
const storedAuthState = JSON.parse(localStorage.getItem("authState") || "{}");

// Establecer el estado inicial de autenticación
const initialAuthState = {
  isAuthenticated: storedAuthState.isAuthenticated || false,
  idToken: storedAuthState.idToken || "",
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>

      <App />

  </React.StrictMode>,
);
