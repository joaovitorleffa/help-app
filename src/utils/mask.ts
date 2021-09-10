export function removeSpecialCharacters(text: string): string {
  try {
    return text.replace(/[^0-9]/g, '');
  } catch {
    return text;
  }
}

export function phoneNumberMask(text: string): string {
  try {
    return removeSpecialCharacters(text).replace(
      /^(\d{2})(\d{1})(\d{4})(\d{4}).*/,
      '($1) $2 $3-$4',
    );
  } catch {
    return text;
  }
}
