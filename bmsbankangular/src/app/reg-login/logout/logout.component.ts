import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{

  constructor(
    private userService: UserService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.logout();
    // throw new Error('Method not implemented.');
  }


  logout() {
    this.userService.logout();
    
    this.router.navigate(['login']);
  }

}
