package com.alchemicalfinance.backend.interfaces.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/crypto")
class FinanceController {

    @GetMapping("/prices")
    fun getPrices(): Map<String, Double> {
        // For simplicity, returning static prices.
        return mapOf(
            "Bitcoin" to 45000.0,
            "Ethereum" to 3000.0
        )
    }
}
