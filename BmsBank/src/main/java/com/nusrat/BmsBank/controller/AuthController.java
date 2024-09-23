package com.nusrat.BmsBank.controller;

import com.nusrat.BmsBank.entity.AuthResponse;
import com.nusrat.BmsBank.entity.User;
import com.nusrat.BmsBank.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody User request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/activate/{id}")
    public ResponseEntity<String> activateUser(@PathVariable("id") long id) {
        String response = authService.activateUser(id);
        return ResponseEntity.ok(response);
    }
}
