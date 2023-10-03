# Run the development server
run-dev:
	@echo "Starting development server..."
	./gradlew bootRun --args='--spring.profiles.active=dev'

# Run the production server
run-prod:
	@echo "Starting production server..."
	./gradlew bootRun --args='--spring.profiles.active=prod'

# Run the test server
run-test:
	@echo "Starting test server..."
	./gradlew bootRun --args='--spring.profiles.active=test'

# Run the linter
lint:
	@echo "Running linter..."
	./gradlew check

# Run the linter and fix issues
lint-fix:
	@echo "Running linter..."
	./gradlew ktlintFormat

# Run the tests
test:
	@echo "Running tests..."
	./gradlew test

# Build the application
build:
	@echo "Building application..."
	./gradlew build

# Clean the build
clean:
	@echo "Cleaning build..."
	./gradlew clean
