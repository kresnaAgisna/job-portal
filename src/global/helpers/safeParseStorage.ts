export function safeParseLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;

    const parsed = JSON.parse(raw);
    return parsed as T;
  } catch {
    return defaultValue;
  }
}
