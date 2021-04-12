// Module
export function joinClasses(...classes: Array<string | null | undefined>) {
  return classes
    .reduce((nonEmpty: string[], item) => {
      item = item && item.split(/\s+/g).filter(word => !!word).join(' ');
      if (item) {
        nonEmpty.push(item);
      }
      return nonEmpty;
    }, [])
    .join(' ');
}

export function splitToWords(value?: string): string[] {
  return value && value.split(/\s+/g).filter(word => !!word) || [];
}

export function firstWord(value?: string): string | undefined {
  return splitToWords(value).shift();
}
