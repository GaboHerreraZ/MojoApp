/*Clase para manejar las Urls de comunicación con los servicios */
export class Operacion{

        /*URLS API */        
        public static readonly URL:string = 'https://nc9zg4qil3.execute-api.us-east-1.amazonaws.com/';
        public static readonly URLGENERO:string = 'https://l9ex86gdm6.execute-api.us-east-1.amazonaws.com/';
        
        
        /*Métodos api */
        public static readonly getArtistas:string ='desa/artistas';
        public static readonly getGeneros:string = 'dev/generos';
        public static readonly getArtistasAfiliados:string = 'artistas/afiliado';
        



}