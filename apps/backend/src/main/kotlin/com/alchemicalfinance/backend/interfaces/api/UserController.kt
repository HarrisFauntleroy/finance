package com.alchemicalfinance.backend.api

import com.alchemicalfinance.backend.interfaces.database.models.User
import com.alchemicalfinance.backend.interfaces.database.repositories.UserRepository
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/users")
class UserController(private val userRepository: UserRepository) {

    private val logger = LoggerFactory.getLogger(UserController::class.java)

    @GetMapping
    fun retrieveAllUsers(): Map<String, List<User>> {
        logger.info("Entering retrieveAllUsers()")
        return try {
            val users = userRepository.findAll().toList()
            logger.info("Successfully fetched ${users.size} users")
            mapOf("users" to users)
        } catch (exception: Exception) {
            logger.error("An error occurred while fetching users: ${exception.message}", exception)
            throw exception
        }
    }

    @GetMapping("/email/{email}")
    fun retrieveUserByEmail(@PathVariable email: String): User? {
        logger.info("Entering retrieveUserByEmail() with email: $email")
        return userRepository.findByEmail(email)
            .also { logger.info("User retrieval by email ${if (it == null) "failed" else "succeeded"}") }
    }

    @PostMapping
    fun createUser(@RequestBody user: User): User {
        logger.info("Entering createUser() with user: $user")
        return userRepository.save(user)
            .also { logger.info("User creation succeeded with id: ${it.id}") }
    }

    @GetMapping("/{id}")
    fun retrieveUserById(@PathVariable id: String): User? {
        logger.info("Entering retrieveUserById() with id: $id")
        return userRepository.findById(id).orElseThrow {
            RuntimeException("User with id $id not found").apply {
                logger.error("User retrieval by id failed", this)
            }
        }
    }

    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: String, @RequestBody updatedUser: User): ResponseEntity<User> {
        logger.info("Entering updateUser() with id: $id and user: $updatedUser")
        if (!userRepository.existsById(id)) {
            val errorMessage = "User with id $id not found"
            logger.error(errorMessage)
            throw RuntimeException(errorMessage)
        }
        return ResponseEntity.ok(
            userRepository.save(updatedUser)
                .also { logger.info("User update succeeded with id: ${it.id}") }
        )
    }

    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: String): ResponseEntity<Void> {
        logger.info("Entering deleteUser() with id: $id")
        return if (userRepository.existsById(id)) {
            userRepository.deleteById(id)
            logger.info("User deletion succeeded")
            ResponseEntity.noContent().build()
        } else {
            logger.warn("User deletion failed: User with id $id not found")
            ResponseEntity.notFound().build()
        }
    }
}
