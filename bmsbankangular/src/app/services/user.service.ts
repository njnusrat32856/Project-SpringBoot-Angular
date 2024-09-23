import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse } from '../model/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8084';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public userRole$: Observable<string | null> = this.userRoleSubject.asObservable();

  

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize the role from localStorage
    const storedRole = this.isBrowser() ? localStorage.getItem('userRole') : null;
    this.userRoleSubject.next(storedRole);
  }
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  

  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password }, { headers: this.headers })
      .pipe(
        map((response: AuthResponse) => {
          if (this.isBrowser() && response.token) {
            localStorage.setItem('authToken', response.token);
            const decodedToken = this.decodeToken(response.token);
            localStorage.setItem('userRole', decodedToken.role);
            this.userRoleSubject.next(decodedToken.role); // Update role in BehaviorSubject
          }
          return response;
        })
      );
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Register a new user
  register(user: { firstName: string; lastName: string, email: string; password: string; mobileNo: string; address: string; dob: Date; gender: string; image: string; nid: string; accountType: string; createDate: Date; balance: number }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`,
      user, { headers: this.headers }).pipe(
        map((response: AuthResponse) => {
          if (this.isBrowser() && response.token) {
            localStorage.setItem('authToken', response.token); // Store JWT token
            console.log(localStorage.getItem('authToken')+"***********************");
          }
          return response;
        })
      );
  }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    const expiry = decodedToken.exp * 1000; // Convert expiry to milliseconds
    return Date.now() > expiry;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    }
    this.logout(); // Automatically log out if token is expired
    return false;
  }

  
  

  // Logout the user
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      this.userRoleSubject.next(null); // Clear role in BehaviorSubject
    }
    this.router.navigate(['/login']);
  }

  

  // Fetch the current user profile
  // getUserProfile(): Observable<User> {
  //   return this.http.get<User>(`${this.apiUrl}/${this.currentUserValue?.id}`);
  // }

  getCurrentUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user-profile`);
  }

}
