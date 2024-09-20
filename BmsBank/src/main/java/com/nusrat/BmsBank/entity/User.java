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
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String accountNumber;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String gender;

    private String address;

    private String mobileNo;

    private String nid;

    private String dob;

    private String image;

    private String accountType;

    private Date createDate;

    private boolean status;
}
