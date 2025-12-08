package com.libapp.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.libapp.backend.entity.Role;
import com.libapp.backend.entity.RoleName;
import com.libapp.backend.repository.RoleRepository;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Initialize roles if they don't exist
        if (!roleRepository.findByName(RoleName.ROLE_USER).isPresent()) {
            Role userRole = new Role(RoleName.ROLE_USER);
            roleRepository.save(userRole);
        }
        
        if (!roleRepository.findByName(RoleName.ROLE_ADMIN).isPresent()) {
            Role adminRole = new Role(RoleName.ROLE_ADMIN);
            roleRepository.save(adminRole);
        }
    }
}
