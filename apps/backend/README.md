# Alchemical Finance Project Guide

This guide provides insights into the setup, architecture and standards used in the Alchemical Finance project. The project implements an n-tier architectural style isolating the web layer, service layer and the data access layer. It's written in Kotlin and managed with Gradle.

## Project Architecture and Principles

The project makes use of various architectures and patterns to ensure a clean, efficient and scalable codebase:

- **Layered/N-tier Architecture:** This separates concerns of the application into different layers such as controllers, services, and repositories/models.
- **Domain-Driven Design (DDD):** This pattern involves the representation of meaningful business concepts with domain models.
- **Repository Pattern:** Utilized for data access, abstracts database operations, and promotes code reusability.
- **JSON Web Token (JWT):** Adopted for authorization and securing endpoints.

## Key Directories and Files

| File / Directory      | Purpose                                                                                                                        |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `Application.kt`      | Contains the entry point for the Spring Boot application.                                                                      |
| `SecurityConfig.kt`   | Consists of security configurations for the application.                                                                       |
| `interfaces/api`      | Houses API controllers which manage HTTP requests and responses.                                                               |
| `interfaces/database` | Contains the domain model and the repository used for performing database operations.                                          |

## Getting Started

Ensure Kotlin and Gradle are installed on your machine. If not, they can be installed via SDKMAN!.

```zsh
sdk install kotlin
sdk install gradle
```

## Project Commands

### Clean Project

```zsh
./gradlew clean
```

### KtLint (Linting and Formatting)

```zsh
# Check code formatting
./gradlew ktlintCheck

# Format code
./gradlew ktlintFormat
```

### JUnit (Testing)

```zsh
./gradlew test
```

### Run Application

```zsh
./gradlew run
```

### Build (JAR)

```zsh
./gradlew build
```

## Project Structure

The project follows a directory structure as follows:

- `src`: Contains all the source code including Kotlin code under `main/kotlin` and Resources under `main/resources`.
- `test`: Contains all the tests for the source code.
- `src/main/resources/db/migration`: Houses all database migration scripts.

## Database Migrations with Flyway

Flyway ensures your database schema is always in sync with your codebase. It arranges SQL scripts sequentially. Changes are applied in a consistent manner across all environments. Learn more in the `src/main/resources/db/migration` directory.