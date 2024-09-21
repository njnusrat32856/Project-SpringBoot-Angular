import { HttpClient } from '@angular/common/http';
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

  // Fetch all loans
  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.baseUrl);
  }

  // Fetch a specific loan by its ID
  getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.baseUrl}/${id}`);
  }

  // Fetch loans by user ID
  getLoansByUserId(userId: number): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}/user/${userId}`);
  }

  // Create a new loan or update an existing one
  saveLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.baseUrl, loan);
  }

  // Delete a loan by its ID
  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  

}
