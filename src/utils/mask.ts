export function removeSpecialCharacters(text: string): string {
  try {
    return text.replace(/[^0-9]/g, '');
  } catch {
    return text;
  }
}

export function phoneNumberMask(text: string): string {
  try {
    if (text.length === 16) {
      return text;
    }
    return removeSpecialCharacters(text).replace(
      /^(\d{2})(\d{1})(\d{4})(\d{4}).*/,
      '($1) $2 $3-$4',
    );
  } catch {
    return text;
  }
}

export function cepMask(text: string): string {
  try {
    if (text.length === 9) {
      return text;
    }
    return removeSpecialCharacters(text).replace(/^(\d{5})(\d{3}).*/, '$1-$2');
  } catch {
    return text;
  }
}
