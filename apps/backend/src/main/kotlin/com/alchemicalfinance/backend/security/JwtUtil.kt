package com.alchemicalfinance.backend.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import java.util.Date

class JwtUtil {
    private val SECRET_KEY = "secret"

    fun generateToken(email: String): String {
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(Date(System.currentTimeMillis()))
            .setExpiration(Date(System.currentTimeMillis() + 1000 * 60 * 60 * 8)) // 8 hours
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact()
    }

    fun validateToken(token: String): Boolean {
        return try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token)
            true
        } catch (e: JwtException) {
            false
        }
    }

    fun extractEmail(token: String): String {
        val claims: Claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).body
        return claims.subject
    }
}
