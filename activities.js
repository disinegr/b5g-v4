const activityButtons = [...document.querySelectorAll("[data-activity-filter]")];
const activityGroups = [...document.querySelectorAll("[data-activity-group]")];
const activityCount = document.querySelector("[data-activity-count]");
const activityCountLabel = document.querySelector("[data-activity-count-label]");

const updateActivityFilter = (selected) => {
  activityButtons.forEach((button) => {
    const active = button.dataset.activityFilter === selected;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  let count = 0;
  activityGroups.forEach((group) => {
    const visible = selected === "all" || group.dataset.activityGroup === selected;
    group.hidden = !visible;
    if (visible) count += group.querySelectorAll(".activity-card").length;
  });
  if (activityCount) activityCount.textContent = String(count);
  if (activityCountLabel) activityCountLabel.textContent = count === 1 ? "услуга" : count < 5 ? "услуги" : "услуг";
};

activityButtons.forEach((button) => button.addEventListener("click", () => {
  updateActivityFilter(button.dataset.activityFilter);
}));

const activityDetails = [...document.querySelectorAll(".activity-card details")];
activityDetails.forEach((details) => details.addEventListener("toggle", () => {
  if (!details.open) return;
  activityDetails.forEach((other) => {
    if (other !== details) other.open = false;
  });
}));

updateActivityFilter("all");
