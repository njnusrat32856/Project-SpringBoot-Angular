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
  // id?: number;

  constructor(
    private loanService: LoanService,
    private route: ActivatedRoute
  ) {
    this.loanId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    // if (this.id) {
    //   this.loanService.getLoanById(this.id).subscribe({
    //     next: (data) => {
    //       this.loan = data;
    //     },
    //     error: (error) => {
    //       alert('Failed to load loan details.');
    //     }
    //   });
    // }


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
    if (!this.loan) {
      this.errorMessage = 'No loan details available.';
      return;
    }

    if (this.paymentAmount <= 0) {
      this.errorMessage = 'Please enter a valid payment amount.';
      return;
    }

    // Check if payment amount exceeds remaining balance
    if (this.loan.balanceRemaining < this.paymentAmount) {
      this.errorMessage = 'Payment amount exceeds the remaining balance.';
      return;
    }

    // Subtract the payment amount from the balance remaining
    this.loan.balanceRemaining -= this.paymentAmount;

    // Send updated loan details to the backend
    this.loanService.updateLoan(this.loan.id, this.loan).subscribe(
      () => {
        this.successMessage = 'Payment successful!';
        this.errorMessage = '';
        this.paymentAmount = 0; // Reset payment amount input
        this.getLoanDetails();  // Refresh loan details
      },
      (error) => {
        this.errorMessage = 'Failed to process the payment. Please try again.';
      }
    );
  }

  // makePayment() {
  //   if (this.paymentAmount <= 0) {
  //     this.errorMessage = 'Please enter a valid payment amount.';
  //     return;
  //   }

  //   // Deduct the payment amount from the remaining balance
  //   if (this.loan.balanceRemaining < this.paymentAmount) {
  //     this.errorMessage = 'Payment amount exceeds the remaining balance.';
  //     return;
  //   }

  //   // this.loan.balanceRemaining -= this.paymentAmount;

  //   this.loanService.updateLoan(this.loan.id, this.loan).subscribe({
  //     next: () => {
  //       this.successMessage = 'Payment successful!';
  //       this.errorMessage = '';
  //       this.paymentAmount = 0; // Reset payment amount
  //     },
  //     error: (error) => {
  //       this.errorMessage = 'Failed to process the payment. Please try again.';
  //     }
  //   });
  // }

}
