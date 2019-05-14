import { Injectable } from '@angular/core';
import { ComunesService } from './comunes.service';

@Injectable({
  providedIn: 'root'
})
export class AccessComunesService {

  constructor(private _comunesService:ComunesService) { }
}
