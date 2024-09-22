package com.nusrat.BmsBank.controller;

import com.nusrat.BmsBank.entity.LoginRequest;
import com.nusrat.BmsBank.entity.User;
import com.nusrat.BmsBank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable long id) {
        return userService.getUserById(id);
    }

//    @PostMapping("/add")
//    public ResponseEntity<User> addUser(@RequestBody User user) {
//        User savedUser = userService.addUser(user);
//        return ResponseEntity.ok(savedUser);
//    }

    // Register endpoint
//    @PostMapping("/register")
//    public ResponseEntity<User> registerUser(@RequestBody User user) {
//        User registeredUser = userService.registerUser(user);
//        return ResponseEntity.ok(registeredUser);
//    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }
//    public User deleteUser(long id) {
//        return userService.deleteUser();
//    }

}
