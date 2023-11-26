export function formatDate(value: string): string {
  const numericText = value.replace(/\D/g, '');

  let formattedDate = '';
  if (numericText.length > 2) {
    formattedDate += numericText.substring(0, 2) + '/';
    if (numericText.length > 4) {
      formattedDate += numericText.substring(2, 4) + '/' + numericText.substring(4, 8);
    } else {
      formattedDate += numericText.substring(2);
    }
  } else {
    formattedDate = numericText;
  }

  return formattedDate;
}