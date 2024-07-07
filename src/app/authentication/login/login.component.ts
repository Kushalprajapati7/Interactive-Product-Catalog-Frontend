import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    summited: boolean = false;
    formData: any = [];
    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }
    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        })

        // this.onSubmit();
    }

    onSubmit() {
        this.summited = true;
        if (this.loginForm.invalid) {
            return
        }

        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;
        this.authService.loginUser(email, password).subscribe({
            next: () => {

                this.router.navigate([''])
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Logged in successfully",
                  showConfirmButton: false,
                  timer: 1500
                });
            },
            error: (err) => {
                console.error(err);
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "Invalid login credentials",
                  showConfirmButton: false,
                  timer: 1500
                });

            }
        }
        )
    }

    hasError(controlName: string, errorName: string): boolean {
        return this.loginForm.controls[controlName].touched && this.loginForm.controls[controlName].hasError(errorName);
    }
}