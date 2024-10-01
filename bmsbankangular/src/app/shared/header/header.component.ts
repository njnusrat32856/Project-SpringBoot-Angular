import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
// import { UserModel } from '../../model/user.model';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
// export class HeaderComponent {

// }
export class HeaderComponent implements OnInit{

  isAdmin = false;
  isUser = false;

  userRole: string | null = null;


  constructor( public authService: UserService,
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(['/login']);
  }


  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => {
      this.isAdmin = role === 'ADMIN';
      // this.isUser = this.authService.isUser();
      this.isUser = role === 'USER';
    });
  }

  // userRole: string | null = '';
  // currentUser: User | null = null;

  // constructor(protected authService: UserService) {
  // }
  

  // ngOnInit(): void {
  //   this.authService.currentUser$.subscribe(role => {
  //     this.currentUser = role;
  //     // this.userRole = user?.role || null;
  //   });
  // }

}
