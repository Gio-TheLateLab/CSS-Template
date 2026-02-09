(() => {
  const STORAGE_KEY = "projectspace_rating"; // cambia el nombre si quieres
  const stars = Array.from(document.querySelectorAll(".rating .star"));
  const ratingText = document.getElementById("ratingText");
  const clearBtn = document.getElementById("clearRating");

  function paint(rating) {
    stars.forEach((btn) => {
      const v = Number(btn.dataset.value);
      btn.classList.toggle("on", v <= rating);
    });

    ratingText.textContent = rating ? `Tu voto: ${rating}/5` : "Sin voto";
  }

  function save(rating) {
    localStorage.setItem(STORAGE_KEY, String(rating));
  }

  function load() {
    const v = Number(localStorage.getItem(STORAGE_KEY) || 0);
    return Number.isFinite(v) ? v : 0;
  }

  // Hover preview
  stars.forEach((btn) => {
    btn.addEventListener("mouseenter", () => paint(Number(btn.dataset.value)));
    btn.addEventListener("mouseleave", () => paint(load()));
    btn.addEventListener("click", () => {
      const rating = Number(btn.dataset.value);
      save(rating);
      paint(rating);
    });
  });

  clearBtn?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    paint(0);
  });

  // Init
  paint(load());
})();
