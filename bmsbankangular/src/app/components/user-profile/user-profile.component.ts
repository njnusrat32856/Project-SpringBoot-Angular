import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  user: User | null = null;
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const currentUser = this.userService.currentUserValue;
    if (currentUser){
      this.getUserProfile(currentUser.id);
    }
    
  }

  // Fetch user profile by ID
  getUserProfile(userId: number): void {
    this.userService.getUserProfile().subscribe({
      next:(data: User) => {
        this.user = data;
      },
      error:(error) => {
        this.errorMessage = 'Error fetching user profile';
        console.error(error);
      }
  });
  }


}
