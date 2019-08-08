import { state } from '@angular/animations';
/*Clase para manejar las Urls de comunicación con los servicios */
export class Operacion {

        /*URLs API */
        public static readonly URL: string = 'https://81g8l9l597.execute-api.us-east-1.amazonaws.com/';
        public static readonly URLGENERO: string = 'https://l9ex86gdm6.execute-api.us-east-1.amazonaws.com/';
        public static readonly URLPAIS: string = 'https://gpqgrg848i.execute-api.us-east-1.amazonaws.com/';
        public static readonly URLCANAL: string = 'https://5yka9z5me2.execute-api.us-east-1.amazonaws.com/';
        public static readonly URLACCOUNTING: string = 'https://tsyxcs4qll.execute-api.us-east-1.amazonaws.com/';
        public static readonly URLARTISTANALITYCS: string = 'https://p0dxtqghig.execute-api.us-east-1.amazonaws.com/';
        public static readonly URLEGRESOS: string = 'https://dcwrzwi2aa.execute-api.us-east-1.amazonaws.com/';


        /*Métodos API */
        public static readonly getArtistas: string = 'desa/artistas';
        public static readonly getGeneros: string = 'dev/generos';
        public static readonly getArtistasAfiliados: string = 'artistas/afiliado';
        public static readonly getPaises: string = 'dev/paises?pais=ar';
        public static readonly getCanales: string = 'dev/canales';

        /*Ingresos*/
        public static readonly estadoCuenta: string = 'dev/estadoCuenta';
        public static readonly ingresosPorPeriodo: string = 'dev/ingresosAfiliado';
        public static readonly detalleIngresoEnPeriodo: string = 'dev/detalleIngresosAfiliado';

        /*Artista-analítica*/
        public static readonly getOyentes: string = 'dev/oyentes';
        public static readonly getOyentesPais: string = 'dev/followersPais';
        public static readonly getSeguidores: string = 'dev/followers';

}