import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-artista-detail',
  templateUrl: './artista-detail.component.html',
  styleUrls: ['./artista-detail.component.css']
})
export class ArtistaDetailComponent implements OnInit {

  @Input() artistaData: any;

  constructor() { }

  ngOnInit() {
    console.log(this.artistaData);
  }

}
