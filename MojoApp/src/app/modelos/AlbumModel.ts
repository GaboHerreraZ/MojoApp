import { Track } from './TrackModel';
import { Artista } from './ArtistaModel';
import { Afiliado } from './AfiliadoModel';

export class Album {
    id: number;
    titulo: string;
    artista: Artista;
    afiliados: Afiliado[];
    tracks: Track[];
    upc: string;

    constructor(id?: number, titulo?: string, upc?: string, artista?: Artista, afiliados?: any, tracks?: Track[]) {
        this.titulo = titulo;
        this.id = id;
        this.artista = artista;
        this.afiliados = new Array<Afiliado>();
        this.tracks = new Array<Track>();
        this.upc = upc;
    }
}
