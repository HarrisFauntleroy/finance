package com.alchemicalfinance.backend.interfaces.api.dto

data class SignupRequest(
    val username: String,
    val email: String,
    val password: String
)
