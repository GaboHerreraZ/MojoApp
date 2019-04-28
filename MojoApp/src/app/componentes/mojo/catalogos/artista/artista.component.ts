import { AfterViewInit, ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Artista } from '../../../../modelos/ArtistaModel';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NuevoArtistaDialogComponent } from './nuevo-artista-dialog/nuevo-artista-dialog.component';
import { ComunesService } from '../../../../servicios/mojo/comunes/comunes.service';
import { ArtistaService } from '../../../../servicios/mojo/artista/artista.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  artistas: Array<Artista>;
  artistaSeleccionado: Artista;
  nuevoArtistaForm: FormGroup;
  paises: any[];
  generos: any[];

  constructor(private fb: FormBuilder, private servicios: ComunesService,
     private serviciosArtista: ArtistaService) {
    this.artistas = new Array<Artista>();
    this.artistaSeleccionado = new Artista();
  }

  public verDetalleArtista(artista: Artista) {
    this.artistaSeleccionado = artista;
    return;
  }

  public submitNuevoArtista() {
    if(this.nuevoArtistaForm.invalid) {
      for (let inner in this.nuevoArtistaForm.controls) {
          this.nuevoArtistaForm.get(inner).markAsTouched();
          this.nuevoArtistaForm.get(inner).updateValueAndValidity();
      }
      return;
    }

    const formValues = this.nuevoArtistaForm.value;

    this.serviciosArtista.addArtista(formValues).subscribe(result => {
      if(result instanceof Artista) {
        console.log(result);
        this.getArtistas();
      } else {
        // TODO: mostrar error
      }
    });
  }

  public getPaises() {
    this.servicios.getPaises().subscribe(paises => {
      this.paises = paises;
    });
  }

  public getGeneros() {
    this.servicios.getGeneros().subscribe(generos => {
      this.generos = generos;
    });
  }

  public getArtistas() {
    this.serviciosArtista.getArtistas().subscribe(artistas => {
      this.artistas = artistas;
      this.rerender();
    });
  }

  ngOnInit() {
    this.nuevoArtistaForm = this.fb.group({
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

  get nombres() {
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

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
