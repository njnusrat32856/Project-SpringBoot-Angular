import { UserService } from "../services/user.service";

export class Some {

  constructor(private authService: UserService) { }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  get isUser(): boolean {
    return this.authService.isUser();
  }


}