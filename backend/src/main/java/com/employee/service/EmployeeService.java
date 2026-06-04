package com.employee.service;

import com.employee.dto.EmployeeDTO;
import com.employee.exception.ResourceNotFoundException;
import com.employee.model.Employee;
import com.employee.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeService {
    
    private final EmployeeRepository employeeRepository;
    
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();
        mapDtoToEntity(employeeDTO, employee);
        
        Employee savedEmployee = employeeRepository.save(employee);
        return convertToDTO(savedEmployee);
    }
    
    @Transactional(readOnly = true)
    public Page<EmployeeDTO> getAllEmployees(Pageable pageable) {
        return employeeRepository.findAll(pageable)
            .map(this::convertToDTO);
    }
    
    @Transactional(readOnly = true)
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = findEmployeeOrThrow(id);
        return convertToDTO(employee);
    }
    
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Employee employee = findEmployeeOrThrow(id);
        mapDtoToEntity(employeeDTO, employee);
        
        Employee updatedEmployee = employeeRepository.save(employee);
        return convertToDTO(updatedEmployee);
    }
    
    public void deleteEmployee(Long id) {
        findEmployeeOrThrow(id);
        employeeRepository.deleteById(id);
    }
    
    private Employee findEmployeeOrThrow(Long id) {
        return employeeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));
    }
    
    private void mapDtoToEntity(EmployeeDTO dto, Employee entity) {
        entity.setFirstName(dto.firstName());
        entity.setLastName(dto.lastName());
        entity.setEmail(dto.email());
        entity.setPhone(dto.phone());
        entity.setPosition(dto.position());
        entity.setDepartment(dto.department());
        entity.setSalary(dto.salary());
        entity.setHireDate(dto.hireDate());
    }
    
    private EmployeeDTO convertToDTO(Employee employee) {
        return new EmployeeDTO(
            employee.getId(),
            employee.getFirstName(),
            employee.getLastName(),
            employee.getEmail(),
            employee.getPhone(),
            employee.getPosition(),
            employee.getDepartment(),
            employee.getSalary(),
            employee.getHireDate()
        );
    }
}
