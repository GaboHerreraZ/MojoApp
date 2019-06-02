import { Component, OnInit,ViewChild, Input } from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  @Input() data:any;
  @Input() form:FormGroup;
  @Input() control:string;
  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit() {
  
  }

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term => term === '' ? this.data
      : this.data.filter(v => v.nombre.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  formatter = (x: {nombre: string}) => x.nombre;
  
  formatterArtista = (x: {nombres: string}) => x.nombres;

  searchArtista = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    map(term => term === '' ? this.data
      : this.data.filter(v => v.nombres.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )




}

