# Rilevamento
Quest'app permette agli operatori di fare rilevamenti in maniera snella e precisa🧭

STRUTTURA DEL PROGETTO 
majella-app/
├── index.html              # Interfaccia principale
├── style.css              # Tema visivo ispirato al Parco Majella
├── script.js              # Bussola, salvataggio, sincronizzazione
├── manifest.json          # Configurazione PWA
├── service-worker.js      # Cache offline 
│
├── assets/
│   └── compass.svg        # Icona della bussola
│
└── icons/
    ├── icon-192.png       # Icona PWA
    └── icon-512.png       # Icona PWA

FUNZIONI PRINCIPALI 
Scheda 1 – Rilevamento Orienta il dispositivo verso il suono e registra direzione e orario. I dati vengono salvati localmente e trasmessi via Bluetooth.

Scheda 2 – Aggiungi dati manualmente Riceve i rilevamenti e permette di aggiungere altitudine e distanza (non obbligatori). I campi sono approssimativi e pensati per l’uso sul campo.

Bluetooth Il bottone “📡 Sincronizza con operatore” attiva la comunicazione tra dispositivi. I dati vengono condivisi in tempo reale.

Offline Ready Grazie al Service Worker, l’app funziona anche senza connessione. Tutti i dati sono salvati in localStorage.

Installabile come PWA L’app può essere aggiunta alla schermata home su Android e desktop, con icona e tema personalizzati.

NOTE TECNICHE 
Compatibile con browser moderni (Chrome, Edge)

Bluetooth simulato via Web Bluetooth API (Android supportato, iOS limitato)

Per testare offline, usa HTTPS o localhost
