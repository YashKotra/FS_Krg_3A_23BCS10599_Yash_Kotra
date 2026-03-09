# HealthHub - Spring Boot REST API

A comprehensive Spring Boot REST API for HealthHub application demonstrating layered architecture, IoC, DI, CRUD operations, DTO mapping, validation, and global exception handling.

## Features

- **Layered Architecture**: Controller, Service, Repository layers
- **IoC and Dependency Injection**: Using @Autowired, @Service, @Repository
- **CRUD Operations**: Full Create, Read, Update, Delete for Patients and Health Records
- **DTO Mapping**: Separation of internal models from API responses
- **Validation**: Jakarta Validation annotations (@NotNull, @Email, etc.)
- **Global Exception Handling**: @ControllerAdvice for consistent error responses
- **Database**: H2 in-memory database with JPA/Hibernate

## Technologies Used

- Spring Boot 3.2.0
- Spring Web
- Spring Data JPA
- H2 Database
- Jakarta Validation
- Maven

## Project Structure

```
src/
├── main/
│   ├── java/com/example/healthhub/
│   │   ├── HealthHubApplication.java
│   │   ├── controller/
│   │   │   ├── PatientController.java
│   │   │   └── HealthRecordController.java
│   │   ├── dto/
│   │   │   ├── PatientDTO.java
│   │   │   └── HealthRecordDTO.java
│   │   ├── entity/
│   │   │   ├── Patient.java
│   │   │   └── HealthRecord.java
│   │   ├── exception/
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── repository/
│   │   │   ├── PatientRepository.java
│   │   │   └── HealthRecordRepository.java
│   │   └── service/
│   │       ├── PatientService.java
│   │       ├── PatientServiceImpl.java
│   │       ├── HealthRecordService.java
│   │       └── HealthRecordServiceImpl.java
│   └── resources/
│       └── application.properties
└── test/
    └── java/com/example/healthhub/
        └── HealthHubApplicationTests.java
```

## API Endpoints

### Patients

- `GET /api/patients` - Get all patients
- `GET /api/patients/{id}` - Get patient by ID
- `POST /api/patients` - Create a new patient
- `PUT /api/patients/{id}` - Update a patient
- `DELETE /api/patients/{id}` - Delete a patient

### Health Records

- `GET /api/health-records` - Get all health records
- `GET /api/health-records/patient/{patientId}` - Get health records by patient ID
- `GET /api/health-records/{id}` - Get health record by ID
- `POST /api/health-records` - Create a new health record
- `PUT /api/health-records/{id}` - Update a health record
- `DELETE /api/health-records/{id}` - Delete a health record

## Running the Application

1. **Prerequisites**:
   - Java 17 or higher
   - Maven 3.6+

2. **Clone and Build**:

   ```bash
   cd HealthHub
   mvn clean install
   ```

3. **Run the Application**:

   ```bash
   mvn spring-boot:run
   ```

4. **Access the Application**:
   - API Base URL: `http://localhost:8080`
   - H2 Console: `http://localhost:8080/h2-console`
     - JDBC URL: `jdbc:h2:mem:testdb`
     - Username: `sa`
     - Password: `password`

## Testing

Run the tests with:

```bash
mvn test
```

## Sample API Usage

### Create a Patient

```bash
POST /api/patients
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "dateOfBirth": "1990-01-01"
}
```

### Create a Health Record

```bash
POST /api/health-records
Content-Type: application/json

{
  "patientId": 1,
  "recordDate": "2023-10-01",
  "diagnosis": "Common Cold",
  "treatment": "Rest and fluids",
  "notes": "Patient advised to take rest"
}
```

## Validation Rules

- **Patient**:
  - Name: 2-100 characters, required
  - Email: Valid email format, unique, required
  - Phone: Valid phone number format, required
  - Date of Birth: Past date, required

- **Health Record**:
  - Patient ID: Must exist, required
  - Record Date: Required
  - Diagnosis: 1-500 characters, required
  - Treatment: 0-1000 characters
  - Notes: 0-1000 characters

## Error Handling

The application uses global exception handling to provide consistent error responses:

- **400 Bad Request**: Validation errors or invalid data
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Unexpected errors

Error response format:

```json
{
  "fieldName": "error message"
}
```

## Database Schema

### Patients Table

- id (Primary Key)
- name
- email (Unique)
- phone
- date_of_birth

### Health Records Table

- id (Primary Key)
- patient_id (Foreign Key)
- record_date
- diagnosis
- treatment
- notes

This project demonstrates all the key concepts required for the Spring Boot REST API assignment, including proper separation of concerns, dependency injection, and robust error handling.
