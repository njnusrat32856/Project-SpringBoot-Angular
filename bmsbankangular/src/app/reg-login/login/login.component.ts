import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  login(): void {
    this.userService.login(this.email, this.password).subscribe({
      next: () => {
        this.userService.currentUser;
        this.router.navigate(['/user-profile']); // Redirect to user profile
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';
        console.error(error);
      }
    });
  }

}
