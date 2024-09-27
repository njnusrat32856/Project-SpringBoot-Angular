import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../model/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  baseUrl = "http://localhost:8084/api/loans/"

  constructor(
    private http: HttpClient
  ) { }

  
  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.baseUrl);
  }

  
  getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.baseUrl}${id}`);
  }

  
  getLoansByUserId(userId: number): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}user/${userId}`);
  }

  
  saveLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(`${this.baseUrl}save`, loan);
  }

  updateLoan(id: number, loan: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${this.baseUrl}update/${id}`, loan);
  }  
  
  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}delete/${id}`);
  }

  makeLoanPayment(loanId: number, paymentAmount: number): Observable<string> {
    const url = `${this.baseUrl}${loanId}/payment`;

    // Set up query parameters
    const params = new HttpParams().set('paymentAmount', paymentAmount.toString());

    // Make the PUT request with parameters
    return this.http.put<string>(url, {}, { params });
  }
  

}
