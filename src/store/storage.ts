// Функция парсинга JWT из localStorage
export function loadState<T>(key: string): T | undefined {
  try {
    const jsonState = localStorage.getItem(key);
    if (!jsonState) return undefined;
    return JSON.parse(jsonState);
  } catch(err) {
    console.error('Ошибка парсинга JWT из localStorage: ', err);
    return undefined;
  }
}

// Функция сохранения JWT в localStorage
export function saveState<T>(state: T, key: string) {
  const stringState = JSON.stringify(state);
  try {
    localStorage.setItem(key, stringState);
  } catch(err) {
    console.error('Ошибка сохранения JWT в localStorage: ', err);
  }
}