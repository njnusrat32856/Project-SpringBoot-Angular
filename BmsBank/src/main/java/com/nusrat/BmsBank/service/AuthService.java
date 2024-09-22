package com.nusrat.BmsBank.service;

import com.nusrat.BmsBank.entity.AuthResponse;
import com.nusrat.BmsBank.entity.Token;
import com.nusrat.BmsBank.entity.User;
import com.nusrat.BmsBank.jwt.JwtService;
import com.nusrat.BmsBank.repository.TokenRespository;
import com.nusrat.BmsBank.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final JwtService jwtService;

    private final TokenRespository tokenRespository;

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    private void saveUserToken(String jwt, User user) {

        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUser(user);

        tokenRespository.save(token);
    }
    private void revokeAllTokenByUser(User user) {

        List<Token> validTokens = tokenRespository.findAllTokensByUserId(user.getId());
        if (validTokens.isEmpty()) {
            return;
        }
        validTokens.forEach(t -> {
            t.setLoggedOut(true);
        });
        tokenRespository.saveAll(validTokens);
    }
    public AuthResponse register(User request) {
        if (userRepository.findByEmail(request.getUsername()).isPresent()) {
            return new AuthResponse(null, "User already exists");

        }
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAccountNumber(userService.generateUniqueAccountNumber());
        user.setRole(request.getRole());
        user.setAddress(request.getAddress());
        user.setDob(request.getDob());
        user.setGender(request.getGender());
        user.setNid(request.getNid());
        user.setMobileNo(request.getMobileNo());

        String jwt = jwtService.generateToken(request);
        saveUserToken(jwt, request);

        return new AuthResponse(jwt, "User registration was successful");
    }
    public AuthResponse authenticate(User request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user = userRepository.findByEmail(request.getUsername())
                .orElseThrow();

        String jwt = jwtService.generateToken(user);

        revokeAllTokenByUser(user);

        saveUserToken(jwt, user);

        return new AuthResponse(jwt,"User login was successful");
    }

}
