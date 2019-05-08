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
  editarArtistaForm: FormGroup;
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

  public showEliminarDialog(artista: Artista) {
    console.log("showEliminarDialog");
    this.artistaSeleccionado = artista;
    console.log(this.artistaSeleccionado);
    const opts = {
      type: "confirm",
      titulo: "Confirmación",
      mensaje: "Está seguro de eliminar este artista? Esta acción no podrá ser deshecha.",
      showPositiveButton: true,
      showNegativeButton: true,
      negativeButtonText: "No, déjalo allí",
      positiveButtonText: "Sí, quiero eliminarlo"
    };
    const that = this;
    this.servicios.confirm(opts, function() {
      //ACTION: Do this If user says YES 
      console.log("eliminando");
      that.serviciosArtista.deleteArtista(that.artistaSeleccionado).subscribe(result => {
        if(result){
          that.getArtistas();
        }else{
          console.log("Error al eliminar");
        }
      });
     }, function() {
      //ACTION: Do this if user says NO 
      console.log("saliendo");
     });

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

  public editarArtista(artista: Artista) {
    this.artistaSeleccionado = artista;
    this.initEditarArtistaForm();
    this.validarForm(this.editarArtistaForm);
    return;
  }

  public submitEditarArtista() {
    console.log("submitEditarArtista");
    if(!this.validarForm(this.editarArtistaForm)) {
      console.log("formulario invalido");
      return;
    }

    const formValues = this.editarArtistaForm.value;
    console.log(formValues);
    const newArtista = new Artista();
    newArtista.nombres = formValues.nombres;
    newArtista.apellidos = formValues.apellidos;
    newArtista.pais = formValues.pais;
    newArtista.afiliado = this.artistaSeleccionado.afiliado;
    newArtista.genero = formValues.genero;
    newArtista.spotify = formValues.spotify;
    newArtista.youtube = formValues.youtube;
    newArtista.facebook = formValues.facebook;
    newArtista.instagram = formValues.facebook;
    newArtista.id = formValues.id;
    this.serviciosArtista.editArtista(newArtista).subscribe(result => {
      if (result instanceof Artista) {
        console.log("el resultado es un artista");
        console.log(result);
        this.getArtistas();
      } else {
        // TODO: mostrar error
        console.log("Error al editar");
      }
    });
  }

  public validarForm(form: FormGroup): boolean {
    console.log("validarForm");
    console.log(form.value);
    let valid = false;
    if(form.invalid) {
      console.log("formulario invalido");
    }else{
      console.log("formulario valido");
    }
    for (const inner in form.controls) {
        form.get(inner).markAsTouched();
        form.get(inner).updateValueAndValidity();
    }

    return form.valid;
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

  public initEditarArtistaForm(){
    this.editarArtistaForm = this.fb.group({
      pais: [this.artistaSeleccionado.pais, Validators.required],
      nombres: [this.artistaSeleccionado.nombres, Validators.required],
      apellidos: [this.artistaSeleccionado.apellidos, Validators.required],
      genero: [this.artistaSeleccionado.genero, Validators.required],
      facebook: [this.artistaSeleccionado.facebook],
      spotify: [this.artistaSeleccionado.spotify],
      instagram: [this.artistaSeleccionado.instagram],
      youtube: [this.artistaSeleccionado.youtube],
      id: [this.artistaSeleccionado.id]
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
    this.initEditarArtistaForm();
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
    if (this.dtElement.dtInstance !== undefined){
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }
  }

  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
