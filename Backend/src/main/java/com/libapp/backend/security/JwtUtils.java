package com.libapp.backend.security;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration.ms}")
    private long jwtExpirationMs;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateJwtToken(UserDetailsImpl userPrincipal) {
        List<String> roles = userPrincipal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        System.out.println("[JWT] Generating token with roles: " + roles);

        return Jwts.builder()
                .setSubject(userPrincipal.getCpf())
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    public String getCpfFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    @SuppressWarnings("unchecked")
    public List<String> getRolesFromJwtToken(String token) {
        List<String> roles = (List<String>) Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("roles");

        System.out.println("[JWT] Extracted roles from token: " + roles);

        return roles;
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.err.println("[JWT] Token validation failed: " + e.getMessage());
            return false;
        }
    }

    public void logJwtContents(String token) {
        try {
            System.out.println("=== JWT DEBUG INFO ===");
            System.out.println("Token: " + token.substring(0, Math.min(20, token.length())) + "...");
            System.out.println("Subject (CPF): " + getCpfFromJwtToken(token));
            System.out.println("Roles: " + getRolesFromJwtToken(token));
            System.out.println("Is valid: " + validateJwtToken(token));
            System.out.println("======================");
        } catch (Exception e) {
            System.err.println("Error parsing JWT for debugging: " + e.getMessage());
        }
    }
}
