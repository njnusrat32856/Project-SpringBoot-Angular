package com.nusrat.BmsBank.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDateTime transactionDate;

    private double amount;

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType; //deposit,withdraw,fundTransfer

    private String description;

    private long targetAccountNumber;

    private boolean status;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}