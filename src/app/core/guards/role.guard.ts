// role.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;  
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Unauthorized Access",
        showConfirmButton: false,
        timer: 1000
      });
      this.router.navigate(['/']);  
      return false; 
    }
  }
}
