package com.alchemicalfinance.backend.interfaces.api

import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.User
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class LOGINRequest(val username: String, val password: String)

@RestController
@RequestMapping("/api/v1/auth")
class AuthController {

    @PostMapping("/login")
    fun login(@RequestBody request: LOGINRequest, authentication: Authentication): ResponseEntity<String> {
        val user = authentication.principal as User
        return ResponseEntity.ok("Hello ${user.username}")
    }
}
