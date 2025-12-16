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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("[DEBUG] Loading user by CPF: " + username);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with CPF: " + username));

        System.out.println(
                "[DEBUG] Found user: ID=" + user.getId() + ", Name=" + user.getName() + ", CPF=" + user.getCpf());
        System.out.println("[DEBUG] User roles: " + user.getRoles());

        UserDetails userDetails = UserDetailsImpl.build(user);
        System.out.println("[DEBUG] Built UserDetails: " + userDetails.getUsername() + ", Authorities: "
                + userDetails.getAuthorities());

        return userDetails;
    }
}
