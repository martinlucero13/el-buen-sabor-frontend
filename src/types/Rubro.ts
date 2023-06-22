export interface Rubro {
    id: number;
    denominacion: string;
    rubroPadreId?: number;
    rubroPadre?: Rubro;
}