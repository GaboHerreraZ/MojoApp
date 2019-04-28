import { AfterViewInit, ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Artista } from '../../../../modelos/ArtistaModel';
import { Album } from '../../../../modelos/AlbumModel';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ComunesService } from '../../../../servicios/mojo/comunes/comunes.service';
import { ArtistaService } from '../../../../servicios/mojo/artista/artista.service';
import { AlbumService } from '../../../../servicios/mojo/album/album.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  artistas: Array<Artista>;
  albunes: Array<Album>;
  albumSeleccionado: Album;
  nuevoAlbumForm: FormGroup;
  editarAlbumForm: FormGroup;
  showEditModal = true;
  showAddModal = true;
  
  constructor(private fb: FormBuilder, private servicios: ComunesService,
    private serviciosArtista: ArtistaService, private serviciosAlbum: AlbumService) {
      this.artistas = new Array<Artista>();
      this.albunes = new Array<Album>();
      this.albumSeleccionado = new Album();
  }

  public verDetalleAlbum(album: Album) {
    this.albumSeleccionado = album;
    return;
  }

  public editarAlbum(album: Album) {
    this.albumSeleccionado = album;
    this.initEditarAlbumForm();
    this.validarForm(this.editarAlbumForm);
    return;
  }

  public showEliminarDialog(album: Album) {
    console.log("showEliminarDialog");
    this.albumSeleccionado = album;
    const opts = {
      type: "confirm",
      titulo: "Confirmación",
      mensaje: "Está seguro de eliminar este album? Esta acción no podrá ser deshecha.",
      showPositiveButton: true,
      showNegativeButton: true,
      negativeButtonText: "No, déjalo allí",
      positiveButtonText: "Sí, quiero eliminarlo"
    };
    const that = this;
    this.servicios.confirm(opts, function() {
      //ACTION: Do this If user says YES 
      console.log("eliminando");
      that.serviciosAlbum.deleteAlbum(that.albumSeleccionado).subscribe(result => {
        if(result){
          that.getAlbunes();
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

  public submitNuevoAlbum() {
    console.log("submitNuevoAlbum");
    
    if(!this.validarForm(this.nuevoAlbumForm))
      return;

    const formValues = this.nuevoAlbumForm.value;

    this.serviciosAlbum.addAlbum(formValues).subscribe(result => {
      if (result instanceof Album) {
        console.log("el resultado es un album");
        console.log(result);
        this.getAlbunes();
        //this.showAddModal = false;
      } else {
        // TODO: mostrar error
        console.log("Error al guardar");
      }
    });
  }

  public submitEditarAlbum() {
    console.log("submitEditarAlbum");
    if(!this.validarForm(this.editarAlbumForm)) {
      console.log("formulario invalido");
      return;
    }

    const formValues = this.editarAlbumForm.value;

    this.serviciosAlbum.editAlbum(formValues).subscribe(result => {
      if (result instanceof Album) {
        console.log("el resultado es un album");
        console.log(result);
        this.getAlbunes();
      } else {
        // TODO: mostrar error
        console.log("Error al editar");
      }
    });
  }

  public getArtistas() {
    this.serviciosArtista.getArtistas().subscribe(artistas => {
      this.artistas = artistas;
    });
  }

  public getAlbunes() {
    this.serviciosAlbum.getAlbunes().subscribe(albunes => {
      console.log("getAlbunes");
      this.albunes = albunes;
      console.log(this.albunes);
      this.rerender();
    });
  }

  public initEditarAlbumForm() {
    this.editarAlbumForm = this.fb.group({
      titulo2: [this.albumSeleccionado.titulo, Validators.required],
      artista2: [this.albumSeleccionado.artista, Validators.required],
      upc2: [this.albumSeleccionado.upc, Validators.required]
    });
  }

  ngOnInit() {

    this.nuevoAlbumForm = this.fb.group({
      titulo: ["", Validators.required],
      artista: ["", Validators.required],
      upc: ["", Validators.required]
    });
    /*this.editarAlbumForm = this.fb.group({
      titulo2: ["", Validators.required],
      artista2: ["", Validators.required],
      upc2: ["", Validators.required]
    });*/
    this.initEditarAlbumForm();
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
    };
    this.getArtistas();
    this.getAlbunes();
  }

  get titulo() {
    return this.nuevoAlbumForm.get('titulo');
  }

  get artista() {
    return this.nuevoAlbumForm.get('artista');
  }

  get upc() {
    return this.nuevoAlbumForm.get('upc');
  }

  get titulo2() {
    return this.editarAlbumForm.get('titulo2');
  }

  get artista2() {
    return this.editarAlbumForm.get('artista2');
  }

  get upc2() {
    return this.editarAlbumForm.get('upc2');
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    if(this.dtElement.dtInstance === undefined)
      return;
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
