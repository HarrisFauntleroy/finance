package com.alchemicalfinance.backend.service

import com.alchemicalfinance.backend.interfaces.database.models.User
import com.alchemicalfinance.backend.interfaces.database.repositories.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(private val userRepository: UserRepository) : UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val user: User = userRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User Not Found with username: $username")

        return UserDetailsImpl.create(user)
    }

    fun loadUserById(id: String): UserDetails {
        val user: User = userRepository.findById(id)
            .orElseThrow { UsernameNotFoundException("User not found with id: $id") }

        return UserDetailsImpl.create(user)
    }
}
