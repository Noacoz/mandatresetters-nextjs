/**
 * Input validation utilities
 */

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password) {
  // At least 8 chars, 1 uppercase, 1 number
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

export function validateName(name) {
  return name && name.trim().length >= 2 && name.trim().length <= 100;
}

export function validatePhone(phone) {
  // Basic phone validation
  return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone.replace(/\s/g, ''));
}

export function validateRequired(...fields) {
  return fields.every(field => field && field.trim().length > 0);
}

export function validateMessage(message) {
  return message && message.trim().length >= 10 && message.trim().length <= 5000;
}

export const validationErrors = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 8 characters with 1 uppercase letter and 1 number',
  name: 'Name must be between 2 and 100 characters',
  phone: 'Please enter a valid phone number',
  required: 'This field is required',
  message: 'Message must be between 10 and 5000 characters',
};
