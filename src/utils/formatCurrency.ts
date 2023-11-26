export function formatCurrency(value: string) {
  const numericText = value.replace(/[^\d]/g, '');

  const numericValue = parseFloat(numericText) / 100;

  const formattedValue = numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  if (!value) {
    return '';
  }

  return formattedValue;
}