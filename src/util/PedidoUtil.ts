import { useState } from "react";
import { Pedido } from "../types/Pedido";

export function formatFecha(dateString: Date) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function useCountdown() {
    const [countdown, setCountdown] = useState(20);
    const [showCancelButton] = useState(false);

    function startCountdown() {
        if (showCancelButton) {
            const timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }

    return { countdown, startCountdown };
}

export function ordenarPedidosPorFechaDescendente(pedidos: Pedido[]) {
    return pedidos.slice().sort((a, b) => {
        const fechaA = new Date(a.fecha).getTime();
        const fechaB = new Date(b.fecha).getTime();
        return fechaB - fechaA;
    });
}

export function convertirTiempoASegundos(tiempo: string): number{
    const [hours, minutes, seconds] = tiempo.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

export function convertirMinutosATiempo(minutos: number): string{
    const hours = Math.floor(minutos / 60);
    const remainingMinutes = minutos % 60;
    const seconds = 0;
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};