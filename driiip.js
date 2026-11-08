// === Driiip Shared Core Script ===
// This script works across all pages: Home, Inventory, Calendar, Wallet, etc.

// === Global Functions ===

// Save data to localStorage
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Load data from localStorage
function loadData(key) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : [];
}

// Add item to a list (used in Inventory, Calendar, etc.)
function addItemToList(listId, item) {
  const list = document.getElementById(listId);
  if (!list || !item) return;

  const itemEl = document.createElement("div");
  itemEl.className = "item";
  itemEl.innerHTML = `
    <span>${item}</span>
    <button onclick="removeItem(this)">✕</button>
  `;
  list.appendChild(itemEl);
}

// Remove item from list and save
function removeItem(el) {
  el.parentElement.remove();
  // Call save function based on context (e.g., saveInventory, saveCalendar)
}

// === Voice Command System ===
function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Voice not supported. Please use Chrome or Safari.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    console.log("Heard:", transcript);

    if (transcript.includes("hey driiip") || transcript.includes("oye driiip")) {
      // Navigation
      if (transcript.includes("home") || transcript.includes("start")) {
        window.location.href = "index.html";
      } else if (transcript.includes("inventory") || transcript.includes("kitchen")) {
        window.location.href = "inventory.html";
      } else if (transcript.includes("calendar") || transcript.includes("meals")) {
        window.location.href = "calendar.html";
      } else if (transcript.includes("wallet") || transcript.includes("chores")) {
        window.location.href = "wallet.html";
      } else if (transcript.includes("duel") || transcript.includes("dishes")) {
        window.location.href = "duel.html";
      } else if (transcript.includes("add ")) {
        const item = transcript.split("add ")[1];
        if (item) {
          // Trigger add on current page
          if (typeof addVoiceItem === "function") {
            addVoiceItem(item);
          } else {
            alert(`Added: ${item}`);
          }
        }
      } else {
        alert("I'm listening. Say a command like 'open inventory' or 'add milk'.");
      }
    }
  };

  recognition.onerror = function (event) {
    if (event.error === "not-allowed") {
      alert("Microphone access blocked. Please enable it in settings.");
    }
  };

  recognition.start();
}
