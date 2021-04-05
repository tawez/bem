// Module
export function joinClasses(...classes: Array<string | null | undefined>) {
  return classes
    .reduce((nonEmpty, item) => {
      item = item && item.trim();
      if (item) {
        nonEmpty.push(item);
      }
      return nonEmpty;
    }, [] as string[])
    .join(' ');
}
