const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => EMAIL_REGEX.test(email);

export const validateSalary = (salary) =>
  !isNaN(salary) && parseFloat(salary) > 0;

export const validateEmployeeForm = (formData) => {
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'position',
    'department',
    'salary',
    'hireDate',
  ];

  for (const field of requiredFields) {
    if (!formData[field]) {
      return 'Please fill in all required fields';
    }
  }

  if (!validateEmail(formData.email)) {
    return 'Please enter a valid email address';
  }

  if (!validateSalary(formData.salary)) {
    return 'Please enter a valid salary';
  }

  return null;
};
