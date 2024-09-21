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

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.baseUrl);
  }

  saveLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.baseUrl + "save",loan);
  }

  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl +"/" + id);
  }

  

}
