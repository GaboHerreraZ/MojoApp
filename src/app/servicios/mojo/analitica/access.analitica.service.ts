import { Injectable } from '@angular/core';
import { AnaliticaService } from './analitica.service';

@Injectable({
  providedIn: 'root'
})
export class AccessAnaliticaService {

  constructor(private _analiticaService:AnaliticaService) { }
}
