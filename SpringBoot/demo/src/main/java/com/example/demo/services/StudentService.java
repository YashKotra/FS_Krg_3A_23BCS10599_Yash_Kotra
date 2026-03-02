package com.example.demo.services;

import java.util.List;

import com.example.demo.dto.StudentDTO;
import com.example.demo.entity.Student;

public interface StudentService {
    Student createStudent(StudentDTO studentSTO);
    List<Student> getAllStudents();
}
