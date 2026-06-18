const orderEmail = "info@justcheesecakesdeliveries.com";

const form = document.querySelector("#order-form");
const status = document.querySelector("#form-status");
const year = document.querySelector("#year");
const flavorSelect = document.querySelector("select[name='flavor']");

year.textContent = new Date().getFullYear();

document.querySelectorAll(".menu-item").forEach((item) => {
  item.tabIndex = 0;
  item.addEventListener("click", () => chooseFlavor(item.dataset.flavor));
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      chooseFlavor(item.dataset.flavor);
    }
  });
});

function chooseFlavor(flavor) {
  flavorSelect.value = flavor;
  document.querySelector("#order").scrollIntoView({ behavior: "smooth" });
  status.textContent = `${flavor} selected.`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const lines = [
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Flavor: ${data.get("flavor")}`,
    `Size: ${data.get("size")}`,
    `Preferred delivery date: ${data.get("date") || "Flexible"}`,
    `Delivery ZIP code: ${data.get("zip") || "Not provided"}`,
    "",
    "Notes:",
    data.get("notes") || "None provided",
  ];

  const subject = encodeURIComponent(`Cheesecake inquiry from ${data.get("name")}`);
  const body = encodeURIComponent(lines.join("\n"));
  status.textContent = "Opening your email app with the order details.";
  window.location.href = `mailto:${orderEmail}?subject=${subject}&body=${body}`;
});
