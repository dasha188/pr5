/* ОСНОВНАЯ РАБОТА */
const root = document.documentElement;
const themeSelect = document.querySelector('#theme-select');
const demoAction = document.querySelector('#demo-action');
const demoFeedback = document.querySelector('#demo-feedback');
const densitySelect = document.querySelector('#density-select');
const THEME_KEY = 'atlas-theme';
const DENSITY_KEY = 'atlas-density';

function safeGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* no-op */ }
}

const THEMES = ['auto', 'light', 'dark'];

function applyTheme(choice) {
const value = THEMES.includes(choice) ? choice : 'auto';
  if (value === 'auto') {
    root.removeAttribute('data-theme');
  } else {
    root.dataset.theme = value;
  }
  if (themeSelect) themeSelect.value = value;
}
const DENSITIES = ['normal', 'compact'];

function applyDensity(choice) {
  const value = DENSITIES.includes(choice) ? choice : 'normal';
  if (value === 'compact') {
    root.dataset.density = 'compact';
  } else {
    root.removeAttribute('data-density');
  }
  if (densitySelect) densitySelect.value = value;
}

applyTheme(safeGet(THEME_KEY) || 'auto');
applyDensity(safeGet(DENSITY_KEY) || 'normal');

if (themeSelect) {
  themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
    safeSet(THEME_KEY, e.target.value);
  });
}

if (densitySelect) {
  densitySelect.addEventListener('change', (e) => {
    applyDensity(e.target.value);
    safeSet(DENSITY_KEY, e.target.value);
  });
}

  // TODO: если choice === 'auto' — root.removeAttribute('data-theme').
  // TODO: иначе — root.dataset.theme = choice.
  // TODO: синхронизируйте значение themeSelect.value.

// TODO: при загрузке прочитайте сохранённое значение из localStorage.
// TODO: допустимые значения: auto / light / dark; иначе используйте auto.
// TODO: обработайте событие change у themeSelect и сохраните настройку.
// Подсказка: если localStorage недоступен, оставьте интерфейс рабочим.

/* Обратная связь от кнопки — уже готова. */
demoAction.addEventListener('click', () => {
  demoFeedback.textContent = 'Демонстрация: действие выполнено, новая заявка создана.';
});