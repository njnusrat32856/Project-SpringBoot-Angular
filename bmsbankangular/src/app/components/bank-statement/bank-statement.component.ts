import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../model/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bank-statement',
  templateUrl: './bank-statement.component.html',
  styleUrl: './bank-statement.component.css'
})
export class BankStatementComponent implements OnInit {

  transactions: Transaction[] = [];
  userId: number = 0;

  constructor(
    private transactionService: TransactionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserTransactions();
  }

  loadUserTransactions(): void {
    const user = this.userService.getUser(); 
    if (user) {
      this.userId = user.id;
      this.transactionService.getTransactionsByUserId(this.userId).subscribe({
        next:(transactions) => {
          this.transactions = transactions;
        },
        error:(error) => {
          console.error('Failed to load transactions:', error);
        }
      });
    }
  }

}
