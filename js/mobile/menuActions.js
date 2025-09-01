// menuActions.js

export const MOBILE_BREAKPOINT = 768

// Função para pegar os elementos do menu
const getMenuElements = () => {
  const menuToggleButton = document.getElementById("menu-toggle")
  const sideMenu = document.getElementById("mobile__side")
  return { menuToggleButton, sideMenu }
}

// Abre o menu mobile
export const openSideMenu = () => {
  const { menuToggleButton, sideMenu } = getMenuElements()
  if (!menuToggleButton || !sideMenu) return

  sideMenu.classList.add("open")
  menuToggleButton.innerHTML = "&times;"
  menuToggleButton.setAttribute("aria-expanded", "true")
  sideMenu.setAttribute("aria-hidden", "false")
  localStorage.setItem("menuOpen", "true")
}

// Fecha o menu mobile
export const closeSideMenu = () => {
  const { menuToggleButton, sideMenu } = getMenuElements()
  if (!menuToggleButton || !sideMenu) return

  sideMenu.classList.remove("open")
  menuToggleButton.innerHTML = "&#9776;"
  menuToggleButton.setAttribute("aria-expanded", "false")
  sideMenu.setAttribute("aria-hidden", "true")
  localStorage.setItem("menuOpen", "false")
}

// Configura o botão de toggle
export const setupMenuToggle = () => {
  const { menuToggleButton, sideMenu } = getMenuElements()
  if (!menuToggleButton || !sideMenu) return

  menuToggleButton.addEventListener("click", () => {
    const isOpen = sideMenu.classList.contains("open")
    isOpen ? closeSideMenu() : openSideMenu()
  })
}

// Mantém o estado do menu salvo no localStorage mesmo após reload
export const setupMenuStateOnLoad = () => {
  const { sideMenu } = getMenuElements()
  if (!sideMenu) return

  // Pequeno delay para garantir que o DOM e layout estejam prontos
  setTimeout(() => {
    const menuOpenSaved = localStorage.getItem("menuOpen") === "true"
    if (menuOpenSaved) {
      openSideMenu()
    } else {
      closeSideMenu()
    }
  }, 50)
}

// Fecha o menu automaticamente se a tela aumentar além do breakpoint
export const setupMenuResizeHandler = () => {
  window.addEventListener("resize", () => {
    const { sideMenu } = getMenuElements()
    if (!sideMenu) return

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
  const { sideMenu } = getMenuElements()
  if (!sideMenu) return

  const links = sideMenu.querySelectorAll("a[href]")
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href")
      closeSideMenu()

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

// Inicializa o menu quando o DOM e o header estiverem prontos
export const initMenu = () => {
  // Aguarda o DOM completo
  window.addEventListener("load", () => {
    setupMenuToggle()
    setupMenuStateOnLoad()
    setupMenuResizeHandler()
    setupMobileLinkClicks()
  })
}
