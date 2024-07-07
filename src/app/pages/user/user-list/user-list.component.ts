import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/userInterface';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  constructor(
    private userService: UserService,
    // private sanitizer: DomSanitizer
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.allUser().subscribe(
      (data: IUser[]) => {
        this.users = data
      },
      (error) => {
        console.error(error)
      }
    )
  }

  deleteUser(user: IUser) {
    const userId = user._id;
    if (!userId) {
      throw new Error('user not found')
    }
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Deleted Successfully",
          showConfirmButton: false,
          timer: 1000
        });
        this.users = this.users.filter((u) => u._id !== user._id);
      },
      (error) => {
        console.error(error);
      }
    )
  }

}
