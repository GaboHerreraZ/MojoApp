import { Component, OnInit } from '@angular/core';
import { Artista } from '../../../../modelos/ArtistaModel';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NuevoArtistaDialogComponent } from './nuevo-artista-dialog/nuevo-artista-dialog.component';
import { ComunesService } from '../../../../servicios/mojo/comunes/comunes.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {
  artistas: Array<Artista>;
  filtredArtistas: Array<Artista>;
  artistaSeleccionado: Artista;
  filterForm: FormGroup;
  nuevoArtistaForm: FormGroup;
  searchText: string;
  paises: any[];
  generos: any[];
  constructor(private fb: FormBuilder, private serviciosComunes: ComunesService) {
    this.artistas = new Array<Artista>();
    let artista: Artista;
    this.searchText = "";
    /*this.filterForm = new FormGroup({
      searchText: new FormControl('')
    });*/
    for (let i = 0; i < 10; i++) {
      artista = new Artista("Juan Pablo " + (i + 1), "Raba Sarmiento" + (i + 1));
      this.artistas.push(artista);
    }
    this.filtredArtistas = this.artistas;
    this.artistaSeleccionado = this.artistas[0];
  }

  public openNuevoArtistaDialog() {
    console.log("openNuevoArtistaDialog");
    return;
  }

  public verDetalleArtista(artista: Artista) {
    this.artistaSeleccionado = artista;
    console.log("verDetalleArtista");
    return;
  }

  public filtrarLista() {
    console.log("filtrando...");
    const input = this.searchText.toLowerCase();
    console.log(input);
    this.filtredArtistas = this.artistas.filter(element => element.nombreCompleto().toLowerCase().includes(input));
  }

  public submitFilter() {
    console.log("submitFilter");
    this.searchText = this.filterForm.get('searchText').value;
    console.log("searchtext: " + this.searchText);
    this.filtrarLista();
  }

  public submitNuevoArtista() {
    console.log("submitNuevoArtista");
    if(this.nuevoArtistaForm.invalid) {
      console.log("formulario invalido");
      console.log(this.nuevoArtistaForm.value);
      return;
    }
    this.nuevoArtistaForm.get('nombres').value;
  }

  public getPaises() {
    this.serviciosComunes.getPaises().subscribe(paises => {
      this.paises = paises;
    });
  }

  public getGeneros() {
    this.serviciosComunes.getGeneros().subscribe(generos => {
      this.generos = generos;
    });
  }
  ngOnInit() {
    this.filterForm = this.fb.group({
      searchText: ["", Validators.required]
    });
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
    /*this.filterForm = new FormGroup({
      searchText: new FormControl('')
    })*/
    this.getPaises();
    this.getGeneros();
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
}
