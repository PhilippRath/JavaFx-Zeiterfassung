# Zeiterfassung Pro: JavaFX-Lernprojekt & Lernportal

Dieses Repository enthält ein vollständiges Lernprojekt für **Fachinformatiker im 2. Lehrjahr** (Schwerpunkt Anwendungsentwicklung oder Systemintegration).

Als fortlaufendes Praxisprojekt wird eine **Zeiterfassungsverwaltung** entwickelt. Dies verbindet moderne Benutzeroberflächen-Entwicklung in JavaFX mit klassischen Enterprise-Mustern wie dem **MVC-Muster** (Model-View-Controller) und dem **DAO-Pattern** (Data Access Object) auf Basis einer lokalen **SQLite-Datenbank**.

---

## 🗺️ Projekt-Komponenten

Das Repository besteht aus drei Teilen:

1.  **Das JavaFX-Projekt:** Ein lauffähiges, modulares Maven-Projekt mit SQLite-Anbindung und asynchronen Abfragen.
2.  **Das schriftliche Tutorial:** Schritt-für-Schritt-Anleitungen im Markdown-Format (zu finden im Ordner `tutorial/`).
3.  **Das interaktive HTML-Lernportal:** Ein barrierefreier und responsiver In-Browser-Reader, der alle Tutorial-Inhalte modern darstellt, den Lernfortschritt speichert und ein Dark/Light-Theme bietet.

---

## 📖 Struktur des Tutorials

- **[Kapitel 0: Java-Basics und Voraussetzungen](file:///Users/pr/Repositorys/Lernmaterialien/JavaFX%20-%20Zeiterfassung/tutorial/00_java_basics_und_voraussetzungen.md)**
  - _Themen:_ OOP, Kapselung, Vererbung, Polymorphie, Interfaces, Collections (`List`/`Map`), Exception-Handling und Try-with-Resources. Inklusive praktischer Vorübungen.
- **[Kapitel 1: Einleitung und Projekt-Setup](file:///Users/pr/Repositorys/Lernmaterialien/JavaFX%20-%20Zeiterfassung/tutorial/01_einleitung_und_setup.md)**
  - _Themen:_ Maven-Struktur, `pom.xml`, Modulsystem (`module-info.java`) und Main-Klasse (`App.java`).
- **[Kapitel 2: Das Datenmodell & die Datenbank](file:///Users/pr/Repositorys/Lernmaterialien/JavaFX%20-%20Zeiterfassung/tutorial/02_model_und_datenbank.md)**
  - _Themen:_ JavaFX Properties im Model, SQLite-Datenbankverbindung und das DAO-Pattern.
- **[Kapitel 3: Die Benutzeroberfläche](file:///Users/pr/Repositorys/Lernmaterialien/JavaFX%20-%20Zeiterfassung/tutorial/03_view_und_layout.md)**
  - _Themen:_ Layout-Panes (`BorderPane`, `GridPane`, `VBox`), Scene Builder, FXML-Deklaration und CSS-Styling.
- **[Kapitel 4: Der Controller & Event-Handling](file:///Users/pr/Repositorys/Lernmaterialien/JavaFX%20-%20Zeiterfassung/tutorial/04_controller_und_events.md)**
  - _Themen:_ `@FXML`-Annotationen, Initialisierungslogik und Event-Methoden für UI-Elemente.
- **[Kapitel 5: Die Magie von Properties & Bindings](file:///Users/pr/Repositorys/Lernmaterialien/JavaFX%20-%20Zeiterfassung/tutorial/05_properties_und_bindings.md)**
  - _Themen:_ `ObservableList` und `TableView`, Verknüpfung von Spalten und reaktive Formularvalidierung mittels Bindings.
- **[Kapitel 6: Nebenläufigkeit & Custom UI](file:///Users/pr/Repositorys/Lernmaterialien/JavaFX%20-%20Zeiterfassung/tutorial/06_concurrency_und_cellfactory.md)**
  - _Themen:_ Multithreading in JavaFX (Verwendung von `Task`), asynchrone DB-Abfragen und optische Markierung via Custom `CellFactory` in einer ListView.
- **[Kapitel 99: Weiterführende Ressourcen & Links](file:///Users/pr/Repositorys/Lernmaterialien/JavaFX%20-%20Zeiterfassung/tutorial/99_weitere_ressourcen.md)**
  - _Themen:_ Sammlung von deutschen Text-Tutorials, Fachartikeln und YouTube-Playlists.

---

## 🚀 Schnellstart

### 1. Das interaktive Lernportal starten

Öffne einfach die Datei **`index.html`** im Hauptverzeichnis des Projekts mit einem beliebigen Webbrowser deiner Wahl.

- _Barrierefreiheit:_ Vollständig tastaturbedienbar, optimierter Kontrast, Screenreader-Unterstützung und Skip-Links.
- _Lernfortschritt:_ Kann direkt im Browser abgehakt werden (Fortschritt wird offline via LocalStorage gespeichert).

### 2. Das JavaFX-Projekt ausführen

**Voraussetzungen:**

- Java JDK 17 (oder höher)
- Apache Maven

Führe im Hauptverzeichnis des Projekts folgenden Befehl aus:

```bash
mvn javafx:run
```

_(Die SQLite-Datenbankdatei `zeiterfassung.db` wird beim ersten Anwendungsstart automatisch im Projektverzeichnis erstellt)._
