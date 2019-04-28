export class Artista {
    id: number;
    nombres: string;
    apellidos: string;
    afiliado: string;
    genero: string;
    pais: string;
    spotify: string;
    youtube: string;
    facebook: string;
    instagram: string;

    constructor(id?: number, nombres?: string, apellidos?: string) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.afiliado = "Afiliado Ejemplo " + id;
        this.pais = '';
        this.spotify = '';
        this.youtube = '';
        this.facebook = '';
        this.instagram = '';
        this.genero = '';
    }

    public nombreCompleto() {
        return this.nombres + " " + this.apellidos;
    }


}
