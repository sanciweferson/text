export const menuToggleButton = document.getElementById("menu-toggle")
export const sideMenu = document.getElementById("mobile__side")
export const MOBILE_BREAKPOINT = 768

export const openSideMenu = () => {
  sideMenu.classList.add("open")
  menuToggleButton.innerHTML = "&times;"
  menuToggleButton.setAttribute("aria-expanded", "true")
  sideMenu.setAttribute("aria-hidden", "false")
  localStorage.setItem("menuOpen", "true")
}

export const closeSideMenu = () => {
  sideMenu.classList.remove("open")
  menuToggleButton.innerHTML = "&#9776;"
  menuToggleButton.setAttribute("aria-expanded", "false")
  sideMenu.setAttribute("aria-hidden", "true")
  localStorage.setItem("menuOpen", "false")
}

export const setupMenuToggle = () => {
  if (!menuToggleButton || !sideMenu) return

  menuToggleButton.addEventListener("click", () => {
    const isOpen = sideMenu.classList.contains("open")
    isOpen ? closeSideMenu() : openSideMenu()
  })
}

export const setupMenuStateOnLoad = () => {
  const menuOpenSaved = localStorage.getItem("menuOpen") === "true"
  if (menuOpenSaved && window.innerWidth <= MOBILE_BREAKPOINT) {
    openSideMenu()
  } else {
    closeSideMenu()
  }
}

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

export const setupMobileLinkClicks = () => {
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
