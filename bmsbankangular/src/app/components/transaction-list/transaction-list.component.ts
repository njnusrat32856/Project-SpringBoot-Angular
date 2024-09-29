import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../model/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  errorMessage: string = '';
  isAuthorized: boolean = false;

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.fetchTransactions();


    this.isAuthorized = this.userService.hasRole('ADMIN');

    if (!this.isAuthorized) {
      alert('You are not authorized to see All Account Transaction list.');
      this.router.navigate(['/']); // Redirect to another page if not authorized
      return;
    }
  }


  fetchTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data: Transaction[]) => {
        this.transactions = data;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching transaction data';
        console.error(error);
      }
    });
  }
  changeTransactionStatus(transactionId: number, status: string): void {
    this.transactionService.updateTransactionStatus(transactionId, status).subscribe({
      next: () => {
        this.transactions = this.transactions.map(transaction =>
          transaction.id === transactionId ? { ...transaction, status: status } : transaction
        );
      },
      error: (error) => {
        this.errorMessage = `Failed to update transaction status. Please try again.`;
      }
    });
  }

  deleteTransaction(id: number): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactionService.deleteTransaction(id).subscribe(() => {
        this.transactions = this.transactions.filter(transaction => transaction.id !== id);
      });
    }
  }

}
