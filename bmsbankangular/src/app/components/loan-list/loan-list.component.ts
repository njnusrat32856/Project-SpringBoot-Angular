import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../model/loan.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.css'
})
export class LoanListComponent implements OnInit{

  loans: Loan[] = [];
  errorMessage: string = '';

  constructor(
    private loanService: LoanService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getLoans();
  }

  // Fetch all loans
  getLoans(): void {
    this.loanService.getLoans().subscribe({
      next:(data: Loan[]) => {
        this.loans = data;
      },
      error:(error) => {
        this.errorMessage = 'Error fetching loan data';
        console.error(error);
      }
    });
  }

  // Delete a loan
  deleteLoan(id: number): void {
    this.loanService.deleteLoan(id).subscribe({
      next:() => {
        this.loans = this.loans.filter((loan) => loan.id !== id);
      },
      error:(error) => {
        this.errorMessage = 'Failed to delete loan. Please try again later.';
      }
    });
  }

  navigateToPayment(loanId: number) {
    this.router.navigate(['/loan-payment', loanId]);
  }

}
