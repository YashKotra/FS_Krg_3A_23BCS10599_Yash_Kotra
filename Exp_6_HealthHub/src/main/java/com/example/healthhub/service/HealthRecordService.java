package com.example.healthhub.service;

import java.util.List;

import com.example.healthhub.dto.HealthRecordDTO;

public interface HealthRecordService {
    List<HealthRecordDTO> getAllHealthRecords();
    List<HealthRecordDTO> getHealthRecordsByPatientId(Long patientId);
    HealthRecordDTO getHealthRecordById(Long id);
    HealthRecordDTO createHealthRecord(HealthRecordDTO healthRecordDTO);
    HealthRecordDTO updateHealthRecord(Long id, HealthRecordDTO healthRecordDTO);
    void deleteHealthRecord(Long id);
}