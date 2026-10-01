const typeButtons = [...document.querySelectorAll("[data-type-filter]")];
const topicButtons = [...document.querySelectorAll("[data-topic-filter]")];
const projectGrid = document.querySelector("[data-project-grid]");
const projectTiles = [...document.querySelectorAll("[data-type][data-topics]")];
const projectCount = document.querySelector("[data-project-count]");
const projectCountLabel = document.querySelector("[data-project-count-label]");
const projectEmpty = document.querySelector("[data-project-empty]");

let selectedType = "all";
let selectedTopic = "all";

const countWord = (count, forms) => {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return forms[2];
  if (lastDigit === 1) return forms[0];
  if (lastDigit >= 2 && lastDigit <= 4) return forms[1];
  return forms[2];
};

const getTopicList = (tile) => tile.dataset.topics.split(" ");

const updateFilters = () => {
  typeButtons.forEach((button) => {
    const active = button.dataset.typeFilter === selectedType;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  topicButtons.forEach((button) => {
    const topic = button.dataset.topicFilter;
    const available = selectedType !== "initiative" || topic === "all" || projectTiles.some((tile) => tile.dataset.type === "initiative" && getTopicList(tile).includes(topic));
    button.hidden = !available;
    const active = topic === selectedTopic;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  let visibleCount = 0;
  projectTiles.forEach((tile) => {
    const matchesType = selectedType === "all" || tile.dataset.type === selectedType;
    const matchesTopic = selectedTopic === "all" || getTopicList(tile).includes(selectedTopic);
    const visible = matchesType && matchesTopic;
    tile.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  projectGrid?.classList.toggle("is-filtered", selectedType !== "case" || selectedTopic !== "all");
  if (projectCount) projectCount.textContent = String(visibleCount);
  if (projectCountLabel) {
    const forms = selectedType === "case" ? ["кейс", "кейса", "кейсов"] : selectedType === "initiative" ? ["инициатива", "инициативы", "инициатив"] : ["материал", "материала", "материалов"];
    projectCountLabel.textContent = countWord(visibleCount, forms);
  }
  if (projectEmpty) projectEmpty.hidden = visibleCount !== 0;
};

typeButtons.forEach((button) => button.addEventListener("click", () => {
  selectedType = button.dataset.typeFilter;
  selectedTopic = "all";
  updateFilters();
}));

topicButtons.forEach((button) => button.addEventListener("click", () => {
  selectedTopic = button.dataset.topicFilter;
  updateFilters();
}));

document.querySelectorAll("[data-case-preview-topic]").forEach((link) => link.addEventListener("click", () => {
  selectedType = "all";
  selectedTopic = link.dataset.casePreviewTopic;
  updateFilters();
}));

updateFilters();
