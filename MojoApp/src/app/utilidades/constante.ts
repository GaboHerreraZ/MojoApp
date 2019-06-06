import { Integer } from "aws-sdk/clients/athena";

/*Clase para manejar constantes de toda la aplicación */
export class Constante {


        /*Codigos HTTP */
        public static readonly ok: number = 200;
        public static readonly noOk: number = 500;

        /*Titulos  componentes */
        public static readonly tituloCatalogo: string = 'Mojo-Catalogo';
        public static readonly tituloAnalitica: string = 'Mojo-Analitica';
        public static readonly tituloArtista: string = 'Mojo-Artista';
        public static readonly tituloYoutube: string = 'Mojo-YouTube';
        public static readonly tituloIngesta: string = 'Mojo-Ingesta';
        public static readonly tituloIngresos: string = 'Mojo-Ingresos';
        public static readonly tituloLogin: string = 'Mojo-Login';

        /*Generales */
        public static readonly keyToken: string = "CognitoIdentityServiceProvider.4d99sedbpatihnuihthqa9cqvd.sm@mojo.com.ar.idToken";


        /* Nombres filtros pipe*/
        public static readonly artistaPipe: string = "filtroArtista";
        public static readonly albumPipe: string = "filtroAlbum";

        /* Canales */
        public static readonly Spotify: Integer = 4;
        public static readonly Youtube: Integer = 7;




}