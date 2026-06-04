package com.employee.service;

import com.employee.dto.EmployeeDTO;
import com.employee.model.Employee;
import com.employee.repository.EmployeeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    private Employee sampleEmployee;
    private EmployeeDTO sampleDTO;

    @BeforeEach
    void setUp() {
        sampleEmployee = new Employee();
        sampleEmployee.setId(1L);
        sampleEmployee.setFirstName("John");
        sampleEmployee.setLastName("Doe");
        sampleEmployee.setEmail("john.doe@example.com");
        sampleEmployee.setPhone("555-0100");
        sampleEmployee.setPosition("Engineer");
        sampleEmployee.setDepartment("Engineering");
        sampleEmployee.setSalary(new BigDecimal("85000"));
        sampleEmployee.setHireDate(LocalDate.of(2023, 1, 15));
        sampleEmployee.setCreatedAt(LocalDateTime.now());
        sampleEmployee.setUpdatedAt(LocalDateTime.now());

        sampleDTO = new EmployeeDTO(
                null, "John", "Doe", "john.doe@example.com",
                "555-0100", "Engineer", "Engineering",
                new BigDecimal("85000"), LocalDate.of(2023, 1, 15)
        );
    }

    @Test
    void createEmployee_shouldSaveAndReturnDTO() {
        when(employeeRepository.save(any(Employee.class))).thenReturn(sampleEmployee);

        EmployeeDTO result = employeeService.createEmployee(sampleDTO);

        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.firstName()).isEqualTo("John");
        assertThat(result.lastName()).isEqualTo("Doe");
        assertThat(result.email()).isEqualTo("john.doe@example.com");
        assertThat(result.phone()).isEqualTo("555-0100");
        assertThat(result.position()).isEqualTo("Engineer");
        assertThat(result.department()).isEqualTo("Engineering");
        assertThat(result.salary()).isEqualByComparingTo(new BigDecimal("85000"));
        assertThat(result.hireDate()).isEqualTo(LocalDate.of(2023, 1, 15));
        verify(employeeRepository).save(any(Employee.class));
    }

    @Test
    void createEmployee_shouldMapAllDTOFieldsToEntity() {
        when(employeeRepository.save(any(Employee.class))).thenAnswer(invocation -> {
            Employee saved = invocation.getArgument(0);
            assertThat(saved.getFirstName()).isEqualTo("John");
            assertThat(saved.getLastName()).isEqualTo("Doe");
            assertThat(saved.getEmail()).isEqualTo("john.doe@example.com");
            assertThat(saved.getPhone()).isEqualTo("555-0100");
            assertThat(saved.getPosition()).isEqualTo("Engineer");
            assertThat(saved.getDepartment()).isEqualTo("Engineering");
            assertThat(saved.getSalary()).isEqualByComparingTo(new BigDecimal("85000"));
            assertThat(saved.getHireDate()).isEqualTo(LocalDate.of(2023, 1, 15));
            saved.setId(1L);
            saved.setCreatedAt(LocalDateTime.now());
            saved.setUpdatedAt(LocalDateTime.now());
            return saved;
        });

        employeeService.createEmployee(sampleDTO);

        verify(employeeRepository).save(any(Employee.class));
    }

    @Test
    void getAllEmployees_shouldReturnPageOfDTOs() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("id"));
        Page<Employee> page = new PageImpl<>(List.of(sampleEmployee), pageable, 1);
        when(employeeRepository.findAll(pageable)).thenReturn(page);

        Page<EmployeeDTO> result = employeeService.getAllEmployees(pageable);

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).firstName()).isEqualTo("John");
        assertThat(result.getTotalElements()).isEqualTo(1);
    }

    @Test
    void getAllEmployees_shouldReturnEmptyPageWhenNoEmployees() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Employee> emptyPage = new PageImpl<>(List.of(), pageable, 0);
        when(employeeRepository.findAll(pageable)).thenReturn(emptyPage);

        Page<EmployeeDTO> result = employeeService.getAllEmployees(pageable);

        assertThat(result.getContent()).isEmpty();
        assertThat(result.getTotalElements()).isZero();
    }

    @Test
    void getEmployeeById_shouldReturnDTOWhenFound() {
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(sampleEmployee));

        EmployeeDTO result = employeeService.getEmployeeById(1L);

        assertThat(result.id()).isEqualTo(1L);
        assertThat(result.firstName()).isEqualTo("John");
        assertThat(result.email()).isEqualTo("john.doe@example.com");
    }

    @Test
    void getEmployeeById_shouldThrowWhenNotFound() {
        when(employeeRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> employeeService.getEmployeeById(99L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Employee not found with id: 99");
    }

    @Test
    void updateEmployee_shouldUpdateFieldsAndReturnDTO() {
        EmployeeDTO updateDTO = new EmployeeDTO(
                null, "Jane", "Smith", "jane.smith@example.com",
                "555-0200", "Manager", "Product",
                new BigDecimal("95000"), LocalDate.of(2024, 6, 1)
        );

        Employee updatedEmployee = new Employee();
        updatedEmployee.setId(1L);
        updatedEmployee.setFirstName("Jane");
        updatedEmployee.setLastName("Smith");
        updatedEmployee.setEmail("jane.smith@example.com");
        updatedEmployee.setPhone("555-0200");
        updatedEmployee.setPosition("Manager");
        updatedEmployee.setDepartment("Product");
        updatedEmployee.setSalary(new BigDecimal("95000"));
        updatedEmployee.setHireDate(LocalDate.of(2024, 6, 1));
        updatedEmployee.setCreatedAt(LocalDateTime.now());
        updatedEmployee.setUpdatedAt(LocalDateTime.now());

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(sampleEmployee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(updatedEmployee);

        EmployeeDTO result = employeeService.updateEmployee(1L, updateDTO);

        assertThat(result.firstName()).isEqualTo("Jane");
        assertThat(result.lastName()).isEqualTo("Smith");
        assertThat(result.email()).isEqualTo("jane.smith@example.com");
        assertThat(result.position()).isEqualTo("Manager");
        assertThat(result.department()).isEqualTo("Product");
        assertThat(result.salary()).isEqualByComparingTo(new BigDecimal("95000"));
        verify(employeeRepository).findById(1L);
        verify(employeeRepository).save(any(Employee.class));
    }

    @Test
    void updateEmployee_shouldThrowWhenNotFound() {
        when(employeeRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> employeeService.updateEmployee(99L, sampleDTO))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Employee not found with id: 99");

        verify(employeeRepository, never()).save(any());
    }

    @Test
    void deleteEmployee_shouldDeleteWhenExists() {
        when(employeeRepository.existsById(1L)).thenReturn(true);

        employeeService.deleteEmployee(1L);

        verify(employeeRepository).deleteById(1L);
    }

    @Test
    void deleteEmployee_shouldThrowWhenNotFound() {
        when(employeeRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> employeeService.deleteEmployee(99L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Employee not found with id: 99");

        verify(employeeRepository, never()).deleteById(any());
    }
}
