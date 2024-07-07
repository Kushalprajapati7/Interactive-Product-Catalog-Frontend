import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) { }
  userRole: string | null = null;
  userName: string | null = null;
  isAdmin: boolean = false;


  ngOnInit(): void {
    this.getRole();
    this.getUserName();

    const role = this.authService.getRole();
    this.isAdmin = role === 'admin'
  }

  logOut(): void {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Successfully Logout",
      showConfirmButton: false,
      timer: 1500
    });
    return this.authService.logout();
  }


  getRole() {
    this.userRole = this.authService.getRole();
  }
  getUserName() {
    this.userName = this.authService.getUserName();
  }
}
