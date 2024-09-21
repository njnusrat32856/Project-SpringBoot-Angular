import { Component } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user : User = {
    id: 0,
    accountNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    address: '',
    mobileNo: '',
    nid: '',
    dob: '',
    image: '',
    createDate: '',
    accountType: '',
    status: true,
    balance: 0
  };
  errorMessage: string = '';
  selectedImage: File | null = null;

  constructor(private userService: UserService, private router: Router) {}

  // Handle file selection for image upload
  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  register(): void {
    // Set the current date for createDate
    this.user.createDate = new Date().toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'

    // Convert the image to Base64 if one is selected
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.image = reader.result as string; // Assign the Base64 string to user.image
        this.registerUser(); // Proceed with registration once image is ready
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      this.registerUser(); // Proceed with registration without image
    }
  }

  private registerUser(): void {
    this.userService.register(this.user).subscribe({
      next:() => {
        this.userService.currentUser;
        this.router.navigate(['/user-profile']); // Redirect to user profile
      },
      error:(error) => {
        this.errorMessage = 'Registration failed';
        console.error(error);
      }
  });
  }

}
