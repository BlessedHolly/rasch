let lastScrollY = window.scrollY;
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // Прокрутка вниз
    header.classList.add("hidden");
  } else {
    // Прокрутка вверх
    header.classList.remove("hidden");
  }

  lastScrollY = currentScrollY;
});
