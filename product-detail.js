const licenseButtons = [...document.querySelectorAll("[data-license-filter]")];
const licenseRows = [...document.querySelectorAll("[data-license]")];

licenseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeLicense = button.dataset.licenseFilter;
    licenseButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    licenseRows.forEach((row) => {
      row.hidden = row.dataset.license !== activeLicense;
    });
  });
});

const pricingViewButtons = [...document.querySelectorAll("[data-pricing-view]")];
const pricingPanels = [...document.querySelectorAll("[data-pricing-panel]")];

pricingViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const activeView = button.dataset.pricingView;
    pricingViewButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    pricingPanels.forEach((panel) => {
      panel.hidden = panel.dataset.pricingPanel !== activeView;
    });
  });
});
