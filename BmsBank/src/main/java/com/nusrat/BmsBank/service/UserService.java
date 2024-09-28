package com.nusrat.BmsBank.service;

import com.nusrat.BmsBank.entity.User;
import com.nusrat.BmsBank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(
                        () -> new UsernameNotFoundException("User not found with this Email Address: " + username)
                );
    }

    @Autowired
    private UserRepository userRepository;



//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    public User getUserById(long id) {
//        return userRepository.findById(id).get();
//    }
//
//
//
//    public User updateUser(User user) {
//        return userRepository.save(user);
//    }
//    public void deleteUser(long id) {
//        userRepository.deleteById(id);
//    }



    public static String generateRandomNineDigitNumber() {
        Random random = new Random();
        // Generate a random number between 100000000 (inclusive) and 999999999 (inclusive)
        int number = 100000000 + random.nextInt(900000000);
        return String.valueOf(number);
    }
    public String generateUniqueAccountNumber() {
        String accountNumber;
        do {
            accountNumber = generateRandomNineDigitNumber();
        } while (userRepository.findByAccountNumber(accountNumber).isPresent());

        return accountNumber;
    }


}
