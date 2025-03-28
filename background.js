// Réinitialise le compteur à minuit
function resetCounter() {
    chrome.storage.local.set({ count: 0 });
  }
  
  // Vérifie toutes les minutes si on est passé à minuit
  setInterval(() => {
    let now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      resetCounter();
    }
  }, 60000);
  
  // Écoute les messages pour envoyer les notifications
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "notify") {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "Bravo !",
        message: `Tu as résolu ${message.count} problèmes !`
      });
    }
  });
  