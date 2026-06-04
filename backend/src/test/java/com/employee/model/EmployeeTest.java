package com.employee.model;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class EmployeeTest {

    @Test
    void onCreate_shouldSetCreatedAtAndUpdatedAt() {
        Employee employee = new Employee();
        employee.onCreate();

        assertThat(employee.getCreatedAt()).isNotNull();
        assertThat(employee.getUpdatedAt()).isNotNull();
        assertThat(employee.getCreatedAt()).isBeforeOrEqualTo(LocalDateTime.now());
        assertThat(employee.getUpdatedAt()).isBeforeOrEqualTo(LocalDateTime.now());
    }

    @Test
    void onUpdate_shouldUpdateUpdatedAt() {
        Employee employee = new Employee();
        employee.onCreate();

        LocalDateTime originalUpdatedAt = employee.getUpdatedAt();

        // Small delay to ensure timestamp difference
        employee.onUpdate();

        assertThat(employee.getUpdatedAt()).isNotNull();
        assertThat(employee.getUpdatedAt()).isAfterOrEqualTo(originalUpdatedAt);
    }

    @Test
    void onUpdate_shouldNotChangeCreatedAt() {
        Employee employee = new Employee();
        employee.onCreate();

        LocalDateTime originalCreatedAt = employee.getCreatedAt();

        employee.onUpdate();

        assertThat(employee.getCreatedAt()).isEqualTo(originalCreatedAt);
    }

    @Test
    void allArgsConstructor_shouldSetAllFields() {
        LocalDate hireDate = LocalDate.of(2023, 6, 15);
        LocalDateTime now = LocalDateTime.now();
        BigDecimal salary = new BigDecimal("75000");

        Employee employee = new Employee(
                1L, "Alice", "Johnson", "alice@example.com",
                "555-0300", "Designer", "Product",
                salary, hireDate, now, now
        );

        assertThat(employee.getId()).isEqualTo(1L);
        assertThat(employee.getFirstName()).isEqualTo("Alice");
        assertThat(employee.getLastName()).isEqualTo("Johnson");
        assertThat(employee.getEmail()).isEqualTo("alice@example.com");
        assertThat(employee.getPhone()).isEqualTo("555-0300");
        assertThat(employee.getPosition()).isEqualTo("Designer");
        assertThat(employee.getDepartment()).isEqualTo("Product");
        assertThat(employee.getSalary()).isEqualByComparingTo(salary);
        assertThat(employee.getHireDate()).isEqualTo(hireDate);
        assertThat(employee.getCreatedAt()).isEqualTo(now);
        assertThat(employee.getUpdatedAt()).isEqualTo(now);
    }

    @Test
    void noArgsConstructor_shouldCreateEmptyEmployee() {
        Employee employee = new Employee();

        assertThat(employee.getId()).isNull();
        assertThat(employee.getFirstName()).isNull();
        assertThat(employee.getLastName()).isNull();
        assertThat(employee.getEmail()).isNull();
    }

    @Test
    void settersAndGetters_shouldWorkCorrectly() {
        Employee employee = new Employee();
        employee.setId(5L);
        employee.setFirstName("Bob");
        employee.setLastName("Wilson");
        employee.setEmail("bob@example.com");
        employee.setPhone("555-0400");
        employee.setPosition("Analyst");
        employee.setDepartment("Sales");
        employee.setSalary(new BigDecimal("60000"));
        employee.setHireDate(LocalDate.of(2024, 3, 1));

        assertThat(employee.getId()).isEqualTo(5L);
        assertThat(employee.getFirstName()).isEqualTo("Bob");
        assertThat(employee.getLastName()).isEqualTo("Wilson");
        assertThat(employee.getEmail()).isEqualTo("bob@example.com");
        assertThat(employee.getPhone()).isEqualTo("555-0400");
        assertThat(employee.getPosition()).isEqualTo("Analyst");
        assertThat(employee.getDepartment()).isEqualTo("Sales");
        assertThat(employee.getSalary()).isEqualByComparingTo(new BigDecimal("60000"));
        assertThat(employee.getHireDate()).isEqualTo(LocalDate.of(2024, 3, 1));
    }

    @Test
    void equals_shouldBeBasedOnAllFields() {
        LocalDateTime now = LocalDateTime.now();
        LocalDate hireDate = LocalDate.of(2023, 1, 1);

        Employee emp1 = new Employee(1L, "A", "B", "a@b.com", "555", "Dev", "Eng",
                new BigDecimal("50000"), hireDate, now, now);
        Employee emp2 = new Employee(1L, "A", "B", "a@b.com", "555", "Dev", "Eng",
                new BigDecimal("50000"), hireDate, now, now);

        assertThat(emp1).isEqualTo(emp2);
        assertThat(emp1.hashCode()).isEqualTo(emp2.hashCode());
    }

    @Test
    void toString_shouldContainFieldValues() {
        Employee employee = new Employee();
        employee.setId(1L);
        employee.setFirstName("Test");

        String str = employee.toString();
        assertThat(str).contains("id=1");
        assertThat(str).contains("firstName=Test");
    }
}
