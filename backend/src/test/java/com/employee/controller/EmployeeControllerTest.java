package com.employee.controller;

import com.employee.dto.EmployeeDTO;
import com.employee.service.EmployeeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.*;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmployeeService employeeService;

    private ObjectMapper objectMapper;
    private EmployeeDTO sampleDTO;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        sampleDTO = new EmployeeDTO(
                1L, "John", "Doe", "john.doe@example.com",
                "555-0100", "Engineer", "Engineering",
                new BigDecimal("85000"), LocalDate.of(2023, 1, 15)
        );
    }

    @Test
    void createEmployee_shouldReturn201WithCreatedEmployee() throws Exception {
        EmployeeDTO inputDTO = new EmployeeDTO(
                null, "John", "Doe", "john.doe@example.com",
                "555-0100", "Engineer", "Engineering",
                new BigDecimal("85000"), LocalDate.of(2023, 1, 15)
        );
        when(employeeService.createEmployee(any(EmployeeDTO.class))).thenReturn(sampleDTO);

        mockMvc.perform(post("/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inputDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"))
                .andExpect(jsonPath("$.position").value("Engineer"))
                .andExpect(jsonPath("$.department").value("Engineering"));

        verify(employeeService).createEmployee(any(EmployeeDTO.class));
    }

    @Test
    void getAllEmployees_shouldReturnPageOfEmployees() throws Exception {
        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.ASC, "id"));
        Page<EmployeeDTO> page = new PageImpl<>(List.of(sampleDTO), pageable, 1);
        when(employeeService.getAllEmployees(any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/employees")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sortBy", "id")
                        .param("direction", "ASC"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(1))
                .andExpect(jsonPath("$.content[0].firstName").value("John"))
                .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    void getAllEmployees_shouldUseDefaultParams() throws Exception {
        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.ASC, "id"));
        Page<EmployeeDTO> page = new PageImpl<>(List.of(), pageable, 0);
        when(employeeService.getAllEmployees(any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/employees"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements").value(0));
    }

    @Test
    void getEmployeeById_shouldReturnEmployee() throws Exception {
        when(employeeService.getEmployeeById(1L)).thenReturn(sampleDTO);

        mockMvc.perform(get("/employees/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.email").value("john.doe@example.com"));
    }

    @Test
    void getEmployeeById_shouldThrowWhenNotFound() {
        when(employeeService.getEmployeeById(99L))
                .thenThrow(new RuntimeException("Employee not found with id: 99"));

        assertThrows(Exception.class, () ->
                mockMvc.perform(get("/employees/99")));
    }

    @Test
    void updateEmployee_shouldReturnUpdatedEmployee() throws Exception {
        EmployeeDTO updateDTO = new EmployeeDTO(
                1L, "Jane", "Smith", "jane@example.com",
                "555-0200", "Manager", "Product",
                new BigDecimal("95000"), LocalDate.of(2024, 6, 1)
        );
        when(employeeService.updateEmployee(eq(1L), any(EmployeeDTO.class))).thenReturn(updateDTO);

        mockMvc.perform(put("/employees/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Jane"))
                .andExpect(jsonPath("$.lastName").value("Smith"))
                .andExpect(jsonPath("$.position").value("Manager"));
    }

    @Test
    void deleteEmployee_shouldReturn204() throws Exception {
        doNothing().when(employeeService).deleteEmployee(1L);

        mockMvc.perform(delete("/employees/1"))
                .andExpect(status().isNoContent());

        verify(employeeService).deleteEmployee(1L);
    }

    @Test
    void deleteEmployee_shouldThrowWhenNotFound() {
        doThrow(new RuntimeException("Employee not found with id: 99"))
                .when(employeeService).deleteEmployee(99L);

        assertThrows(Exception.class, () ->
                mockMvc.perform(delete("/employees/99")));
    }
}
