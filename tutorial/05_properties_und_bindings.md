# Kapitel 5: Die Magie von Properties & Bindings

In diesem Kapitel lernen wir, wie wir Daten ohne manuellen Aktualisierungscode (wie `table.refresh()`) synchronisieren. JavaFX nutzt dafür Properties, Bindings und reaktive Collections.

---

## 1. Was sind JavaFX Properties?
Ein Property kapselt einen Wert und benachrichtigt registrierte Listener, wenn sich dieser Wert ändert.
Beispiel:
* `StringProperty` für Zeichenketten (`String`)
* `IntegerProperty` für Ganzzahlen (`int`)
* `ObjectProperty<T>` für beliebige Objekte (wie `LocalDate` oder `LocalTime`)

Dank dieser Properties kann eine Tabelle direkt "lauschen", ob sich die Daten im Modell geändert haben, und sich selbst neu zeichnen.

---

## 2. TableView & ObservableList
Eine normale `ArrayList` sendet keine Signale, wenn Elemente hinzugefügt oder gelöscht werden. JavaFX bietet dafür die **`ObservableList`**.

Wir erstellen die Liste im Controller und verbinden sie mit unserer `TableView`:

```java
// Definition im Controller
private final ObservableList<Zeiteintrag> eintragsListe = FXCollections.observableArrayList();

@FXML private TableView<Zeiteintrag> tblEintraege;
@FXML private TableColumn<Zeiteintrag, LocalDate> colDatum;
@FXML private TableColumn<Zeiteintrag, String> colBeschreibung;

@FXML
public void initialize() {
    // Spalten mit Properties des Models verbinden
    colDatum.setCellValueFactory(cellData -> cellData.getValue().datumProperty());
    colBeschreibung.setCellValueFactory(cellData -> cellData.getValue().beschreibungProperty());

    // Liste der Tabelle zuweisen
    tblEintraege.setItems(eintragsListe);
}
```

Wenn wir jetzt im Controller der `eintragsListe` einen neuen Eintrag hinzufügen:
```java
eintragsListe.add(neuerEintrag);
```
Aktualisiert sich die Tabelle **automatisch** auf dem Bildschirm!

---

## 3. UI-Logik vereinfachen mit Bindings
Bindings erlauben es, Properties von UI-Komponenten direkt miteinander zu verknüpfen. 
**Ziel:** Der "Buchen"-Button soll deaktiviert sein, solange der Benutzer nicht alle Felder ausgefüllt hat.

Statt in jedem Textfeld Listener zu schreiben und `if-else`-Kaskaden zu nutzen, schreiben wir ein einziges **deklaratives Binding** in der `initialize()`-Methode des Controllers:

```java
btnSpeichern.disableProperty().bind(
        datePicker.valueProperty().isNull()
        .or(txtStartzeit.textProperty().isEmpty())
        .or(txtEndzeit.textProperty().isEmpty())
        .or(txtBeschreibung.textProperty().isEmpty())
);
```

### Wie funktioniert das?
* `txtStartzeit.textProperty().isEmpty()` liefert ein `BooleanExpression` (ein beobachtbarer Boolean-Wert).
* Mit `.or()` verknüpfen wir diese logisch.
* Das Ergebnis binden wir an die `disableProperty` des Buttons.
* Sobald sich ein Textfeld ändert, berechnet JavaFX den logischen Ausdruck im Hintergrund neu und setzt den Button auf aktiv oder inaktiv.

---

## 4. Verständnisfragen für das Berichtsheft
1. Worin unterscheidet sich eine `ObservableList` von einer klassischen `java.util.List` (wie `ArrayList`)?
2. Erkläre den Unterschied zwischen einem unidirektionalen Binding (wie wir es beim Deaktivieren des Buttons genutzt haben) und einem bidirektionalen Binding.

---

## 🌐 Nützliche Links & Video-Empfehlungen
*   **[Falconbyte: JavaFX Properties & Bindings (Web)](https://falconbyte.net/)** – Eine fundierte schriftliche Erklärung zum Thema Properties, Observern und Bindings in JavaFX.
*   **[ITcademy: JavaFX Properties & Bindings (YouTube)](https://www.youtube.com/results?search_query=ITcademy+JavaFX+Properties+Bindings)** – Videotutorials zur reaktiven Datenverknüpfung und wie man Formularzustände automatisiert.

