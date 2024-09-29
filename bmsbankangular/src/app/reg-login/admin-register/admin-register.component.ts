import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css'
})
export class AdminRegisterComponent {

  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      mobileNo: [''],
      address: [''],
      dob: [''],
      gender: [''],
      image: [''],
      nid: ['']
    }
    ,{ validators: this.passwordMatchValidator });
  }
  onImageSelected(event: any): void {
      this.selectedImage = event.target.files[0];
    }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const { firstName, lastName, email, password, mobileNo, address, dob, gender, image, nid } = this.registerForm.value;

    this.authService.registerAdmin({ firstName, lastName, email, password, mobileNo, address, dob, gender, image, nid,  }).subscribe(
   {

    next: AuthResponse => {
      this.successMessage = 'Registration successful! Please check your email to activate your account.';
      this.router.navigate(['/login']);
    },
    error:error => {
      this.errorMessage = 'Registration failed. Please try again.';
    }

   }
    );
  }

}
