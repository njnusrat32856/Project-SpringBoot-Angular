import { Component } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../model/loan.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-loan-apply',
  templateUrl: './loan-apply.component.html',
  styleUrl: './loan-apply.component.css'
})
export class LoanApplyComponent {

  loan: Loan = new Loan();
  successMessage: string = '';
  errorMessage: string = '';

  // loanTypes: string[] = ['Personal Loan', 'Home Loan', 'Car Loan', 'Education Loan', 'Business Loan'];

  constructor(
    private loanService: LoanService
  ) {
    // Set the start date to the current date when the component initializes
    this.loan.startDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  applyLoan() {

    // Calculate the end date before submitting the loan application
    if (this.loan.durationInMonths) {
      this.loan.endDate = this.calculateEndDate();
    }

    this.loanService.saveLoan(this.loan).subscribe({
      next: response => {
        this.successMessage = 'Loan application submitted successfully!';
        this.loan = new Loan(); // Reset form
        this.loan.startDate = new Date().toISOString().split('T')[0]; // Reset start date to current date
      },
      error: error => {
        this.errorMessage = 'Failed to submit loan application. Please try again.';
      }
    });
  }


  calculateEndDate(): string {
    // Calculate the end date based on the start date and duration in months
    const startDate = new Date(this.loan.startDate);
    startDate.setMonth(startDate.getMonth() + this.loan.durationInMonths);
    return startDate.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
  }


  // loan : Loan = {
  //   id: 0,
  //   loanType: '',
  //   loanAmount: 0,
  //   interestRate: 0,
  //   monthlyPayment: 0,
  //   durationInMonths: 0,
  //   balanceRemaining: 0,
  //   status: false, // Default status when applying
  //   startDate: '',
  //   endDate: '',
    
  // };

  // constructor(
  //   private loanService: LoanService
  // ) {}
  
  // applyLoan(): void {
  //   this.loanService.saveLoan(this.loan).subscribe({
  //     next: res => {
  //       alert('Loan application submitted successfully!');
  //     },
  //     error: err => {
  //       alert('Failed to submit loan application. Please try again.');
  //     }
  //   });
  // }

}
