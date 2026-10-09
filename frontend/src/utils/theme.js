
const THEME_KEY = "taskly-theme";

export const getSavedTheme = () => {
  return localStorage.getItem(THEME_KEY) || "light";
};

export const applyTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
};

