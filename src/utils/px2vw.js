export const px2vw = (px) => {
        if (window.matchMedia("(orientation: portrait)").matches) {
          return `${(100 / 2560) * px}vw`
        } else if (window.matchMedia("(orientation: landscape)").matches) {
          return `${(100 / 2560) * px}vh`
        }
  }
