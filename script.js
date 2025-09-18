let log = JSON.parse(localStorage.getItem("bussolaLog") || "[]");

const headingEl = document.getElementById("heading");
const recordBtn = document.getElementById("recordBtn");
const logEl = document.getElementById("log");
const dataList = document.getElementById("dataList");

// Direzione cardinali
function getDirection(deg) {
  const dirs = ["Nord", "Nord-Est", "Est", "Sud-Est", "Sud", "Sud-Ovest", "Ovest", "Nord-Ovest"];
  return dirs[Math.round(deg / 45) % 8];
}

// Cambio scheda
function switchTab(id) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Orientamento bussola
function handleOrientation(event) {
  let deg = event.alpha;
  if (deg != null) {
    headingEl.textContent = `${Math.round(deg)}° (${getDirection(deg)})`;
    recordBtn.disabled = false;
    recordBtn.onclick = () => saveReading(deg);
  }
}

// Salva rilevamento
function saveReading(deg) {
  const entry = {
    time: new Date().toLocaleString(),
    deg: Math.round(deg),
    dir: getDirection(deg),
    altitude: "",
    distance: ""
  };
  log.push(entry);
  localStorage.setItem("bussolaLog", JSON.stringify(log));
  renderLog();
  renderDataList();
}

// Mostra storico rilevamenti
function renderLog() {
  logEl.innerHTML = "";
  log.forEach(e => {
    const li = document.createElement("li");
    li.textContent = `${e.time} → ${e.dir} (${e.deg}°)`;
    logEl.appendChild(li);
  });
}

// Mostra dati ricevuti e campi manuali
function renderDataList() {
  dataList.innerHTML = "";
  log.forEach((e, i) => {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "10px";

    const label = document.createElement("p");
    label.textContent = `${e.time} → ${e.dir} (${e.deg}°)`;

    const altInput = document.createElement("input");
    altInput.type = "text";
    altInput.placeholder = "Altitudine: ....";
    altInput.value = e.altitude;
    altInput.oninput = (ev) => {
      log[i].altitude = ev.target.value;
      localStorage.setItem("bussolaLog", JSON.stringify(log));
    };

    const distInput = document.createElement("input");
    distInput.type = "text";
    distInput.placeholder = "Distanza: ....";
    distInput.value = e.distance;
    distInput.oninput = (ev) => {
      log[i].distance = ev.target.value;
      localStorage.setItem("bussolaLog", JSON.stringify(log));
    };

    wrapper.appendChild(label);
    wrapper.appendChild(altInput);
    wrapper.appendChild(distInput);
    dataList.appendChild(wrapper);
  });
}

// Simulazione sincronizzazione Bluetooth
document.getElementById("syncBtn").addEventListener("click", async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
    alert(`Connesso a: ${device.name}`);
    renderDataList(); // Simula ricezione dati
  } catch (err) {
    alert("Bluetooth non disponibile. Assicurati che sia attivo.");
  }
});

// Esporta rilevamenti in PDF
function exportRilevamentiPDF() {
  const doc = new window.jspdf.jsPDF();
  doc.setFontSize(16);
  doc.text("🧭 Rilevamenti registrati", 10, 20);

  log.forEach((entry, i) => {
    const line = `${entry.time} → ${entry.dir} (${entry.deg}°)`;
    doc.text(line, 10, 30 + i * 10);
  });

  doc.save("rilevamenti-majella.pdf");
}

// Esporta dati manuali in PDF
function exportManualePDF() {
  const doc = new window.jspdf.jsPDF();
  doc.setFontSize(16);
  doc.text("📝 Dati manuali ricevuti", 10, 20);

  log.forEach((entry, i) => {
    const line = `${entry.time} → ${entry.dir} (${entry.deg}°)\nAltitudine: ${entry.altitude || "...."}\nDistanza: ${entry.distance || "...."}`;
    doc.text(line, 10, 30 + i * 20);
  });

  doc.save("dati-manuali-majella.pdf");
}

// Eventi bussola
window.addEventListener("deviceorientationabsolute", handleOrientation, true);
window.addEventListener("deviceorientation", handleOrientation, true);

// Inizializzazione
renderLog();
renderDataList();

// Registrazione Service Worker per modalità offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log("Service Worker registrato"))
    .catch(err => console.error("Errore Service Worker:", err));
}
