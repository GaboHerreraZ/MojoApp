export class Afiliado {
    id: number;
    nombre: string;

    constructor(id?: number, nombre?: string) {
        this.nombre = nombre;
        this.id = id;
    }

    public isValid(): boolean {
        return typeof this.nombre === 'string' && this.nombre.length > 0;
    }
}
