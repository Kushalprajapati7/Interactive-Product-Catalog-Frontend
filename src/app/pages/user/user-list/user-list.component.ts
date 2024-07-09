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
      throw new Error('User not found');
    }
  
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe(
          (response) => {
            this.users = this.users.filter((u) => u._id !== user._id);
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success"
            });
          },
          (error) => {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the user.",
              icon: "error"
            });
          }
        );
      }
    });
  }
  

  navigateToEditUserPage(user:IUser){
    this.router.navigate(['users/edit-user',user._id])
  }

}
