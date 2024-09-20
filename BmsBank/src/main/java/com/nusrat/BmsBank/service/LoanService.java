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

    //all loans
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    //loan by its id
    public Loan getById(long id) {
        return loanRepository.findById(id).get();
    }

    //loans by user id
    public List<Loan> getLoanByUserId(long userId) {
        return loanRepository.findByUserId(userId);
    }

    //save loan
    public void saveLoan(Loan loan) {
        loanRepository.save(loan);
    }

    public void updateLoan(long id, Loan loan) {
        loanRepository.save(loan);
    }

    public void deleteByIdLoan(long id) {
        loanRepository.deleteById(id);
    }

}
