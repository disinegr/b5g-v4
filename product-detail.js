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
