export class Track {
    id: number;
    nombre: string;
    tipo: string;
    isrc: string;

    constructor(id?: number, nombre?: string, isrc?: string, tipo?: string) {
        this.nombre = nombre;
        this.id = id;
        this.tipo = tipo;
        this.isrc = isrc;
    }

    public isValid(): boolean {
        return typeof this.nombre === 'string' && this.nombre.length > 0 && 
        typeof this.tipo === 'string' && this.tipo.length > 0 &&
        typeof this.isrc === 'string' && this.isrc.length > 0;
    }
}
