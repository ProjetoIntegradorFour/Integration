package com.libapp.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.libapp.backend.entity.User;
import com.libapp.backend.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    /**
     * IMPORTANT: The 'username' parameter here is actually the CPF, because our
     * UserRepository.findByUsername() method searches by CPF. This is
     * consistent with how authentication works in AuthController.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 'username' is actually CPF in our system
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with CPF: " + username));

        return UserDetailsImpl.build(user);
    }
}
