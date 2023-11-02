# Alchemical Finance Setup

Ensure Kotlin and Gradle are installed on your machine. If not, they can be
installed using SDKMAN!.

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

### Source Root (`src`)

#### Main Directory (`main`)

##### Kotlin Code (`kotlin`)

- **`com.yourappname`** (located at `com/yourappname`):

  - **application**:

    - Application level concerns: main function, configuration, etc.

  - **domain**:

    - Business logic, entities, and use cases.

  - **infrastructure**:

    - Interaction with external systems: databases, external APIs, etc.
      - **database**:
        - Configurations, migrations, repositories, etc.
          - **migrations**:
            - Database migration scripts using Flyway.
      - **jobs**:
        - Background job configurations and implementations.

  - **interfaces**:
    - Interface adapters: REST controllers, gRPC, etc.
      - **api**:
        - REST controllers, request/response objects, etc.
      - **rpc**:
        - gRPC or other RPC configurations and implementations.

##### Resources (`resources`)

- **application.properties**:
  - Application properties file.

#### Test Directory (`test`)

- **kotlin**:

  - Kotlin test files.

- **resources**:
  - Test resources.

## Flyway Database Migrations

Flyway is a database migration tool which ensures that your database schema is
always in sync with your codebase. Migrations are version-controlled SQL scripts
which are run in order, ensuring that schema changes are applied in a consistent
manner across all environments.

Here's a simplified overview of how Flyway works:

1. **Migration Script Creation**:

- Create SQL migration scripts for schema changes, each script having a unique
  version.
- Place scripts in the `src/main/resources/db/migration` directory.

2. **Configuration**:

- Configure Flyway in your `application.properties` file, specifying the
  database connection and migrations location.

3. **Execution**:

- On application startup or through a manual trigger, Flyway checks the database
  to see which scripts have been applied.
- Any not-yet-run scripts are executed in order to update the database schema.

4. **Verification**:

- Flyway records which scripts have been run, ensuring they aren’t run twice.
- Verify the schema changes in your database and ensure application
  functionality.

This process ensures that your database schema evolves consistently along with
your application code, making database schema management easier and error-free.

---

This structure should provide a clean and organized setup guide for your Kotlin
project along with an explanation of how Flyway manages database migrations.
