# Library Management System - Backend

Spring Boot backend with JWT authentication, catalog management, and OpenLibrary API integration.

## 🚀 Quick Start

### Prerequisites
- Java 17
- Maven 3.6+
- (Optional) Docker

### Run Locally
```bash
mvn clean install
mvn spring-boot:run
```

### Docker
```bash
docker build -t library-backend .
docker run -p 8080:8080 library-backend
```

## 📁 Project Structure
```
backend/
├── controller/     # REST endpoints (Auth, Catalog, Admin, User)
├── service/        # Business logic (Catalog, Copy, ISBN lookup)
├── repository/     # Data access layer
├── entity/         # JPA entities (Catalog, Copy, User, Role)
├── dto/            # Data Transfer Objects
├── security/       # JWT, Spring Security config
└── exception/      # Global exception handling
```

## 🔧 Tech Stack
- **Spring Boot 3.5.5** with Java 17
- **Spring Security + JWT** authentication
- **H2 Database** (dev) / PostgreSQL ready
- **OpenLibrary API** integration
- **Docker** containerization

## 🔐 Authentication
- JWT-based stateless authentication
- Roles: `ROLE_USER`, `ROLE_ADMIN`
- BCrypt password encoding
- Protected endpoints with role-based access

## 📚 Core Features
1. **Catalog Management**: ISBN-based book entries with OpenLibrary metadata
2. **Copy System**: Track physical copies (Available/Loaned/Reserved)
3. **User Management**: Profile and admin user management
4. **Public API**: Search and browse catalog without authentication

## 🌐 API Example Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | User login | No |
| GET | `/catalog/search` | Search books | No |
| POST | `/api/admin/catalog/isbn` | Add book by ISBN | Admin |
| GET | `/api/users/profile` | User profile | User |

## ⚙️ Configuration
Key settings in `application.properties`:
```properties
# Dev database
spring.datasource.url=jdbc:h2:mem:libappdb

# JWT
jwt.secret=your-secret-key
jwt.expiration.ms=86400000

# OpenLibrary API
app.external.openlibrary.url=https://openlibrary.org
```

## 🗃️ Database
Pre-loaded sample data includes:
- Test users with roles
- Catalog entries (1984, Dom Casmurro, O Alquimista)
- Copy records with statuses

## 🔄 External Integration
Fetches book metadata from OpenLibrary API:
- Title, authors, publisher
- Cover images
- Description and genres/subjects
- Fallback to manual entry if API fails

## 🐳 Deployment
Production-ready Docker setup:
```dockerfile
FROM eclipse-temurin:24-jdk
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests
CMD ["java", "-jar", "target/*.jar"]
EXPOSE 8080
```

## 📝 Notes
- Default port: `8080`
- H2 Console: `http://localhost:8080/h2-console`
- JWT expiration: 24 hours
- CORS configured for frontend dev (localhost:3000, 5173)

---

**Environment**: Development configuration uses H2 in-memory DB. For production, configure PostgreSQL/MySQL database.