import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLoggedIn$:Observable<boolean>;

  constructor(private _authService:AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this._authService.isLoggedIn();
  }

}
