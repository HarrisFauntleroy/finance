package com.alchemicalfinance.backend.interfaces.api

import com.alchemicalfinance.backend.interfaces.database.models.User
import com.alchemicalfinance.backend.interfaces.database.repositories.UserRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/user")
class UserController(private val userRepository: UserRepository) {

    @GetMapping("/list")
    fun getAllUsers(): Map<String, List<User>> {
        println("Entering getAllUsers()")
        try {
            val users = userRepository.findAll().toList()
            println("Fetched users: $users")
            return mapOf("users" to users)
        } catch (exception: Exception) {
            println("An error occurred: ${exception.message}")
            throw exception
        }
    }

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: String): User? {
        return userRepository.findById(id).orElseThrow {
            RuntimeException("User with id $id not found")
        }
    }

    @GetMapping("/email/{email}")
    fun getUserByEmail(@PathVariable email: String): User? {
        return userRepository.findByEmail(email)
    }

    // ... other RESTful methods like POST, PUT, DELETE can be defined here ...
}
