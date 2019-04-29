import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _authService:AuthService) { }

  isLoggedIn$:Observable<boolean>;

  ngOnInit() {
      this.isLoggedIn$ = this._authService.isLoggedIn();
  }

}
