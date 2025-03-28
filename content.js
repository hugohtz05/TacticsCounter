// Créer un overlay pour afficher le compteur
let overlay = document.createElement("div");
overlay.id = "count-overlay";
Object.assign(overlay.style, {
  position: "fixed", top: "10px", right: "10px",
  background: "black", color: "white", padding: "10px",
  fontSize: "20px", borderRadius: "5px", zIndex: "9999"
});
document.body.appendChild(overlay);

// Fonction pour mettre à jour le compteur affiché
function updateCounterDisplay(count) {
  overlay.textContent = `Problèmes résolus: ${count}`;
}

// Charger le compteur existant
chrome.storage.local.get({ count: 0 }, (data) => {
  updateCounterDisplay(data.count);
});

// Détection des clics uniquement sur le bouton "Suivant"
document.addEventListener("click", (event) => {
  let button = event.target.closest("button.mdc-button");
  
  if (button) {
    let label = button.querySelector(".mdc-button__label");

    // Vérifier si le texte du bouton est bien "Suivant"
    if (label && label.textContent.trim() === "Suivant") {
      console.log("✅ Bouton 'Suivant' détecté et cliqué !");

      chrome.storage.local.get({ count: 0 }, (data) => {
        let newCount = data.count + 1;
        chrome.storage.local.set({ count: newCount });
        updateCounterDisplay(newCount);

        // Notification tous les 15 clics
        if (newCount % 15 === 0) {
          chrome.runtime.sendMessage({ type: "notify", count: newCount });
        }
      });
    }
  }
});
