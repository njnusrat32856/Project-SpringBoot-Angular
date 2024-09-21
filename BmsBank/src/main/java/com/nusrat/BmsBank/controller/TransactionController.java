package com.nusrat.BmsBank.controller;

import com.nusrat.BmsBank.entity.Transaction;
import com.nusrat.BmsBank.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/deposit")
    public ResponseEntity<Transaction> deposit(@RequestParam long userId,
                                               @RequestParam double amount,
                                               @RequestParam String description) {
        Transaction transaction = transactionService.deposit(userId, amount, description);
        return ResponseEntity.ok(transaction);
    }

    // Withdraw Endpoint
    @PostMapping("/withdraw")
    public ResponseEntity<Transaction> withdraw(@RequestParam long userId,
                                                @RequestParam double amount,
                                                @RequestParam String description) {
        Transaction transaction = transactionService.withdraw(userId, amount, description);
        return ResponseEntity.ok(transaction);
    }


    @PostMapping("/transfer")
    public ResponseEntity<Transaction> transfer(@RequestParam long senderId,
                                                @RequestParam long receiverId,
                                                @RequestParam double amount,
                                                @RequestParam String description) {
        Transaction transaction = transactionService.transferBalance(senderId, receiverId, amount, description);
        return ResponseEntity.ok(transaction);
    }



    
}
