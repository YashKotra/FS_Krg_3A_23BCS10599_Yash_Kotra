package com.example.demo.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StudentDTO {
    @NotBlank(message ="Name cannot be empty")
    private String name;

    @Email(message ="Email cannot be empty")
    private String email;

    @NotBlank(message ="Course cannot be empty")
    private String course;
    
}
