import {
  applyEffectiveTheme,
  toggleTheme,
  setupSystemThemeObserver,
} from "./theme.core.js"

// ===================================================
// Função auxiliar (usada em B9 e B10)
// ===================================================
const setupThemeButton = (buttonId) => {
  const button = document.getElementById(buttonId)
  if (!button) return

  const updateAriaLabel = (isDark) => {
    button.setAttribute(
      "aria-label",
      isDark ? "Alternar para tema claro" : "Alternar para tema escuro"
    )
  }

  button.addEventListener("click", () => {
    toggleTheme()
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark"
    updateAriaLabel(isDark)
  })

  const isDark = document.documentElement.getAttribute("data-theme") === "dark"
  updateAriaLabel(isDark)
}

// ===================================================
// B9 - BOTÃO DO DESKTOP
// ===================================================
const initDesktopThemeToggle = () => {
  setupThemeButton("toggle__desktop")
}

// ===================================================
// B10 - BOTÃO DO MOBILE
// ===================================================
const initMobileThemeToggle = () => {
  setupThemeButton("toggle__mobile")
}

// ===================================================
// B11 - INICIALIZAR TODO O SISTEMA DE TEMA
// ===================================================
export const initTheme = () => {
  initDesktopThemeToggle() // B9
  initMobileThemeToggle() // B10
  applyEffectiveTheme() // B6
  setupSystemThemeObserver() // B8
}
