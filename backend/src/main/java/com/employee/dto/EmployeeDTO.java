package com.employee.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record EmployeeDTO(
    Long id,
    String firstName,
    String lastName,
    String email,
    String phone,
    String position,
    String department,
    BigDecimal salary,
    LocalDate hireDate
) {
}
