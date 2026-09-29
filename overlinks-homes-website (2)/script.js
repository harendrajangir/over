const PHONE = "918949886692";
let activePurpose = "buy";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll(".search-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".search-tab").forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    activePurpose = tab.dataset.purpose;
    const submit = document.querySelector(".search-submit");
    const locationInput = document.getElementById("locationInput");
    const typeInput = document.getElementById("typeInput");
    const budgetInput = document.getElementById("budgetInput");
    const note = document.getElementById("searchNote");
    if (activePurpose === "sell") {
      submit.innerHTML = 'List My Property <span>↗</span>';
      note.textContent = "Want to sell or rent out your property? Send us your details and our team will contact you.";
    } else {
      submit.innerHTML = 'Search <span>⌕</span>';
      note.textContent = activePurpose === "rent"
        ? "Explore rental options below, or contact us for a tailored shortlist."
        : "Explore our featured properties below, or contact us for a tailored shortlist.";
    }
    applyFilters(false);
  });
});

function applyFilters(showMessage = true) {
  const location = document.getElementById("locationInput").value.trim().toLowerCase();
  const type = document.getElementById("typeInput").value;
  const budget = document.getElementById("budgetInput").value;
  const cards = [...document.querySelectorAll(".property-card")];
  let visible = 0;

  cards.forEach(card => {
    const purposeMatch = activePurpose === "sell" || card.dataset.purpose === activePurpose;
    const locationMatch = !location || card.dataset.location.includes(location);
    const typeMatch = type === "all" || card.dataset.type === type;
    const budgetMatch = budget === "all" || card.dataset.budget === budget;
    const matches = purposeMatch && locationMatch && typeMatch && budgetMatch;
    card.hidden = !matches;
    if (matches) visible++;
  });

  document.getElementById("noResults").hidden = visible > 0 || activePurpose === "sell";
  if (showMessage) {
    if (activePurpose === "sell") {
      document.getElementById("searchNote").textContent = "To list your property, complete the contact form below and select “Selling a property”.";
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      document.getElementById("interestSelect").value = "Selling a property";
    } else if (visible === 0) {
      document.getElementById("searchNote").textContent = "No exact matches in these sample listings. Contact us for more options.";
    } else {
      document.getElementById("searchNote").textContent = `${visible} featured ${visible === 1 ? "property" : "properties"} match your search.`;
    }
  }
}
document.getElementById("propertySearch").addEventListener("submit", event => {
  event.preventDefault();
  applyFilters(true);
  if (activePurpose !== "sell") document.getElementById("properties").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".save-property").forEach(button => {
  button.addEventListener("click", () => {
    const saved = button.classList.toggle("saved");
    button.textContent = saved ? "♥" : "♡";
    button.setAttribute("aria-label", saved ? "Remove saved property" : "Save property");
  });
});

document.querySelectorAll("[data-property]").forEach(link => {
  link.addEventListener("click", () => {
    const message = `Hello Overlinks Homes, I would like to enquire about ${link.dataset.property}. Please share more details.`;
    document.getElementById("contactForm").elements.message.value = message;
  });
});
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const map = { "Buy a Home": "Buying a property", "Sell a Property": "Selling a property", "Rent a Home": "Renting a property" };
    document.getElementById("interestSelect").value = map[link.dataset.service] || "";
  });
});

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const interest = String(data.get("interest") || "").trim();
  const message = String(data.get("message") || "").trim();
  const text = `Hello Overlinks Homes!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AInterested in: ${encodeURIComponent(interest)}%0AMessage: ${encodeURIComponent(message || "Please contact me to discuss my property requirements.")}`;
  window.open(`https://wa.me/${PHONE}?text=${text}`, "_blank", "noopener,noreferrer");
});

document.getElementById("year").textContent = new Date().getFullYear();
