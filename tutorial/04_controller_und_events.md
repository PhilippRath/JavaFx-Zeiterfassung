# Kapitel 4: Der Controller & Event-Handling

In diesem Kapitel hauchen wir unserer Benutzeroberfläche Leben ein. Wir schreiben den **Controller**, der als Bindeglied zwischen unserer View (FXML) und unserer Datenbanklogik fungiert.

---

## 1. Was ist ein Controller?
Ein Controller ist eine normale Java-Klasse. Sie wird in der FXML-Datei im Wurzelknoten über das Attribut `fx:controller="package.ClassName"` deklariert.

Beim Laden der FXML-Datei erzeugt JavaFX automatisch eine Instanz des Controllers.

### Die `@FXML`-Annotation
Variablen und Methoden im Controller, die mit `@FXML` annotiert sind, werden automatisch von der JavaFX-Laufzeitumgebung mit den entsprechenden Elementen der FXML-Datei verknüpft. Das Kriterium hierfür ist der übereinstimmende Name (`fx:id` in der FXML-Datei entspricht dem Variablennamen im Java-Code).

---

## 2. Der grundlegende Aufbau des Controllers

Erstelle die Klasse `src/main/java/de/zeiterfassung/controller/MainController.java` mit folgenden FXML-Deklarationen:

```java
package de.zeiterfassung.controller;

import de.zeiterfassung.database.SQLiteZeiteintragDAO;
import de.zeiterfassung.database.ZeiteintragDAO;
import de.zeiterfassung.model.Zeiteintrag;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import java.time.LocalDate;
import java.time.LocalTime;

public class MainController {

    // FXML Verknüpfungen (müssen exakt der fx:id in der FXML entsprechen!)
    @FXML private DatePicker datePicker;
    @FXML private TextField txtStartzeit;
    @FXML private TextField txtEndzeit;
    @FXML private TextField txtBeschreibung;
    @FXML private Button btnSpeichern;
    @FXML private Label lblStatus;

    private final ZeiteintragDAO dao = new SQLiteZeiteintragDAO();

    @FXML
    public void initialize() {
        // Diese Methode wird aufgerufen, sobald die FXML geladen und alle fx:id-Elemente injiziert wurden.
        datePicker.setValue(LocalDate.now());
    }
}
```

---

## 3. Event-Handling: "Buchen"-Button implementieren

Wir implementieren den Event-Handler für den Speichern-Button. Wenn der Benutzer den Button klickt, soll der Controller:
1. Die Werte aus den Textfeldern auslesen.
2. Prüfen, ob die Uhrzeiten im richtigen Format (HH:mm) eingegeben wurden.
3. Prüfen, ob die Endzeit nach der Startzeit liegt.
4. Ein `Zeiteintrag`-Objekt erstellen und über das DAO in der SQLite-Datenbank speichern.

Füge folgende Methode zu deinem `MainController` hinzu:

```java
    @FXML
    void onSpeichern(ActionEvent event) {
        lblStatus.setText(""); // Status-Label zurücksetzen
        try {
            LocalDate datum = datePicker.getValue();
            
            // Parsen der Zeitangaben (z.B. "08:30" -> LocalTime-Objekt)
            LocalTime start = LocalTime.parse(txtStartzeit.getText(), java.time.format.DateTimeFormatter.ofPattern("HH:mm"));
            LocalTime ende = LocalTime.parse(txtEndzeit.getText(), java.time.format.DateTimeFormatter.ofPattern("HH:mm"));
            String beschreibung = txtBeschreibung.getText().trim();

            // Einfache Validierung
            if (ende.isBefore(start)) {
                lblStatus.setText("Fehler: Endzeit muss nach Startzeit liegen!");
                lblStatus.setStyle("-fx-text-fill: red;");
                return;
            }

            Zeiteintrag neuerEintrag = new Zeiteintrag(datum, start, ende, beschreibung);

            // In der Datenbank speichern
            dao.save(neuerEintrag);

            lblStatus.setText("Erfolgreich in DB gespeichert!");
            lblStatus.setStyle("-fx-text-fill: green;");
            
            // Textfelder leeren
            txtStartzeit.clear();
            txtEndzeit.clear();
            txtBeschreibung.clear();

        } catch (java.time.format.DateTimeParseException e) {
            lblStatus.setText("Fehler: Zeitformat muss HH:mm sein (z.B. 08:30).");
            lblStatus.setStyle("-fx-text-fill: red;");
        } catch (Exception e) {
            lblStatus.setText("Fehler beim Speichern: " + e.getMessage());
            lblStatus.setStyle("-fx-text-fill: red;");
        }
    }
```

*Hinweis:* Binde die Methode in der FXML an den Button über das Attribut `onAction="#onSpeichern"`.

---

## 4. Verständnisfragen für das Berichtsheft
1. Welche Aufgabe übernimmt die `@FXML`-Annotation? Was passiert, wenn man sie vergisst, die Variable aber trotzdem in der FXML definiert ist?
2. Warum sollten wir Geschäfts- und Validierungsfehler (wie ein falsches Zeitformat) im Controller abfangen und behandeln, statt das Programm abstürzen zu lassen?
