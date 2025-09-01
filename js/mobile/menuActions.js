// menuActions.js

export const menuToggleButton = document.getElementById("menu-toggle")
export const sideMenu = document.getElementById("mobile__side")
export const MOBILE_BREAKPOINT = 768

// Abre o menu mobile
export const openSideMenu = () => {
  sideMenu.classList.add("open")
  menuToggleButton.innerHTML = "&times;" // muda para "X"
  menuToggleButton.setAttribute("aria-expanded", "true")
  sideMenu.setAttribute("aria-hidden", "false")
  localStorage.setItem("menuOpen", "true")
}

// Fecha o menu mobile
export const closeSideMenu = () => {
  sideMenu.classList.remove("open")
  menuToggleButton.innerHTML = "&#9776;" // muda para "☰"
  menuToggleButton.setAttribute("aria-expanded", "false")
  sideMenu.setAttribute("aria-hidden", "true")
  localStorage.setItem("menuOpen", "false")
}

// Configura o botão de toggle
export const setupMenuToggle = () => {
  if (!menuToggleButton || !sideMenu) return

  menuToggleButton.addEventListener("click", () => {
    const isOpen = sideMenu.classList.contains("open")
    isOpen ? closeSideMenu() : openSideMenu()
  })
}

// Mantém o estado do menu salvo no localStorage mesmo após reload
export const setupMenuStateOnLoad = () => {
  if (!menuToggleButton || !sideMenu) return

  const menuOpenSaved = localStorage.getItem("menuOpen") === "true"

  // Se o menu estava aberto no localStorage, abre independentemente do breakpoint
  if (menuOpenSaved) {
    openSideMenu()
  } else {
    closeSideMenu()
  }
}

// Fecha o menu automaticamente se a tela aumentar além do breakpoint
export const setupMenuResizeHandler = () => {
  window.addEventListener("resize", () => {
    if (
      window.innerWidth > MOBILE_BREAKPOINT &&
      sideMenu.classList.contains("open")
    ) {
      closeSideMenu()
    }
  })
}

// Fecha o menu ao clicar em qualquer link do mobile e faz scroll suave
export const setupMobileLinkClicks = () => {
  if (!sideMenu) return

  const links = sideMenu.querySelectorAll("a[href]")
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href")
      closeSideMenu()

      // Se for link de âncora, faz scroll suave
      if (href.startsWith("#")) {
        event.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth" })
          }, 200)
        }
      }
    })
  })
}

// Inicializa o menu
export const initMenu = () => {
  setupMenuToggle()
  setupMenuStateOnLoad()
  setupMenuResizeHandler()
  setupMobileLinkClicks()
}

// Garante que o menu só inicialize depois do DOM estar pronto
window.addEventListener("DOMContentLoaded", initMenu)
