import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.css'
})
export class WithdrawComponent {

  userId: number = 0;
  amount: number = 0;
  description: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private transactionService: TransactionService) { }

  makeWithdrawal(): void {
    if (this.amount <= 0) {
      this.errorMessage = 'Withdrawal amount must be greater than zero.';
      return;
    }

    this.transactionService.withdrawMoney(this.userId, this.amount, this.description).subscribe({
      next: (response) => {
        this.message = `Successfully withdrew ${this.amount} for user ${this.userId}.`;
        this.errorMessage = '';
        this.clearForm();
      },
      error: (error) => {
        this.errorMessage = 'An error occurred during the withdrawal. Please try again.';
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
