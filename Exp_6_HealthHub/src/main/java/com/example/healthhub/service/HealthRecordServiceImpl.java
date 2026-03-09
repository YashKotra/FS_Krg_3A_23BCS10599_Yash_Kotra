package com.example.healthhub.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.healthhub.dto.HealthRecordDTO;
import com.example.healthhub.entity.HealthRecord;
import com.example.healthhub.entity.Patient;
import com.example.healthhub.repository.HealthRecordRepository;
import com.example.healthhub.repository.PatientRepository;

@Service
public class HealthRecordServiceImpl implements HealthRecordService {

    @Autowired
    private HealthRecordRepository healthRecordRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public List<HealthRecordDTO> getAllHealthRecords() {
        return healthRecordRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<HealthRecordDTO> getHealthRecordsByPatientId(Long patientId) {
        return healthRecordRepository.findByPatientId(patientId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public HealthRecordDTO getHealthRecordById(Long id) {
        HealthRecord healthRecord = healthRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Health record not found"));
        return convertToDTO(healthRecord);
    }

    @Override
    public HealthRecordDTO createHealthRecord(HealthRecordDTO healthRecordDTO) {
        Patient patient = patientRepository.findById(healthRecordDTO.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        HealthRecord healthRecord = convertToEntity(healthRecordDTO, patient);
        HealthRecord savedHealthRecord = healthRecordRepository.save(healthRecord);
        return convertToDTO(savedHealthRecord);
    }

    @Override
    public HealthRecordDTO updateHealthRecord(Long id, HealthRecordDTO healthRecordDTO) {
        HealthRecord existingHealthRecord = healthRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Health record not found"));
        Patient patient = patientRepository.findById(healthRecordDTO.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        existingHealthRecord.setPatient(patient);
        existingHealthRecord.setRecordDate(healthRecordDTO.getRecordDate());
        existingHealthRecord.setDiagnosis(healthRecordDTO.getDiagnosis());
        existingHealthRecord.setTreatment(healthRecordDTO.getTreatment());
        existingHealthRecord.setNotes(healthRecordDTO.getNotes());
        HealthRecord updatedHealthRecord = healthRecordRepository.save(existingHealthRecord);
        return convertToDTO(updatedHealthRecord);
    }

    @Override
    public void deleteHealthRecord(Long id) {
        if (!healthRecordRepository.existsById(id)) {
            throw new RuntimeException("Health record not found");
        }
        healthRecordRepository.deleteById(id);
    }

    private HealthRecordDTO convertToDTO(HealthRecord healthRecord) {
        return new HealthRecordDTO(
                healthRecord.getId(),
                healthRecord.getPatient().getId(),
                healthRecord.getRecordDate(),
                healthRecord.getDiagnosis(),
                healthRecord.getTreatment(),
                healthRecord.getNotes()
        );
    }

    private HealthRecord convertToEntity(HealthRecordDTO healthRecordDTO, Patient patient) {
        HealthRecord healthRecord = new HealthRecord();
        healthRecord.setPatient(patient);
        healthRecord.setRecordDate(healthRecordDTO.getRecordDate());
        healthRecord.setDiagnosis(healthRecordDTO.getDiagnosis());
        healthRecord.setTreatment(healthRecordDTO.getTreatment());
        healthRecord.setNotes(healthRecordDTO.getNotes());
        return healthRecord;
    }
}