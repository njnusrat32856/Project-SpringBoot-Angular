import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  baseUrl = 'http://localhost:8084/api/transactions/';

  constructor(
    private http: HttpClient
  ) { }

  
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  
  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}id`);
  }

  
  getTransactionsByUserId(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}userId`);
  }

  
  depositMoney(userId: number, amount: number, description: string): Observable<any> {
    const url = `${this.baseUrl}deposit`;

    // Setting up query parameters
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('amount', amount.toString())
      .set('description', description);

    // Making the POST request with parameters
    return this.http.post(url, {}, { params });
  }

  
  transferMoney(senderId: number, receiverId: number, amount: number, description: string): Observable<any> {
    const url = `${this.baseUrl}transfer`;

    // Setting up query parameters
    let params = new HttpParams()
      .set('senderId', senderId.toString())
      .set('receiverId', receiverId.toString())
      .set('amount', amount.toString())
      .set('description', description);

    // Making the POST request with parameters
    return this.http.post(url, {}, { params });
  }

  
  withdrawMoney(userId: number, amount: number, description: string): Observable<any> {
    const url = `${this.baseUrl}withdraw`;

    // Setting up query parameters
    let params = new HttpParams()
      .set('userId', userId.toString())
      .set('amount', amount.toString())
      .set('description', description);

    // Making the POST request with parameters
    return this.http.post(url, {}, { params });
  }
  

  
  // saveTransaction(transaction: Transaction): Observable<Transaction> {
  //   return this.http.post<Transaction>(this.baseUrl, transaction);
  // }

  
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
