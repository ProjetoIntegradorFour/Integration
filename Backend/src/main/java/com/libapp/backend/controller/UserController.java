package com.libapp.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.web.bind.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libapp.backend.dto.ProfileResponse;
import com.libapp.backend.dto.UserUpdateRequest;
import com.libapp.backend.entity.User;
import com.libapp.backend.security.UserDetailsImpl;
import com.libapp.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ProfileResponse> profile(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<String> roles = userDetails.getAuthorities().stream()
                .map(auth -> auth.getAuthority())
                .collect(Collectors.toList());

        ProfileResponse response = new ProfileResponse(
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getCpf(),
                roles);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<ProfileResponse>> getAllUsers() {

        List<User> users = userService.getAllUsers();

        List<ProfileResponse> response = users.stream()
                .map(user -> {
                    List<String> roles = user.getRoles().stream()
                            .map(role -> role.getName().name())
                            .collect(Collectors.toList());

                    return new ProfileResponse(
                            user.getId(),
                            user.getName(),
                            user.getCpf(),
                            roles);
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ProfileResponse> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);

        List<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());

        ProfileResponse response = new ProfileResponse(
                user.getId(),
                user.getName(),
                user.getCpf(),
                roles);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/admin/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ProfileResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UserUpdateRequest updateRequest) {

        if (updateRequest == null) {
            return ResponseEntity.badRequest().build();
        }

        User updatedUser = userService.updateUser(id, updateRequest);

        List<String> roles = updatedUser.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toList());

        ProfileResponse response = new ProfileResponse(
                updatedUser.getId(),
                updatedUser.getName(),
                updatedUser.getCpf(),
                roles);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("User controller is working");
    }
}