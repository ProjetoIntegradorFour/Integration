package com.libapp.backend.security;

import java.util.Set;
import java.util.stream.Collectors;

public class RoleUtils {

    private RoleUtils() {

    }

    /**
     * Normalizes a role name from request to match RoleName enum. Examples: -
     * "admin" -> "ROLE_ADMIN" - "ADMIN" -> "ROLE_ADMIN" - "user" -> "ROLE_USER"
     * - "ROLE_ADMIN" -> "ROLE_ADMIN"
     */
    public static String normalizeToRoleName(String roleInput) {
        if (roleInput == null || roleInput.trim().isEmpty()) {
            return "ROLE_USER";
        }

        String normalized = roleInput.trim().toUpperCase();

        if (!normalized.startsWith("ROLE_")) {
            normalized = "ROLE_" + normalized;
        }

        if (!isValidRoleName(normalized)) {
            throw new IllegalArgumentException("Invalid role: " + roleInput);
        }

        return normalized;
    }

    private static boolean isValidRoleName(String roleName) {
        return roleName.equals("ROLE_USER") || roleName.equals("ROLE_ADMIN");
    }

    public static Set<String> normalizeRoleNames(Set<String> roleNames) {
        if (roleNames == null || roleNames.isEmpty()) {
            return Set.of("ROLE_USER");
        }

        return roleNames.stream()
                .map(RoleUtils::normalizeToRoleName)
                .collect(Collectors.toSet());
    }
}
