package com.alchemicalfinance.backend.interfaces.database.repositories

import com.alchemicalfinance.backend.interfaces.database.models.User
import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : CrudRepository<User, String> {

    @Query("SELECT * FROM user WHERE email = :email")
    fun findByEmail(@Param("email") email: String): User?

    @Query("SELECT * FROM user WHERE username = :username")
    fun findByUsername(@Param("username") username: String): User?
}
