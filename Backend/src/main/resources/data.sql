-- Clear existing data
DELETE FROM copy;
DELETE FROM catalog;
DELETE FROM user_roles;
DELETE FROM users;
DELETE FROM roles;

-- Insert default roles
INSERT INTO roles (id, name) VALUES 
(1, 'ROLE_USER'),
(2, 'ROLE_ADMIN');

-- Insert test catalog entries
INSERT INTO catalog (id, isbn, title, title_pt, authors, publisher, published_date, language, cover_url, description, is_admin_overridden, last_synced_at, created_at, updated_at) VALUES
(1, '9788535902775', '1984', '1984', 'George Orwell', 'Companhia das Letras', '2009-06-01', 'pt', 'https://covers.openlibrary.org/b/isbn/9788535902775-L.jpg', 'Um clássico da literatura distópica', false, NOW(), NOW(), NOW()),
(2, '9788571640353', 'Dom Casmurro', 'Dom Casmurro', 'Machado de Assis', 'Ática', '1998-01-01', 'pt', 'https://covers.openlibrary.org/b/isbn/9788571640353-L.jpg', 'Romance brasileiro do século XIX', false, NOW(), NOW(), NOW()),
(3, '9788544001820', 'O Alquimista', 'O Alquimista', 'Paulo Coelho', 'Paralela', '2017-01-01', 'pt', 'https://covers.openlibrary.org/b/isbn/9788544001820-L.jpg', 'Uma fábula sobre seguir seus sonhos', false, NOW(), NOW(), NOW());

-- Insert test copies
INSERT INTO copy (id, catalog_id, status, shelf_id, created_at, updated_at) VALUES
(1, 1, 'AVAILABLE', 'A1-001', NOW(), NOW()),
(2, 1, 'LOANED', 'A1-002', NOW(), NOW()),
(3, 2, 'AVAILABLE', 'B2-001', NOW(), NOW()),
(4, 2, 'AVAILABLE', 'B2-002', NOW(), NOW()),
(5, 3, 'RESERVED', 'C3-001', NOW(), NOW()),
(6, 3, 'AVAILABLE', 'C3-002', NOW(), NOW());