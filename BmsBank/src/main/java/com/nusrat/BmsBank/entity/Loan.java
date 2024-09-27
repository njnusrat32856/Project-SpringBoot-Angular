package com.nusrat.BmsBank.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "loans")
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String loanType;

    private double loanAmount;

    private float interestRate;

    private double monthlyPayment;

    private int durationInMonths;

    private double balanceRemaining;

    private Date startDate;

    private Date endDate;

    private String status;

    private double paymentsMade;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    private User user;


}
