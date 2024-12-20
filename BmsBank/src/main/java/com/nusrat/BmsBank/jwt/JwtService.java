package com.nusrat.BmsBank.jwt;

import com.nusrat.BmsBank.entity.User;
import com.nusrat.BmsBank.repository.TokenRespository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    @Autowired
    private TokenRespository tokenRespository;

    private final String SECRET_KEY = "njkasdhibKJBPABDSB798434dnfjsfhnjsdfnjBPASJBDASBDJASDJ";

    private SecretKey getSecretKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    ;

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateToken(User user) {

        return Jwts
                .builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
                .signWith(getSecretKey())
                .compact();

//        return token;
    }

//    public String generateToken(User user) {
//
//        String token = Jwts
//                .builder()
//                .subject(user.getEmail())
//                .issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
//                .signWith(getSecretKey())
//                .compact();
//
//        return token;
//    }

    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean isValid(String token, UserDetails user) {
        String username = extractUsername(token);

        boolean validToken = tokenRespository
                .findByToken(token)
                .map(t -> !t.isLoggedOut())
                .orElse(false);
        return (username.equals(user.getUsername()) && !isTokenExpired(token) && validToken);
    }

    // Extracts the user's role from the token
    public String extractUserRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }
}
