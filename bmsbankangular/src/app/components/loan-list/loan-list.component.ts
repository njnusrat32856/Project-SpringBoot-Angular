import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../model/loan.model';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.css'
})
export class LoanListComponent implements OnInit{

  loans: Loan[] = [];
  errorMessage: string = '';

  constructor(private loanService: LoanService) {}
  ngOnInit(): void {
    this.fetchLoans();
  }

  // Fetch all loans
  fetchLoans(): void {
    this.loanService.getLoans().subscribe(
      (data: Loan[]) => {
        this.loans = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching loan data';
        console.error(error);
      }
    );
  }

  // Delete a loan
  deleteLoan(id: number): void {
    if (confirm('Are you sure you want to delete this loan?')) {
      this.loanService.deleteLoan(id).subscribe(() => {
        this.loans = this.loans.filter(loan => loan.id !== id);
      });
    }
  }
}
