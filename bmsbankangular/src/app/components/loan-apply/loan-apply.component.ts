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
    const startDate = new Date(this.loan.startDate);
    startDate.setMonth(startDate.getMonth() + this.loan.durationInMonths);
    return startDate.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
  }

}
