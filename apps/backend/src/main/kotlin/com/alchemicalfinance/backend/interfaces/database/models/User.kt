package com.alchemicalfinance.backend.interfaces.database.models

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.time.Instant

@Table("user")
data class User(
    @Id
    val id: String,
    val name: String?,

    val email: String?,
    val password: String?,

    @Column("emailVerified")
    val emailVerified: Instant?,

    val image: String?,

    @Column("createdAt")
    val createdAt: Instant?,

    @Column("updatedAt")
    val updatedAt: Instant?,

    val deleted: Boolean?,

    @Column("deletedAt")
    val deletedAt: Instant?

//    val role: Role?,
//    val accounts: List<Account>?,
//    val budgets: List<Budget>?,
//    val budgetTransactions: List<BudgetTransaction>?,
//    val assets: List<Asset>?,
//    val assetTransactions: List<AssetTransaction>?,
//    val cryptocurrency: List<Cryptocurrency>?,
//    val sessions: List<Session>?,
//    val settings: Settings?,
//    val portfolioSnapshot: List<PortfolioSnapshot>?,
//    val cryptoSnapshot: List<CryptoSnapshot>?,
//    val cashSnapshot: List<CashSnapshot>?,
//    val propertySnapshot: List<PropertySnapshot>?,
//    val securitySnapshot: List<SecuritySnapshot>?
)
