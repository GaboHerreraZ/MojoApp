import { Injectable } from '@angular/core';
import { AlbumService } from './album.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessAlbumService {

  constructor(private _albumService:AlbumService) { }


}
