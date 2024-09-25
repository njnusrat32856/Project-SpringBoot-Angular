import { Component, OnInit } from '@angular/core';
import { Loan } from '../../model/loan.model';
import { LoanService } from '../../services/loan.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loan-payment',
  templateUrl: './loan-payment.component.html',
  styleUrl: './loan-payment.component.css'
})
export class LoanPaymentComponent implements OnInit{

  loan: Loan = new Loan();
  paymentAmount: number = 0;
  successMessage: string = '';
  errorMessage: string = '';
  loanId: number;

  constructor(
    private loanService: LoanService,
    private route: ActivatedRoute
  ) {
    this.loanId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getLoanDetails();
  }

  getLoanDetails() {
    this.loanService.getLoanById(this.loanId).subscribe({
      next:(data) => {
        this.loan = data;
      },
      error:(error) => {
        this.errorMessage = 'Failed to load loan details. Please try again later.';
      }
    });
  }

  makePayment() {
    if (this.paymentAmount <= 0) {
      this.errorMessage = 'Please enter a valid payment amount.';
      return;
    }

    // Deduct the payment amount from the remaining balance
    if (this.loan.balanceRemaining < this.paymentAmount) {
      this.errorMessage = 'Payment amount exceeds the remaining balance.';
      return;
    }

    this.loan.balanceRemaining -= this.paymentAmount;

    this.loanService.updateLoan(this.loan.id, this.loan).subscribe({
      next: () => {
        this.successMessage = 'Payment successful!';
        this.errorMessage = '';
        this.paymentAmount = 0; // Reset payment amount
      },
      error: (error) => {
        this.errorMessage = 'Failed to process the payment. Please try again.';
      }
    });
  }

}
