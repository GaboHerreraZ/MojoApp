import { AfterViewInit, ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Artista } from '../../../../modelos/ArtistaModel';
import { Track } from '../../../../modelos/TrackModel';
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
  newTrack: Track;
  newAlbumTracks: Track[];
  trackTypes = ["Video", "Audio"];
  
  constructor(private fb: FormBuilder, private servicios: ComunesService,
    private serviciosArtista: ArtistaService, private serviciosAlbum: AlbumService) {
      this.artistas = new Array<Artista>();
      this.albunes = new Array<Album>();
      this.albumSeleccionado = new Album();
      this.newTrack = new Track();
      this.newAlbumTracks = new Array<Track>();
  }

  public verDetalleAlbum(album: Album) {
    this.albumSeleccionado = album;
    console.log(this.albumSeleccionado);
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

    this.serviciosAlbum.addAlbum(formValues, this.newAlbumTracks).subscribe(result => {
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
      const t = this;
      if(t.dtElement.dtInstance !== undefined){
        t.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          t.dtTrigger.next();
        });
      }
      
      console.log(this.albunes);
    });
  }

  public addToTrackList(){
    this.newTrack.isrc = this.nuevoAlbumForm.get('trackisrc').value;
    this.newTrack.nombre = this.nuevoAlbumForm.get('trackname').value;
    this.newTrack.tipo = this.nuevoAlbumForm.get('tracktipo').value;
    this.newTrack.id = this.newAlbumTracks.length + 1;
    if(this.newTrack.isValid()){
      this.newAlbumTracks.push(this.newTrack);
      this.newTrack = new Track();
    }
  }

  public deleteFromTrackList(id: number){
    
    const index = this.newAlbumTracks.findIndex(element => {
      return element.id == id;
    });
    if(index !== -1)
      this.newAlbumTracks.splice(index, 1);
    
  }

  public deleteFromTrackList2(id: number){
    const index = this.albumSeleccionado.tracks.findIndex(element => {
      return element.id == id;
    });
    if(index !== -1)
      this.albumSeleccionado.tracks.splice(index, 1);
  }

  public initEditarAlbumForm() {
    this.editarAlbumForm = this.fb.group({
      titulo2: [this.albumSeleccionado.titulo, Validators.required],
      artista2: [this.albumSeleccionado.artista, Validators.required],
      upc2: [this.albumSeleccionado.upc, Validators.required],
      trackname: [""],
      tracktipo: [""],
      trackisrc: [""],
    });
  }

  ngOnInit() {

    this.nuevoAlbumForm = this.fb.group({
      titulo: ["", Validators.required],
      artista: ["", Validators.required],
      upc: ["", Validators.required],
      trackname: [""],
      tracktipo: [""],
      trackisrc: [""],
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
    console.log("ngAfterViewInit");
    this.dtTrigger.next();

    const t = this;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
            that
              .search(this['value'])
              .draw();
        });
      });
    });
  }

  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
