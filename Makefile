# Run the frontend server
frontend:
	@echo "Starting frontend..."
	yarn dev

# Run the backend server
backend:
	@echo "Starting backend..."
	cd apps/backend && ./gradlew bootRun --args='--spring.profiles.active=dev'

# Run the production server
backend-prod:
	@echo "Starting production server..."
	cd apps/backend && ./gradlew bootRun --args='--spring.profiles.active=prod'

# Run the test server
backend-test:
	@echo "Starting test server..."
	cd apps/backend && ./gradlew bootRun --args='--spring.profiles.active=test'

# Run the linter
ktlint:
	@echo "Running linter..."
	./gradlew check

# Run the linter and fix issues
ktlint-fix:
	@echo "Running linter..."
	./gradlew ktlintFormat

# Run the tests
backend-test:
	@echo "Running tests..."
	./gradlew test

# Build the application
backend-build:
	@echo "Building application..."
	./gradlew build

# Clean the build
backend-clean:
	@echo "Cleaning build..."
	./gradlew clean
