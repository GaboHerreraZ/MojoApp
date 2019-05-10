import { ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Artista } from '../../../../modelos/ArtistaModel';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ComunesService } from '../../../../servicios/mojo/comunes/comunes.service';
import { Subject } from 'rxjs';
import { AccessArtistaService } from 'src/app/servicios/mojo/artista/access.artista.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject(); // necesario para el datatables

  artistas:any[];
  artistaSeleccionado: Artista;
  nuevoArtistaForm: FormGroup;
  editarArtistaForm: FormGroup;
  paises: any[];
  generos: any[];

  constructor(  private _fb: FormBuilder, 
                private _servicios: ComunesService,
                private _serviciosArtista:AccessArtistaService ) {}



  ngOnInit() {

    this.nuevoArtistaForm = this._fb.group({
      pais: ["", Validators.required],
      nombres: ["", Validators.required],
      apellidos: ["", Validators.required],
      genero: ["", Validators.required],
      facebook: [""],
      spotify: [""],
      instagram: [""],
      youtube: [""]
    });
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
    };

    this.getPaises();
    this.getGeneros();
    this.getArtistas();

  }


  public verDetalleArtista(artista: Artista) {
    this.artistaSeleccionado = artista;
    return;
  }

  public getArtistas(){
      this._serviciosArtista.getAccessArtistas();
      this._serviciosArtista.getArtistas().subscribe((res:any)=>{
        console.log("componente",res);
      },(error)=>{

      });
  }

  public getPaises() {
    this._servicios.getPaises().subscribe(paises => {
      this.paises = paises;
    });
  }

  public getGeneros() {
    this._servicios.getGeneros().subscribe(generos => {
      this.generos = generos;
    });
  }

  

  
  /*get nombres() {
    return this.nuevoArtistaForm.get('nombres');
  }

  get apellidos() {
    return this.nuevoArtistaForm.get('apellidos');
  }

  get pais() {
    return this.nuevoArtistaForm.get('pais');
  }

  get genero() {
    return this.nuevoArtistaForm.get('genero');
  }
  
  las validaciones las hice directamente en el HTML, estos get son como listener, estan trabajando
  a toda hora.
  
  */

  
}
