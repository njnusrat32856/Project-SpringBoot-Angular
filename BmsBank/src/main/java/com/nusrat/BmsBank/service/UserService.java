package com.nusrat.BmsBank.service;

import com.nusrat.BmsBank.entity.User;
import com.nusrat.BmsBank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(long id) {
        return userRepository.findById(id).get();
    }

    // Register a new user
    public User registerUser(User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }

        // Encrypt the password before saving
//        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Set createDate to the current date if not provided
        if (user.getCreateDate() == null) {
            user.setCreateDate(new Date(System.currentTimeMillis()));
        }

        user.setAccountNumber(generateRandomNineDigitNumber());
        // Save the user
        return userRepository.save(user);
    }
//    public User addUser(User user) {
//
//
//        user.setAccountNumber(generateRandomNineDigitNumber());
//
//        return userRepository.save(user);
//    }

    // Authenticate user by email and password
    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

//        // Check password match
//        if (!passwordEncoder.matches(password, user.getPassword())) {
//            throw new RuntimeException("Invalid email or password");
//        }

        return user;
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }
    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }



    public static String generateRandomNineDigitNumber() {
        Random random = new Random();
        // Generate a random number between 100000000 (inclusive) and 999999999 (inclusive)
        int number = 100000000 + random.nextInt(900000000);
        return String.valueOf(number);
    }

}
