package com.example.healthhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.healthhub.dto.HealthRecordDTO;
import com.example.healthhub.service.HealthRecordService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/health-records")
public class HealthRecordController {

    @Autowired
    private HealthRecordService healthRecordService;

    @GetMapping
    public ResponseEntity<List<HealthRecordDTO>> getAllHealthRecords() {
        List<HealthRecordDTO> healthRecords = healthRecordService.getAllHealthRecords();
        return ResponseEntity.ok(healthRecords);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<HealthRecordDTO>> getHealthRecordsByPatientId(@PathVariable Long patientId) {
        List<HealthRecordDTO> healthRecords = healthRecordService.getHealthRecordsByPatientId(patientId);
        return ResponseEntity.ok(healthRecords);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HealthRecordDTO> getHealthRecordById(@PathVariable Long id) {
        HealthRecordDTO healthRecord = healthRecordService.getHealthRecordById(id);
        return ResponseEntity.ok(healthRecord);
    }

    @PostMapping
    public ResponseEntity<HealthRecordDTO> createHealthRecord(@Valid @RequestBody HealthRecordDTO healthRecordDTO) {
        HealthRecordDTO createdHealthRecord = healthRecordService.createHealthRecord(healthRecordDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdHealthRecord);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HealthRecordDTO> updateHealthRecord(@PathVariable Long id, @Valid @RequestBody HealthRecordDTO healthRecordDTO) {
        HealthRecordDTO updatedHealthRecord = healthRecordService.updateHealthRecord(id, healthRecordDTO);
        return ResponseEntity.ok(updatedHealthRecord);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHealthRecord(@PathVariable Long id) {
        healthRecordService.deleteHealthRecord(id);
        return ResponseEntity.noContent().build();
    }
}