package com.nusrat.BmsBank.security;

import com.nusrat.BmsBank.jwt.JwtAuthFilter;
import com.nusrat.BmsBank.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserService userService;
    private final JwtAuthFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return
                http
                        .csrf(AbstractHttpConfigurer::disable)
                        .cors(Customizer.withDefaults())
                        .authorizeHttpRequests(

                                req ->
                                        req.requestMatchers("/login", "/register", "/activate/**", "user-profile", "api/transactions/",
                                                        "api/transactions/deposit", "api/transactions/withdraw", "api/transactions/transfer",
                                                        "api/loans/", "api/loans/save","api/loans/{id}", "api/loans/delete/{id}" ,
                                                        "api/loans/{loanId}/payment", "api/loans/update/{id}",
                                                        "api/loans/user/{userId}", "api/transactions/user/{userId}", "api/transactions/{id}",
                                                         "/register/admin", "api/transactions/{transactionId}/status")
                                                .permitAll()
                                                .requestMatchers("api/transactions/","api/transactions/{transactionId}/status")
                                                .hasAuthority("ADMIN")
                                                .requestMatchers("api/transactions/user/{userId}")
                                                .hasAuthority("USER")


                        )
                        .userDetailsService(userService)
                        .sessionManagement(
                                session ->
                                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                        )
                        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                        .build();


    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
