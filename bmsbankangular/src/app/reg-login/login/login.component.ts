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
        this.successMessage = 'Login successful!';
        this.errorMessage = null;
        this.router.navigate(['/user-profile']); // Redirect to home or another route after login
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.successMessage = null;
      }
    });
  }



  // email: string = '';
  // password: string = '';
  // errorMessage: string = '';

  // constructor(private userService: UserService, private router: Router) { }

  // login(): void {
  //   this.userService.login(this.email, this.password).subscribe({
  //     next: () => {
  //       this.userService.currentUser;
  //       this.router.navigate(['/user-profile']); // Redirect to user profile
  //     },
  //     error: (error) => {
  //       this.errorMessage = 'Invalid email or password';
  //       console.error(error);
  //     }
  //   });
  // }

}
