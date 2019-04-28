export class Artista {
    nombres: string;
    apellidos: string;
    afiliado: string;

    constructor(nombres: string, apellidos: string) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.afiliado = "Afiliado Ejemplo";
    }

    public nombreCompleto() {
        return this.nombres + " " + this.apellidos;
    }


}
