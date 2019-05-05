import { Track } from './TrackModel';

export class Album {
    id: number;
    titulo: string;
    artista: string;
    afiliados: any;
    tracks: Track[];
    upc: string;

    constructor(id?: number, titulo?: string, upc?: string, artista?: string, afiliados?: any, tracks?: Track[]) {
        this.titulo = titulo;
        this.id = id;
        this.artista = artista;
        this.afiliados = afiliados;
        this.tracks = tracks;
        this.upc = upc;
    }
}
