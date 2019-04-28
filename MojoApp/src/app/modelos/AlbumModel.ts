export class Album {
    id: number;
    titulo: string;
    artista: string;
    afiliados: any;
    tracks: any;
    upc: string;

    constructor(id?: number, titulo?: string, upc?: string, artista?: string, afiliados?: any, tracks?: any) {
        this.titulo = titulo;
        this.id = id;
        this.artista = artista;
        this.afiliados = afiliados;
        this.tracks = tracks;
        this.upc = upc;
    }
}
