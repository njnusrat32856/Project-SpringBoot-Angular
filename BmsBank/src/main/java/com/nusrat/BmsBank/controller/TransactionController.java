package com.nusrat.BmsBank.controller;

import com.nusrat.BmsBank.entity.Transaction;
import com.nusrat.BmsBank.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable long id) {
        return transactionService.getTransactionById(id);
    }

    @GetMapping("/{userId}")
    public List<Transaction> getTransactionsByUserId(@PathVariable long userId) {
        return transactionService.getTransactionByUserId(userId);
    }

    @PostMapping("/save")
    public Transaction saveTransaction(@RequestBody Transaction t) {
        return transactionService.saveTransaction(t);
    }

    
}
