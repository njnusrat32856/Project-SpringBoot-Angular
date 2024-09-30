import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../model/loan.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  baseUrl = "http://localhost:8084/api/loans/"

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    console.log(token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  
  getLoans(): Observable<Loan[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Loan[]>(this.baseUrl);
  }

  
  getLoanById(id: number): Observable<Loan> {
    const headers = this.getAuthHeaders();
    return this.http.get<Loan>(`${this.baseUrl}${id}`, {headers});
  }

  
  getLoansByUserId(userId: number): Observable<Loan[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Loan[]>(`${this.baseUrl}user/${userId}`, {headers});
  }

  
  saveLoan(loan: Loan): Observable<Loan> {
    const headers = this.getAuthHeaders();
    return this.http.post<Loan>(`${this.baseUrl}save`, loan, {headers});
  }

  updateLoan(id: number, loan: Loan): Observable<Loan> {
    const headers = this.getAuthHeaders();
    return this.http.put<Loan>(`${this.baseUrl}update/${id}`, loan, {headers});
  }  
  
  deleteLoan(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}delete/${id}`, {headers});
  }

  makeLoanPayment(loanId: number, paymentAmount: number): Observable<string> {
    
    const url = `${this.baseUrl}${loanId}/payment`;

    // Set up query parameters
    const params = new HttpParams().set('paymentAmount', paymentAmount.toString());

    // Make the PUT request with parameters
    return this.http.put<string>(url, {}, { params });
  }
  

}
