import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../model/transaction.model';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit{
  
  transactions: Transaction[] = [];
  errorMessage: string = '';

  constructor(private transactionService: TransactionService) {}
  
  ngOnInit(): void {
    this.fetchTransactions();
  }

  
  fetchTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next:(data: Transaction[]) => {
        this.transactions = data;
      },
      error:(error) => {
        this.errorMessage = 'Error fetching transaction data';
        console.error(error);
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
