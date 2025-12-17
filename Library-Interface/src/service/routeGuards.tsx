import { getUserRole, HasEnvBypass, } from './authService';

const routePermissions: Record<string, string[]> = {
    '/': ['USER', 'ADMIN'],
    '/acervo': ['USER', 'ADMIN'],
    '/emprestimos': ['USER', 'ADMIN'],
    '/atrasos': ['ADMIN'],
    '/copia': ['ADMIN'],
    '/perfil': ['USER', 'ADMIN'],
    '/configuracao': ['ADMIN'],
};

const normalizeRole = (role: string | null): string | null => {
    if (!role) return null;
    return role.replace('ROLE_', '');
};

export const canAccessRoute = (path: string): boolean => {
    if (HasEnvBypass()) return true;

    const userRole = getUserRole();
    console.log("User role:", userRole, "Checking path:", path);

    if (!userRole) return false;

    const normalizedRole = normalizeRole(userRole);
    const allowedRoles = routePermissions[path];
    const hasAccess = allowedRoles ? allowedRoles.includes(normalizedRole!) : false;

    console.log("Allowed roles for", path, ":", allowedRoles);
    console.log("Access granted:", hasAccess);

    return hasAccess;
};

export const getAccessibleRoutes = (): string[] => {
    if (HasEnvBypass()) return Object.keys(routePermissions);

    const userRole = getUserRole();
    if (!userRole) return [];

    const normalizedRole = normalizeRole(userRole);

    return Object.entries(routePermissions)
        .filter(([_, roles]) => roles.includes(normalizedRole!))
        .map(([path]) => path);
};