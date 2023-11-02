package com.alchemicalfinance.backend.interfaces.database.repositories

import com.alchemicalfinance.backend.interfaces.database.models.User
import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.time.Instant

@Repository
interface UserRepository : CrudRepository<User, String> {
    @Query(
        value = """
        SELECT * FROM User WHERE id = :id
        """
    )
    fun findByEmail(
        @Param("id") email: String
    ): User?

    @Query(
        value = """
        SELECT * FROM "user" WHERE "createdAt" BETWEEN :start_date AND :end_date
        """
    )
    fun findUsersCreatedWithinDateRange(
        @Param("start_date") startDate: Instant,
        @Param("end_date") endDate: Instant
    ): List<User>

    // ... other custom query methods can be defined here ...
}
