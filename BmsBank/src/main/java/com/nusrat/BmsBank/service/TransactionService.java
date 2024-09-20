package com.nusrat.BmsBank.service;

import com.nusrat.BmsBank.entity.Transaction;
import com.nusrat.BmsBank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(long id) {
        return transactionRepository.findById(id).get();
    }

    public List<Transaction> getTransactionByUserId(long userId) {
        return transactionRepository.findByUserId(userId);
    }

    public Transaction saveTransaction(Transaction t) {
        return transactionRepository.save(t);
    }

    public void deleteById(long id) {
        transactionRepository.deleteById(id);
    }
}
