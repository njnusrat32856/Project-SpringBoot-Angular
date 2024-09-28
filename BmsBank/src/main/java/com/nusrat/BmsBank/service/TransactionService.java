package com.nusrat.BmsBank.service;

import com.nusrat.BmsBank.entity.Transaction;
import com.nusrat.BmsBank.entity.TransactionType;
import com.nusrat.BmsBank.entity.User;
import com.nusrat.BmsBank.repository.TransactionRepository;
import com.nusrat.BmsBank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository; // Assuming you have a user repository for account balance checks


    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(long id) {
        return transactionRepository.findById(id).get();
    }

    public List<Transaction> getTransactionByUserId(long userId) {
        return transactionRepository.findByUserId(userId);
    }



    public Transaction deposit(long userId, double amount, String description) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Update user's account balance
        user.setBalance(user.getBalance() + amount);
        userRepository.save(user);  // Save updated user balance

        // Create the deposit transaction
        Transaction transaction = new Transaction();
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setAmount(amount);
        transaction.setTransactionType(TransactionType.DEPOSIT);
        transaction.setDescription(description);
        transaction.setTargetAccountNumber(user.getAccountNumber());  // Assuming User has an accountNumber
        transaction.setStatus("PENDING");  // Assuming deposit is always successful
        transaction.setUser(user);
        transaction.setBalance(user.getBalance());  // Set updated balance in the transaction

        // Save the transaction
        return transactionRepository.save(transaction);
    }


    public Transaction withdraw(long userId, double amount, String description) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the user has sufficient balance
        if (user.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }

        // Update user's account balance
        user.setBalance(user.getBalance() - amount);
        userRepository.save(user);  // Save updated user balance

        // Create the withdrawal transaction
        Transaction transaction = new Transaction();
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setAmount(amount);
        transaction.setTransactionType(TransactionType.WITHDRAW);
        transaction.setDescription(description);
        transaction.setTargetAccountNumber(user.getAccountNumber());  // Assuming User has an accountNumber
        transaction.setStatus("PENDING");  // Assuming withdrawal is successful
        transaction.setUser(user);
        transaction.setBalance(user.getBalance());  // Set updated balance in the transaction

        // Save the transaction
        return transactionRepository.save(transaction);
    }


    // Transfer method
    @Transactional
    public Transaction transferBalance(long senderId, long receiverId, double amount, String description) {
        // Retrieve the sender and receiver accounts
        User sender = userRepository.findById(senderId).orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(receiverId).orElseThrow(() -> new RuntimeException("Receiver not found"));

        // Check if the sender has sufficient balance
        if (sender.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }

        // Deduct amount from sender's balance
        sender.setBalance(sender.getBalance() - amount);

        // Add amount to receiver's balance
        receiver.setBalance(receiver.getBalance() + amount);

        // Save updated user balances
        userRepository.save(sender);
        userRepository.save(receiver);

        // Create a transaction record for the sender
        Transaction senderTransaction = new Transaction();
        senderTransaction.setTransactionDate(LocalDateTime.now());
        senderTransaction.setAmount(amount);
        senderTransaction.setTransactionType(TransactionType.FUND_TRANSFER);
        senderTransaction.setDescription(description);
        senderTransaction.setTargetAccountNumber(sender.getAccountNumber());
        senderTransaction.setStatus("PENDING");  // Assuming transfer is successful
        senderTransaction.setUser(sender);
        senderTransaction.setBalance(sender.getBalance());  // Updated sender's balance after the transfer

        // Save sender's transaction
        transactionRepository.save(senderTransaction);

        // Optionally, create a transaction record for the receiver
        Transaction receiverTransaction = new Transaction();
        receiverTransaction.setTransactionDate(LocalDateTime.now());
        receiverTransaction.setAmount(amount);
        receiverTransaction.setTransactionType(TransactionType.FUND_TRANSFER);
        receiverTransaction.setDescription("Received from " + sender.getAccountNumber());
        receiverTransaction.setTargetAccountNumber(receiver.getAccountNumber());
        receiverTransaction.setStatus("PENDING");  // Assuming transfer is successful
        receiverTransaction.setUser(receiver);
        receiverTransaction.setBalance(receiver.getBalance());  // Updated receiver's balance after the transfer

        // Save receiver's transaction
        transactionRepository.save(receiverTransaction);

        // Return the sender's transaction as confirmation
        return senderTransaction;
    }



    public void deleteById(long id) {
        transactionRepository.deleteById(id);
    }

    public void updateTransactionStatus(Long transactionId, String status) {
        Optional<Transaction> transactionOpt = transactionRepository.findById(transactionId);

        if (transactionOpt.isPresent()) {
            Transaction transaction = transactionOpt.get();
            transaction.setStatus(status); // Assuming the Transaction entity has a 'status' field
            transactionRepository.save(transaction);
        } else {
            throw new RuntimeException("Transaction with ID " + transactionId + " not found.");
        }

    }
}
