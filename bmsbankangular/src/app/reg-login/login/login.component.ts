import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        // if (this.authService.hasRole('ADMIN')) {
        //   this.router.navigate(['/transaction-list']);
        // } else if (this.authService.hasRole('USER')) {
        //   this.router.navigate(['/user-profile']);
        // }
        // this.successMessage = 'Login successful!';
        // this.errorMessage = null;
        // this.router.navigate(['/home']); 

        

        // Check user role and navigate accordingly
        if (this.authService.isAdmin()) {
          this.router.navigate(['/home']);
        } else if (this.authService.isUser()) {
          this.router.navigate(['/user-profile']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.successMessage = null;
      }
    });
  }

}
