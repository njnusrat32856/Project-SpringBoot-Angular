import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../model/transaction.model';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent {

  userId: number = 0;
  amount: number = 0;
  description: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private transactionService: TransactionService) {}

  makeDeposit(): void {
    if (this.amount <= 0) {
      this.errorMessage = 'Deposit amount must be greater than zero.';
      return;
    }

    this.transactionService.depositMoney(this.userId, this.amount, this.description).subscribe({
      next:(response) => {
        this.message = `Successfully deposited ${this.amount} for user ${this.userId}.`;
        this.errorMessage = '';
        this.clearForm();
      },
      error:(error) => {
        this.errorMessage = 'An error occurred during the deposit. Please try again.';
        this.message = '';
        console.error(error);
      }
  });
  }

  clearForm(): void {
    this.userId = 0;
    this.amount = 0;
    this.description = '';
  }

}
