# Kapitel 1: Einleitung und Projekt-Setup

Willkommen zum JavaFX-Tutorial! In dieser Artikelserie entwickeln wir Schritt für Schritt eine **Zeiterfassungsverwaltung**. 

Dieses Projekt verbindet die moderne Benutzeroberflächen-Entwicklung (JavaFX) mit typischen Architekturmustern (MVC-Muster und DAO-Pattern) und Datenhaltung (SQLite).

---

## 1. Das Ziel
Am Ende dieses Tutorials wirst du eine Desktop-Anwendung gebaut haben, die:
1. Eine relationale SQLite-Datenbank nutzt, um Buchungen persistent zu speichern.
2. Über JavaFX-Properties und Bindings Eingaben in Echtzeit validiert und anzeigt.
3. Zeitaufwendige Operationen (wie das Laden von Daten aus der DB) in einen asynchronen Hintergrundthread auslagert, damit die GUI flüssig bedienbar bleibt.

---

## 2. Die Architektur: MVC & DAO
Wir trennen unsere Anwendung sauber auf:
* **Model (Modell):** Reine Java-Klassen (POJOs), welche die Datenstrukturen abbilden (z.B. `Zeiteintrag`).
* **View (Ansicht):** Die Benutzeroberfläche, deklarativ in **FXML** (XML-basiertes Format) beschrieben und mit CSS gestylt.
* **Controller (Steuerung):** Die Vermittlungsstelle, die Events aus der View entgegennimmt, Daten verarbeitet und das Model aktualisiert.
* **DAO (Data Access Object):** Kapselt den Zugriff auf die Datenbank. Die Geschäftslogik weiß nicht, *wie* Daten gespeichert werden (ob in einer Datei, einer SQL-Datenbank oder Cloud), sondern nutzt nur ein definiertes Interface.

---

## 3. Schritt-für-Schritt: Projekt aufsetzen (Maven)

Wir nutzen Maven als Build-Tool, um Abhängigkeiten wie JavaFX und den SQLite-Treiber automatisch zu verwalten.

### Schritt 3.1: Die `pom.xml` anlegen
Erstelle im Projektverzeichnis die Datei `pom.xml`. Sie definiert unser Projekt und lädt die JavaFX-Module sowie den JDBC-Treiber herunter:

```xml
<!-- Siehe die pom.xml im Hauptverzeichnis des Projekts -->
```

### Schritt 3.2: Das Java-Modulsystem (`module-info.java`)
JavaFX benötigt ab Java 9 explizite Berechtigungen, um per Reflection auf deine Controller-Klassen (für das Event-Handling) und Model-Klassen (für die Tabellendarstellung) zugreifen zu können.

Erstelle die Datei `src/main/java/module-info.java` mit folgendem Inhalt:

```java
module de.zeiterfassung {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.sql; // Für JDBC / SQLite

    // Erlaubt dem FXMLLoader Zugriff auf unsere Controller
    opens de.zeiterfassung.controller to javafx.fxml;
    
    // Erlaubt der TableView Zugriff auf die Properties in den Models
    opens de.zeiterfassung.model to javafx.base;

    // Exportiert das Hauptpaket, damit App gestartet werden kann
    exports de.zeiterfassung;
}
```

### Schritt 3.3: Die Main-Klasse `App.java`
Wir benötigen eine Einstiegsklasse, die die JavaFX-Laufzeitumgebung initialisiert und unser Hauptfenster (die `Stage`) anzeigt.

Erstelle die Klasse `src/main/java/de/zeiterfassung/App.java`:

```java
package de.zeiterfassung;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class App extends Application {

    @Override
    public void start(Stage stage) {
        try {
            // Lädt die FXML-Datei (die Oberfläche)
            FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("/fxml/main_view.fxml"));
            Parent root = fxmlLoader.load();
            Scene scene = new Scene(root, 900, 600);
            
            // CSS stylesheet binden, falls vorhanden
            if (getClass().getResource("/css/style.css") != null) {
                scene.getStylesheets().add(getClass().getResource("/css/style.css").toExternalForm());
            }

            stage.setTitle("Zeiterfassung Pro");
            stage.setScene(scene);
            stage.show();
        } catch (IOException e) {
            System.err.println("Fehler beim Laden der Oberfläche: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}
```

---

## 4. Verständnisfragen für das Berichtsheft
1. Warum trennen wir die Benutzeroberfläche (FXML) vom Programmcode (Java)? Welche Vorteile bietet diese Trennung im Team (z. B. Designer und Entwickler)?
2. Was ist die Aufgabe der `module-info.java` und warum müssen wir Pakete explizit mit `opens` für andere Module freigeben?

---

## 🌐 Nützliche Links & Video-Empfehlungen
*   **[Falconbyte: JavaFX Tutorial (Web)](https://falconbyte.net/)** – Eine hervorragende deutsche Textanleitung für die modularisierte Einrichtung von JavaFX-Projekten.
*   **[ITcademy: JavaFX Einführung (YouTube)](https://www.youtube.com/results?search_query=ITcademy+JavaFX+Deutsch)** – Start-Videos, die zeigen, wie man JavaFX-Projekte aufsetzt und die Struktur versteht.

