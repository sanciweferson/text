import {
  setupMenuToggle,
  setupMenuStateOnLoad,
  setupMenuResizeHandler,
  setupMobileLinkClicks,
} from "./menuActions.js"

export const initMenu = () => {
  setupMenuToggle()
  setupMenuStateOnLoad()
  setupMenuResizeHandler()
  setupMobileLinkClicks()
}
