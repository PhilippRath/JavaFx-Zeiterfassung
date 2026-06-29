# Kapitel 3: Die Benutzeroberfläche (FXML & CSS)

In JavaFX trennen wir das Aussehen der Anwendung (die **View**) strikt von der Programmlogik (dem **Controller**). Die Oberfläche wird deklarativ in einer XML-Struktur namens **FXML** beschrieben.

---

## 1. Die Layout-Panes (Container)
Damit unsere Oberfläche auf unterschiedliche Fenstergrößen reagiert (responsive ist), nutzen wir Layout-Container statt fester Pixelkoordinaten:

1. **`BorderPane`**: Das ideale Hauptlayout. Es unterteilt das Fenster in fünf Bereiche: `top`, `bottom`, `left`, `right` und `center`.
2. **`GridPane`**: Ordnet Elemente in Zeilen und Spalten an. Perfekt, um Labels und Eingabefelder in einem Formular sauber untereinander zu platzieren.
3. **`VBox` (Vertical Box)** und **`HBox` (Horizontal Box)**: Ordnen ihre Kindelemente rein vertikal oder horizontal nacheinander an.

---

## 2. Struktur der GUI

Wir bauen unsere Zeiterfassungs-App wie folgt auf:
* **Oben (`top`):** Eine Menüleiste für Standardfunktionen (z. B. "Beenden").
* **Links (`left`):** Ein Eingabeformular (`GridPane` eingebettet in eine `VBox`) zum Buchen neuer Zeiteinträge.
* **Mitte (`center`):** Eine Tabelle (`TableView`) zur Übersicht aller gebuchten Arbeitszeiten.
* **Rechts (`right`):** Eine Liste (`ListView`) für eine aggregierte Tagesübersicht.

---

## 3. Die FXML-Datei `main_view.fxml`

Erstelle die Datei `src/main/resources/fxml/main_view.fxml`. In dieser Datei definieren wir unsere Struktur. Jedes XML-Tag entspricht einer JavaFX-Klasse. Attribute wie `fx:id` verknüpfen die XML-Elemente später mit Variablen in unserem Java-Code.

```xml
<!-- Siehe main_view.fxml im Hauptverzeichnis des Projekts -->
```

*Tipp für die Praxis:* Lade den **Scene Builder** von Gluon herunter. Mit diesem Tool kannst du FXML-Dateien per Drag-and-Drop bearbeiten. Der Scene Builder generiert die XML-Struktur im Hintergrund.

---

## 4. Design-Anpassung mit CSS

JavaFX-Oberflächen lassen sich wie Webseiten mit CSS (Cascading Style Sheets) gestalten. Fast alle JavaFX-Klassen besitzen CSS-Klassennamen, die mit `-fx-` beginnen.

Erstelle die Datei `src/main/resources/css/style.css` im Projekt, um Buttons abzurunden, Hover-Effekte hinzuzufügen und eine professionelle Schriftart ("Segoe UI" oder Systemstandards) zu definieren.

```css
/* Siehe style.css im Hauptverzeichnis des Projekts für das vollständige CSS-Design */
```

---

## 5. Verständnisfragen für das Berichtsheft
1. Worin besteht der Unterschied zwischen einer `HBox` und einem `GridPane`? Wann setzt man welchen Container sinnvollerweise ein?
2. Wie bindet man ein Stylesheet in JavaFX ein und wie unterscheiden sich die CSS-Eigenschaften in JavaFX von denen im Webdesign (z. B. Background-Color)?

---

## 🌐 Nützliche Links & Video-Empfehlungen
*   **[YouTube: codingenieur JavaFX & Scene Builder (YouTube)](https://www.youtube.com/results?search_query=codingenieur+JavaFX+Deutsch)** – Zeigt hervorragend, wie man mit dem Scene Builder Oberflächen strukturiert und Controls layoutet.
*   **[ITcademy: JavaFX Layouts (YouTube)](https://www.youtube.com/results?search_query=ITcademy+JavaFX+Layouts)** – Vertiefende Erklärung zu BorderPane, HBox, VBox und GridPane.

