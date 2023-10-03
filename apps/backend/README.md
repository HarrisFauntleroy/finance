Install Kotlin: If you haven't installed Kotlin, you can download it from
Kotlin's GitHub releases or install it via SDKMAN!:

### Dependencies

```zsh
sdk install kotlin

sdk install gradle
```

# Clean

```
./gradlew clean
```

### KtLint

```zsh
./gradlew ktlintCheck

./gradlew ktlintFormat
```

### JUnit

```zsh
./gradlew test
```

### Run

```zsh
./gradlew run
```

### Build (JAR)

```zsh
./gradlew build
```

## Project Structure

The backend of the application follows a structured directory hierarchy to
ensure a clean separation of concerns and ease of navigation. Here's an
overview:

### Source Root (`src`)

#### Main (`main`)

##### Kotlin (`kotlin`)

###### `com.yourappname` (located at `com/yourappname`)

- **application**:

  - Contains application level concerns like the main function, application
    configuration, etc.

- **domain**:

  - Contains business logic, entities, and use cases.

- **infrastructure**:

  - Contains code that communicates with external systems like databases,
    external APIs, etc.

  - **database**:

    - Database configurations, migrations, repositories, etc.

    - **migrations**:
      - Database migration scripts.

  - **jobs**:
    - Background job configurations and implementations.

- **interfaces**:

  - Contains code for the interface adapters like REST controllers, gRPC, etc.

  - **api**:

    - REST controllers, request/response objects, etc.

  - **rpc**:
    - gRPC or other RPC configurations and implementations.

##### Resources (`resources`)

- **application.properties**:
  - Application properties file.

#### Test (`test`)

- **kotlin**:

  - Kotlin test files.

- **resources**:
  - Test resources.
