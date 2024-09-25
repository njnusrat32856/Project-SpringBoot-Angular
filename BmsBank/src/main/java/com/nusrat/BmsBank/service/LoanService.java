package com.nusrat.BmsBank.service;

import com.nusrat.BmsBank.entity.Loan;
import com.nusrat.BmsBank.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

        double monthlyPay=(loan.getLoanAmount()*loan.getInterestRate()/100)/loan.getDurationInMonths();
        loan.setMonthlyPayment(monthlyPay);
        loan.setBalanceRemaining(loan.getLoanAmount()-monthlyPay);
        loanRepository.save(loan);
    }

    public void updateLoan(long id, Loan loan) {

        Loan exitingLoan = loanRepository.getById(id);

        if(exitingLoan != null) {
            exitingLoan.setBalanceRemaining(loan.getBalanceRemaining());
            exitingLoan.setMonthlyPayment(loan.getMonthlyPayment());

            loanRepository.save(exitingLoan);
        }

//        loanRepository.save(loan);
    }

    public void deleteByIdLoan(long id) {
        loanRepository.deleteById(id);
    }

}
