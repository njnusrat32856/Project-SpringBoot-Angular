import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    
  }
  
  loadUserProfile(): void {
  
  this.user = this.userService.getUser();
  }
  

  // updateUserBalance(updatedBalance: number): void {
  //   if (this.user) {
  //     this.user.balance = updatedBalance;
  //     this.userService.updateUserInLocalStorage(this.user); // Update user data in localStorage
  //     this.loadUserProfile(); // Refresh the user profile
  //   }
  // }

  // refreshUserProfile(): void {
  //   this.userService.getUser().subscribe({
  //     next:(response: User) => {
  //       this.user = response; 
  //     },
  //     error:(error: any) => {
  //       console.error('Failed to refresh user profile', error);
  //     }
  //   });
  // }
}

