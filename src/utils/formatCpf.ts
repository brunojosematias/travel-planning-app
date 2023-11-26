export function formatCPF(value: string) {
  // Remove all non-numeric characters
  const digits = value.replace(/\D/g, '');

  // Limita o comprimento do CPF a 11 caracteres
  const truncatedCPF = digits.slice(0, 11);

  // Apply CPF formatting: 000.000.000-00
  const regex = /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/;
  const formattedCPF = truncatedCPF.replace(regex, (_, p1, p2, p3, p4) => {
    let result = '';
    if (p1) result += p1;
    if (p2) result += `.${p2}`;
    if (p3) result += `.${p3}`;
    if (p4) result += `-${p4}`;
    return result;
  });

  return formattedCPF;
}