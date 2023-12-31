package com.alchemicalfinance.backend.service

import com.alchemicalfinance.backend.interfaces.database.models.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class UserDetailsImpl(private val user: User) : UserDetails {
    override fun getAuthorities(): Collection<GrantedAuthority> {
        val authorities = mutableListOf<SimpleGrantedAuthority>()
        authorities.add(SimpleGrantedAuthority(user.role.name))
        return authorities
    }

    override fun getPassword(): String? {
        return user.password
    }

    override fun getUsername(): String? {
        return user.username
    }

    override fun isEnabled(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    companion object {
        fun create(user: User): UserDetailsImpl {
            return UserDetailsImpl(user)
        }
    }
}
