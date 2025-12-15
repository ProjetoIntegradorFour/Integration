package com.libapp.backend.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.libapp.backend.dto.UserUpdateRequest;
import com.libapp.backend.entity.Role;
import com.libapp.backend.entity.RoleName;
import com.libapp.backend.entity.User;
import com.libapp.backend.exception.ResourceNotFoundException;
import com.libapp.backend.repository.RoleRepository;
import com.libapp.backend.repository.UserRepository;
import com.libapp.backend.security.RoleUtils;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public List<User> getAllUsers() {
        return userRepository.findAllWithRoles();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @Transactional
    public User updateUser(Long id, UserUpdateRequest updateRequest) {
        User user = getUserById(id);

        if (updateRequest.getName() != null) {
            user.setName(updateRequest.getName());
        }

        if (updateRequest.getCpf() != null && !updateRequest.getCpf().equals(user.getCpf())) {
            userRepository.findByUsername(updateRequest.getCpf())
                    .ifPresent(existingUser -> {
                        if (!existingUser.getId().equals(id)) {
                            throw new IllegalArgumentException("CPF already in use by another user");
                        }
                    });
            user.setCpf(updateRequest.getCpf());
        }

        if (updateRequest.getRoles() != null) {
            Set<Role> newRoles = new HashSet<>();

            for (String roleName : updateRequest.getRoles()) {
                String normalizedRoleName = RoleUtils.normalizeToRoleName(roleName);

                RoleName roleNameEnum = RoleName.valueOf(normalizedRoleName);
                Role role = roleRepository.findByName(roleNameEnum)
                        .orElseGet(() -> {
                            Role newRole = new Role(roleNameEnum);
                            return roleRepository.save(newRole);
                        });

                newRoles.add(role);
            }

            user.setRoles(newRoles);
        }

        return userRepository.save(user);
    }
}