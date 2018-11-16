import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

// servicios
import { ApiService } from '../servicios/dataApi/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate() {
    if (this.apiService.get_current_user()) {
      // login TRUE
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
