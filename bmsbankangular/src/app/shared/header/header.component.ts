import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/user.service';
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

  userRole: string | null = '';
  currentUser: User | null = null;

  constructor(private authService: UserService) {
  }

  ngOnInit(): void {
    this.authService.userRole$.subscribe(user => {
      this.userRole = user;
      //this.userRole = user?.role || null;
    });
  }

}
