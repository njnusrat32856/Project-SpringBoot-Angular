package com.nusrat.BmsBank.service;

import com.nusrat.BmsBank.entity.Loan;
import com.nusrat.BmsBank.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;


    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }


    public Loan getById(long id) {
        return loanRepository.findById(id).get();
    }


    public List<Loan> getLoanByUserId(long userId) {
        return loanRepository.findByUserId(userId);
    }

    public void saveLoan(Loan loan) {
        // Calculate the monthly payment using the formula: (P * r) / (1 - (1 + r)^-n)
        double principal = loan.getLoanAmount();
        double annualInterestRate = loan.getInterestRate() / 100;
        int numberOfMonths = loan.getDurationInMonths();

        double monthlyInterestRate = annualInterestRate / 12;
        double monthlyPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfMonths));

        loan.setMonthlyPayment(monthlyPayment);
        loan.setBalanceRemaining(principal);


        loanRepository.save(loan);
    }


//    public void saveLoan(Loan loan) {
//
//        double monthlyPay=(loan.getLoanAmount()*loan.getInterestRate()/100)/loan.getDurationInMonths();
//        loan.setMonthlyPayment(monthlyPay);
////        loan.setBalanceRemaining(loan.getLoanAmount()-monthlyPay);
//        loanRepository.save(loan);
//    }
public void updateLoanPayment(Long loanId, double paymentAmount) {
    // Retrieve the loan details from the repository
    Optional<Loan> loanOpt = loanRepository.findById(loanId);
    if (loanOpt.isEmpty()) {
        throw new IllegalArgumentException("Loan not found");
    }

    Loan loan = loanOpt.get();

    // Check if the payment is more than the remaining balance
    if (paymentAmount > loan.getBalanceRemaining()) {
        throw new IllegalArgumentException("Payment amount exceeds remaining balance");
    }

    // Update the remaining balance
    double newBalance = loan.getBalanceRemaining() - paymentAmount;
    loan.setBalanceRemaining(newBalance);

    // Increment the number of payments made
    loan.setPaymentsMade(loan.getPaymentsMade() + 1);

    // If the balance reaches zero, mark the loan as fully paid
    if (newBalance <= 0) {
        loan.setStatus("PAID");
        loan.setBalanceRemaining(0); // Ensures balance doesn't go negative
    }

    // Save the updated loan details
    loanRepository.save(loan);
}


//    public Loan updateLoan(long id, Loan loan) {
//        Loan existingLoan = loanRepository.findById(id).orElse(null);
//
//        if (existingLoan != null) {
//            // Update the balance remaining by subtracting the payment amount
//            double paymentAmount = loan.getLoanAmount(); // This should be the payment amount sent from the frontend
//            double newBalanceRemaining = existingLoan.getBalanceRemaining() - paymentAmount;
//
//            if (newBalanceRemaining < 0) {
//                newBalanceRemaining = 0; // Ensure the balance doesn't go negative
//            }
//
//            existingLoan.setBalanceRemaining(newBalanceRemaining);
//            existingLoan.setMonthlyPayment(existingLoan.getMonthlyPayment()); // No change to monthly payment
//
//            // Save the updated loan
//            loanRepository.save(existingLoan);
//        }
//        return existingLoan;
//    }



//    public Loan updateLoan(long id, Loan loan) {
//
//        Loan exitingLoan = loanRepository.getById(id);
//
//        if(exitingLoan != null) {
//            exitingLoan.setBalanceRemaining(loan.getLoanAmount());
////            exitingLoan.setBalanceRemaining(loan.getBalanceRemaining());
//            exitingLoan.setMonthlyPayment(loan.getMonthlyPayment());
//
//            loanRepository.save(exitingLoan);
//        }
//        return  exitingLoan;
//
////        loanRepository.save(loan);
//    }

    public void deleteByIdLoan(long id) {
        loanRepository.deleteById(id);
    }

}
