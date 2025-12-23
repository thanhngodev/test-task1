export const normalizeQuantity = (
  rawValue: string
): { value: number; exceeded: boolean } => {
  const trimmed = rawValue.replace(/^0+(?=\d)/, "");

  const value = Number(trimmed);

  if (Number.isNaN(value)) {
    return { value: 0, exceeded: false };
  }

  if (value > 99) {
    return { value: 99, exceeded: true };
  }

  if (value < 0) {
    return { value: 0, exceeded: false };
  }

  return { value, exceeded: false };
};