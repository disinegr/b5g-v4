const filterButtons = [...document.querySelectorAll("[data-filter]")];
const projectGrid = document.querySelector("[data-project-grid]");
const projectTiles = [...document.querySelectorAll("[data-category]")];
const projectCount = document.querySelector("[data-project-count]");
const projectCountLabel = document.querySelector("[data-project-count-label]");
const projectEmpty = document.querySelector("[data-project-empty]");

const projectWord = (count) => {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return "проектов";
  if (lastDigit === 1) return "проект";
  if (lastDigit >= 2 && lastDigit <= 4) return "проекта";
  return "проектов";
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    projectTiles.forEach((tile) => {
      const visible = filter === "all" || tile.dataset.category === filter;
      tile.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    projectGrid?.classList.toggle("is-filtered", filter !== "all");
    if (projectCount) projectCount.textContent = String(visibleCount);
    if (projectCountLabel) projectCountLabel.textContent = projectWord(visibleCount);
    if (projectEmpty) projectEmpty.hidden = visibleCount !== 0;
  });
});
