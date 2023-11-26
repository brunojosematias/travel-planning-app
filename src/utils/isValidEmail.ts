export function isValidEmail(email: string) {
  // Esta expressão regular é uma simplificação e pode não cobrir todos os casos
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}