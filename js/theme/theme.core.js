// ===================================================
// B1 - ELEMENTO BASE
// ===================================================
export const htmlElement = document.documentElement
export let userPrefersDark = null

// ===================================================
// B2 - SALVAR PREFERÊNCIA DO USUÁRIO
// ===================================================
export const setUserPrefersDark = (value) => {
  userPrefersDark = value
  localStorage.setItem("darkMode", value.toString())
}

// ===================================================
// B3 - LER PREFERÊNCIA DO USUÁRIO
// ===================================================
export const getStoredUserPrefersDark = () => {
  const stored = localStorage.getItem("darkMode")
  if (stored === "true") return true
  if (stored === "false") return false
  return null
}

// ===================================================
// B4 - DETECTAR PREFERÊNCIA DO SISTEMA
// ===================================================
export const getSystemPrefersDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches

// ===================================================
// B5 - APLICAR O TEMA E ATUALIZAR ÍCONES
// ===================================================
export const updateTheme = (isDark) => {
  htmlElement.setAttribute("data-theme", isDark ? "dark" : "light")

  document
    .querySelectorAll(".icon-moon")
    .forEach((el) => el.classList.toggle("hidden", isDark))
  document
    .querySelectorAll(".icon-sun")
    .forEach((el) => el.classList.toggle("hidden", !isDark))
}

// ===================================================
// B6 - ESCOLHER O TEMA (USUÁRIO > SISTEMA)
// ===================================================
export const applyEffectiveTheme = () => {
  const stored = getStoredUserPrefersDark()
  userPrefersDark = stored
  const isDark = stored !== null ? stored : getSystemPrefersDark()
  updateTheme(isDark)
}

// ===================================================
// B7 - ALTERNAR O TEMA AO CLICAR
// ===================================================
export const toggleTheme = () => {
  const currentTheme = htmlElement.getAttribute("data-theme")
  const newIsDark = currentTheme !== "dark"
  setUserPrefersDark(newIsDark)
  updateTheme(newIsDark)
}

// ===================================================
// B8 - OBSERVAR MUDANÇAS DO TEMA DO SISTEMA
// ===================================================
export const setupSystemThemeObserver = () => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

  const onSystemThemeChange = (e) => {
    if (userPrefersDark === null) {
      updateTheme(e.matches)
    }
  }

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", onSystemThemeChange)
  } else {
    mediaQuery.addListener(onSystemThemeChange)
  }
}
