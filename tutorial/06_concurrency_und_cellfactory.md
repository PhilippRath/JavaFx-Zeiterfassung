# Kapitel 6: Nebenläufigkeit & Custom UI (CellFactory)

In diesem finalen Kapitel professionalisieren wir unsere Zeiterfassungs-App. Wir sorgen dafür, dass die Oberfläche bei langsamen Datenbankzugriffen nicht einfriert und heben wichtige Daten visuell hervor.

---

## 1. Multithreading in JavaFX (Concurrency)

### Das Single-Thread-Modell
Moderne UI-Frameworks (einschließlich JavaFX) sind Single-Threaded. Das bedeutet: Alle Aktualisierungen der Benutzeroberfläche und alle Benutzerevents (Mausklicks, Tastatureingaben) werden von einem einzigen Thread verarbeitet – dem **JavaFX Application Thread**.

> [!IMPORTANT]
> **Die goldene Regel:** Führe niemals blockierende Operationen (Datenbankabfragen, Netzwerkzugriffe, Dateizugriffe) auf dem JavaFX Application Thread aus!
> Tust du es doch, friert die Benutzeroberfläche ein (der Mauszeiger wird zum Ladesymbol, die Anwendung reagiert nicht mehr).

### Asynchrone Tasks mit `javafx.concurrent.Task`
JavaFX bietet die `Task`-Klasse, um rechenintensive oder blockierende Logik in einem Hintergrundthread auszuführen und das Ergebnis sicher zurück auf den UI-Thread zu bringen.

Beispiel: Laden der Daten aus der SQLite-Datenbank beim Anwendungsstart:

```java
private void loadDataFromDatabase() {
    lblStatus.setText("Lade Daten...");
    lblStatus.setStyle("-fx-text-fill: blue;");

    // 1. Definiere den Hintergrund-Task
    Task<List<Zeiteintrag>> loadTask = new Task<>() {
        @Override
        protected List<Zeiteintrag> call() throws Exception {
            // Führt den Datenbankzugriff im Hintergrundthread aus
            return dao.findAll();
        }
    };

    // 2. Was passiert bei Erfolg? (Wird automatisch auf dem UI-Thread ausgeführt!)
    loadTask.setOnSucceeded(e -> {
        eintragsListe.setAll(loadTask.getValue());
        updateTagesuebersichten();
        lblStatus.setText("Daten erfolgreich geladen.");
        lblStatus.setStyle("-fx-text-fill: green;");
    });

    // 3. Was passiert bei Fehlern?
    loadTask.setOnFailed(e -> {
        lblStatus.setText("Fehler beim Laden der Daten.");
        lblStatus.setStyle("-fx-text-fill: red;");
        loadTask.getException().printStackTrace();
    });

    // 4. Starte den Task in einem neuen Thread
    new Thread(loadTask).start();
}
```

---

## 2. Custom Cells mit einer `CellFactory`
Eine `ListView` zeigt standardmäßig nur den Rückgabewert der `toString()`-Methode eines Objekts als einfachen Text an. 
Mithilfe einer **`CellFactory`** können wir das Aussehen einzelner Listeneinträge komplett anpassen.

### Ziel:
Wir möchten in einer ListView eine Tagesübersicht anzeigen (z. B. "2026-06-29: 8.0 Std.").
* Hat der Azubi an diesem Tag weniger als 8 Stunden gearbeitet, soll die Zelle **rötlich** gefärbt werden (Unterstunden-Warnung).
* Hat er 8 Stunden oder mehr gearbeitet, soll die Zelle **grünlich** gefärbt werden.

Wir implementieren dies in der `initialize()`-Methode des Controllers:

```java
lstArbeitstage.setCellFactory(new Callback<ListView<String>, ListCell<String>>() {
    @Override
    public ListCell<String> call(ListView<String> param) {
        return new ListCell<String>() {
            @Override
            protected void updateItem(String item, boolean empty) {
                super.updateItem(item, empty);
                
                // Falls die Zelle leer ist oder kein Wert übergeben wurde
                if (empty || item == null) {
                    setText(null);
                    setStyle("");
                } else {
                    setText(item);
                    
                    try {
                        // Extrahiere Stundenanzahl (z. B. "2026-06-29: 7.5 Std.")
                        String[] parts = item.split(": ");
                        if (parts.length == 2) {
                            String hrsStr = parts[1].replace(" Std.", "").trim();
                            double hours = Double.parseDouble(hrsStr);
                            
                            if (hours < 8.0) {
                                // Weniger als 8 Stunden -> Warnung (Rötlich)
                                setStyle("-fx-background-color: #ffcccc; -fx-text-fill: #800000; -fx-font-weight: bold;");
                            } else {
                                // Genug Stunden -> Positiv (Grünlich)
                                setStyle("-fx-background-color: #d4edda; -fx-text-fill: #155724;");
                            }
                        }
                    } catch (Exception e) {
                        setStyle(""); // Fallback bei Parsing-Fehlern
                    }
                }
            }
        };
    }
});
```

### Wie funktioniert das?
* Die Methode `updateItem` wird von JavaFX immer dann aufgerufen, wenn eine Zelle gezeichnet oder wiederverwendet wird.
* Durch den Aufruf von `setStyle(...)` ändern wir das CSS der spezifischen Zelle dynamisch basierend auf ihren aktuellen Daten.

---

## 3. Verständnisfragen für das Berichtsheft
1. Warum führt der direkte Zugriff auf UI-Elemente (z. B. `lblStatus.setText()`) aus einem separaten Thread, den du selbst gestartet hast (`new Thread()`), zu einer Exception? Welches JavaFX-Werkzeug schafft hier Abhilfe, falls man doch einmal direkt interagieren muss?
2. Beschreibe das Konzept von Zell-Wiederverwendung (Cell Recycling) in Listen. Warum ist es performanter, Zellen wiederzuverwenden, statt für jedes Element der Liste ein neues UI-Knoten-Objekt zu erzeugen?
