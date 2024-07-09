import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/userInterface';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  userForm!: FormGroup;
  userData: IUser[] = [];
  isEditing: boolean = false;
  userId: string | null = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      if (this.userId) {
        this.isEditing = true;
        this.loadUserDetails(this.userId);
      }
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.userForm.controls[controlName].touched && this.userForm.controls[controlName].hasError(errorName);
  }

  loadUserDetails(userId: string) {
    this.userService.getUserById(userId).subscribe(
      (user) => {
        this.userForm.patchValue({
          username: user.username,
          email: user.email,
          password: user.password,
          role: 'user'
        })
      },
      (error) => {
        console.error('Error loading User details:', error);
      }
    )
  }
  onSubmit() {
    if (this.userForm.valid) {
      if (this.isEditing) {
        this.updateUser();
      } else {
        this.addUser();
      }
    }
  }

  addUser() {
    if (this.userForm.invalid) {
      return
    }
    this.userData.push(this.userForm.value);
    const user: IUser = {
      username: this.userForm.get('username')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      role: this.userForm.get('role')?.value
    }
    this.userService.addUser(user).subscribe(
      response => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Added Successfully",
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['users/all-users'])
      },
      error => {
        console.log(error);
      }

    )
  }

  updateUser(): void {
    if (this.userId) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(
        (response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Updated Successfully",
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['users/all-users']);
        },
        (error) => {
          console.error('Error updating User:', error);
        }
      );
    }
  }
}
