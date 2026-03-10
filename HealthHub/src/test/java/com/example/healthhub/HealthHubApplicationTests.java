package com.example.healthhub;

import com.example.healthhub.dto.PatientDTO;
import com.example.healthhub.service.PatientService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class HealthHubApplicationTests {

    @Autowired
    private PatientService patientService;

    @Test
    public void testCreatePatient() {
        PatientDTO patientDTO = new PatientDTO();
        patientDTO.setName("John Doe");
        patientDTO.setEmail("john.doe@example.com");
        patientDTO.setPhone("+1234567890");
        patientDTO.setDateOfBirth(LocalDate.of(1990, 1, 1));

        PatientDTO createdPatient = patientService.createPatient(patientDTO);
        assertNotNull(createdPatient.getId());
    }
}