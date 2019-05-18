import { Injectable } from '@angular/core';
import { AlbumService } from './album.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessAlbumService {

  constructor(private _albumService:AlbumService) { }

  generos$ = new Subject();

  getGeneros(){
    this._albumService.getGeneros().subscribe((res:any)=>{
      this.generos$.next(res);
    })
  }

  getAccessGeneros(){
    return this.generos$.asObservable();
  }

}
