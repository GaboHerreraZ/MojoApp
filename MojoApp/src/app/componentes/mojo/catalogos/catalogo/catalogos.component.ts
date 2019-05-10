import { AfterViewInit, ViewChild, Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Artista } from '../../../../modelos/ArtistaModel';
import { Track } from '../../../../modelos/TrackModel';
import { Album } from '../../../../modelos/AlbumModel';
import { Afiliado } from '../../../../modelos/AfiliadoModel';
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
  dtTrigger: Subject<any> = new Subject(); // Necesario para el datatables

  artistas: Array<Artista>;
  albunes: Array<Album>;
  albumSeleccionado: Album;
  nuevoAlbumForm: FormGroup;
  editarAlbumForm: FormGroup;
  showEditModal = true;
  showAddModal = true;
  newTrack: Track;
  newAfiliado: Afiliado;
  newAfiliado2: Afiliado;
  newTrack2: Track;
  newAlbumTracks: Track[];
  newAlbumAfiliados: Afiliado[];
  trackTypes = ["Video", "Audio"];
  
  constructor(
    private fb: FormBuilder,
    private servicios: ComunesService,
    private serviciosArtista: ArtistaService,
    private serviciosAlbum: AlbumService) {
      this.artistas = new Array<Artista>();
      this.albunes = new Array<Album>();
      this.albumSeleccionado = new Album(null,"","",new Artista(null, "", ""), "", null);
      this.newTrack = new Track();
      this.newAfiliado = new Afiliado();
      this.newAfiliado2 = new Afiliado();
      this.newTrack2 = new Track();
      this.newAlbumTracks = new Array<Track>();
      this.newAlbumAfiliados = new Array<Afiliado>();
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

  public eliminarAlbum(album: Album) {

    this.serviciosAlbum.deleteAlbum(album).subscribe(result => {
        if(result){
          this.getAlbunes();
        }else{
          console.log("Error al eliminar");
        }
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
    console.log(formValues);
    formValues["tracks"] = this.albumSeleccionado.tracks;
    formValues["afiliados"] = this.albumSeleccionado.afiliados;
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
     // this.artistas = artistas;
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

  public addToAfiliadosList(){
    this.newAfiliado.nombre = this.nuevoAlbumForm.get('afiliadonombre').value;
    this.newAfiliado.id = this.newAlbumAfiliados.length + 1;
    if(this.newAfiliado.isValid()){
      this.newAlbumAfiliados.push(this.newAfiliado);
      this.newAfiliado = new Afiliado();
    }
  }

  public addToTrackList2(){
    this.newTrack2.isrc = this.editarAlbumForm.get('trackisrc').value;
    this.newTrack2.nombre = this.editarAlbumForm.get('trackname').value;
    this.newTrack2.tipo = this.editarAlbumForm.get('tracktipo').value;
    this.newTrack2.id = this.albumSeleccionado.tracks.length + 1;
    if(this.newTrack2.isValid()){
      this.albumSeleccionado.tracks.push(this.newTrack2);
      this.newTrack2 = new Track();
    }
  }

  public addToAfiliadosList2(){
    this.newAfiliado2.nombre = this.editarAlbumForm.get('afiliadonombre').value;
    this.newAfiliado2.id = this.albumSeleccionado.tracks.length + 1;
    if(this.newAfiliado2.isValid()){
      this.albumSeleccionado.afiliados.push(this.newAfiliado2);
      this.newAfiliado2 = new Afiliado();
    }
  }

  public deleteFromTrackList(id: number){
    
    const index = this.newAlbumTracks.findIndex(element => {
      return element.id == id;
    });
    if(index !== -1)
      this.newAlbumTracks.splice(index, 1);
    
  }

  public deleteFromAfiliadosList(id: number){
    
    const index = this.newAlbumAfiliados.findIndex(element => {
      return element.id == id;
    });
    if(index !== -1)
      this.newAlbumAfiliados.splice(index, 1);
    
  }

  public deleteFromTrackList2(id: number){
    const index = this.albumSeleccionado.tracks.findIndex(element => {
      return element.id == id;
    });
    if(index !== -1)
      this.albumSeleccionado.tracks.splice(index, 1);
  }

  public deleteFromAfiliadosList2(id: number){
    const index = this.albumSeleccionado.afiliados.findIndex(element => {
      return element.id == id;
    });
    if(index !== -1)
      this.albumSeleccionado.afiliados.splice(index, 1);
  }

  public initEditarAlbumForm() {
    this.editarAlbumForm = this.fb.group({
      titulo2: [this.albumSeleccionado.titulo, Validators.required],
      artista2: [this.albumSeleccionado.artista, Validators.required],
      upc2: [this.albumSeleccionado.upc, Validators.required],
      id: [this.albumSeleccionado.id, Validators.required],
      afiliadonombre: [""],
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
      afiliadonombre: [""],
      trackname: [""],
      tracktipo: [""],
      trackisrc: [""],
    });
    this.initEditarAlbumForm();
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10
    };
    //this.getArtistas();
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
