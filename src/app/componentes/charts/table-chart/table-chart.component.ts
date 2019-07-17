import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['./table-chart.component.css']
})
export class TableChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title = "Top 10 ingresos por canciones";
   type = 'Table';
   data = [
      ['Cancion 1',  {v: 10000, f: '$10,000'}],
      ['Cancion 2',   {v:8000,   f: '$8,000'}],
      ['Cancion 3', {v: 12500, f: '$12,500'}],
      ['Cancion 4',   {v: 7000,  f: '$7,000'}],
      ['Cancion 5',  {v: 10000, f: '$10,000'}],
      ['Cancion 6',  {v: 10000, f: '$10,000'}],
      ['Cancion 7',  {v: 10000, f: '$10,000'}],
      ['Cancion 8',  {v: 10000, f: '$10,000'}],
      ['Cancion 9',  {v: 10000, f: '$10,000'}],
      ['Cancion 10',  {v: 10000, f: '$10,000'}],
   ];
   columnNames = ["Canción", "Ingresos"];
   options = { 
     alternatingRowStyle:true,
     showRowNumber:true  
   };
   height = 400;

}
