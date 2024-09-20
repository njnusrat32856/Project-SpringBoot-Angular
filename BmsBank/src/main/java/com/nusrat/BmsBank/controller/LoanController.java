package com.nusrat.BmsBank.controller;

import com.nusrat.BmsBank.entity.Loan;
import com.nusrat.BmsBank.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @GetMapping("/")
    public List<Loan> getAllLoans() {
        return loanService.getAllLoans();
    }

    @PostMapping("/save")
    public void saveLoan(@RequestBody Loan loan) {
        loanService.saveLoan(loan);
    }

    @DeleteMapping("/{id}")
    public void deleteLoan(@PathVariable long id) {
        loanService.deleteByIdLoan(id);
    }

}
