function initCarousel(container) {
  const wrapper = container.querySelector(".cardsWrapper");
  const card = container.querySelector(".card");
  const backBtn = container.querySelector(".backtBtn");
  const nextBtn = container.querySelector(".nextBtn");
  const scalePart = container.querySelector(".scalePart");

  let currentIndex = 0;

  function getCardFullWidth() {
    const style = getComputedStyle(card);
    const marginRight = parseInt(style.marginRight);
    return card.offsetWidth + marginRight;
  }

  function getVisibleCards() {
    const containerWidth = container.offsetWidth;
    const cardWidth = getCardFullWidth();
    return Math.floor(containerWidth / cardWidth);
  }

  function getMaxIndex() {
    const totalCards = container.querySelectorAll(".card").length;
    const visibleCards = getVisibleCards();
    return Math.max(0, totalCards - visibleCards);
  }

  function scrollCards() {
    const cardWidth = getCardFullWidth();
    const maxIndex = getMaxIndex();
    currentIndex = Math.min(currentIndex, maxIndex);
    const maxScroll = wrapper.scrollWidth - container.offsetWidth;
    const offset = Math.min(currentIndex * cardWidth, maxScroll);
    wrapper.style.transform = `translateX(-${offset}px)`;
    updateButtons();

    const partWidth = 100 / (maxIndex + 1);
    scalePart.style.width = `${partWidth}%`;
    scalePart.style.transform = `translateX(${currentIndex * partWidth * 4}%)`;
  }

  function updateButtons() {
    const maxIndex = getMaxIndex();
    backBtn.style.display = currentIndex > 0 ? "block" : "none";
    nextBtn.style.display = currentIndex < maxIndex ? "block" : "none";
  }

  nextBtn.addEventListener("click", () => {
    const maxIndex = getMaxIndex();
    if (currentIndex < maxIndex) {
      currentIndex++;
      scrollCards();
    }
  });

  backBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      scrollCards();
    }
  });

  window.addEventListener("resize", scrollCards);
  scrollCards();
}

document.querySelectorAll(".cardsContainer").forEach(initCarousel);
