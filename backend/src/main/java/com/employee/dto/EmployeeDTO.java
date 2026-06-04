package com.employee.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public record EmployeeDTO(
    Long id,
    @NotBlank(message = "First name is required")
    String firstName,
    @NotBlank(message = "Last name is required")
    String lastName,
    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    String email,
    String phone,
    @NotBlank(message = "Position is required")
    String position,
    @NotBlank(message = "Department is required")
    String department,
    @NotNull(message = "Salary is required")
    @DecimalMin(value = "0.01", message = "Salary must be greater than zero")
    BigDecimal salary,
    @NotNull(message = "Hire date is required")
    LocalDate hireDate
) {
}
