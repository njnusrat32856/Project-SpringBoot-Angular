import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent {

  senderId: number = 0;
  receiverId: number = 0;
  amount: number = 0;
  description: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private transactionService: TransactionService) {}

  makeTransfer(): void {
    if (this.amount <= 0) {
      this.errorMessage = 'Transfer amount must be greater than zero.';
      return;
    }

    this.transactionService.transferMoney(this.senderId, this.receiverId, this.amount, this.description).subscribe({
      next:(response) => {
        this.message = `Successfully transferred ${this.amount} from user ${this.senderId} to user ${this.receiverId}.`;
        this.errorMessage = '';
        this.clearForm();
      },
      error:(error) => {
        this.errorMessage = 'An error occurred during the transfer. Please try again.';
        this.message = '';
        console.error(error);
      }
  });
  }

  clearForm(): void {
    this.senderId = 0;
    this.receiverId = 0;
    this.amount = 0;
    this.description = '';
  }

}
