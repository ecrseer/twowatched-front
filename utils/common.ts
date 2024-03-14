export function utilsDelay<T>(ms: number, value: T) {
  return new Promise<T>((resolve) => setTimeout(resolve, ms, value));
}
export function utilsRandomId() {
  return Math.random().toString(36).substring(2);
}

