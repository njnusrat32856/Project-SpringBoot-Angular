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
  makePayment(): void {
    if (this.paymentAmount > 0) {
      this.loanService.makeLoanPayment(this.loanId, this.paymentAmount).subscribe({
        next: (response: string) => {
          this.successMessage = `Payment successful: ${response}`;
          this.errorMessage = ''; 
          this.paymentAmount = 0; 
          this.getLoanDetails(); 
        },
        error: (error) => {
          this.errorMessage = `Failed to process the payment. Please try again.`;
          this.successMessage = ''; 
        }
      });
    } else {
      this.errorMessage = 'Please enter a valid payment amount greater than zero';
      this.successMessage = ''; 
    }
  }

  // makePayment(): void {
  //   if (this.loanId && this.paymentAmount) {
  //     this.loanService.makeLoanPayment(this.loanId, this.paymentAmount).subscribe({
  //       next: (response: string) => {
  //         this.successMessage = `Payment successful: ${response}`;
  //         this.getLoanDetails(); // Reload the loan details after payment
  //       },
  //       error: (error) => {
  //         // this.errorMessage = `Error making payment: ${error.error.message || 'Unknown error'}`;
  //         this.errorMessage = `Failed to process the payment. Please try again.`;
  //       }
  //     });
  //   } else {
  //     this.errorMessage = 'Please enter a valid loan ID and payment amount';
  //   }
  // }

}
