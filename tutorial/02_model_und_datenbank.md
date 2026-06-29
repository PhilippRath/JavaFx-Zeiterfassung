# Kapitel 2: Das Datenmodell & die Datenbank (DAO-Pattern)

In diesem Kapitel legen wir das Fundament für unsere Zeiterfassungs-App. Wir strukturieren unsere Daten und schreiben die Logik, um diese in einer lokalen SQLite-Datenbank zu speichern und wieder auszulesen.

---

## 1. Das Model: `Zeiteintrag`
Ein Zeiteintrag repräsentiert eine einzelne gebuchte Arbeitszeit. Um später die Vorzüge von JavaFX (Datenbindung) voll auszunutzen, definieren wir die Felder der Klasse direkt als **JavaFX Properties**.

### Warum Properties statt einfache Datentypen?
Im klassischen Java verwenden wir z.B. einen `String` und erzeugen Getter und Setter. Wenn dieser String geändert wird, bemerkt die grafische Oberfläche davon nichts. 
Ein `StringProperty` in JavaFX ist ein "beobachtbares" Objekt (Observable). Die UI-Elemente können sich an dieses Property hängen (binden) und werden automatisch benachrichtigt, sobald sich der Wert ändert.

Erstelle die Klasse `src/main/java/de/zeiterfassung/model/Zeiteintrag.java`:

```java
package de.zeiterfassung.model;

import javafx.beans.property.*;
import java.time.LocalDate;
import java.time.LocalTime;

public class Zeiteintrag {
    private final IntegerProperty id = new SimpleIntegerProperty(this, "id");
    private final ObjectProperty<LocalDate> datum = new SimpleObjectProperty<>(this, "datum");
    private final ObjectProperty<LocalTime> startzeit = new SimpleObjectProperty<>(this, "startzeit");
    private final ObjectProperty<LocalTime> endzeit = new SimpleObjectProperty<>(this, "endzeit");
    private final StringProperty beschreibung = new SimpleStringProperty(this, "beschreibung");

    // Standard-Konstruktor
    public Zeiteintrag() {}

    // Konstruktor für neue Einträge (ohne ID, da DB diese vergibt)
    public Zeiteintrag(LocalDate datum, LocalTime startzeit, LocalTime endzeit, String beschreibung) {
        setDatum(datum);
        setStartzeit(startzeit);
        setEndzeit(endzeit);
        setBeschreibung(beschreibung);
    }

    // Konstruktor mit ID (für das Laden aus der DB)
    public Zeiteintrag(int id, LocalDate datum, LocalTime startzeit, LocalTime endzeit, String beschreibung) {
        setId(id);
        setDatum(datum);
        setStartzeit(startzeit);
        setEndzeit(endzeit);
        setBeschreibung(beschreibung);
    }

    // Getter/Setter und Property-Methoden
    public int getId() { return id.get(); }
    public void setId(int value) { this.id.set(value); }
    public IntegerProperty idProperty() { return id; }

    public LocalDate getDatum() { return datum.get(); }
    public void setDatum(LocalDate value) { this.datum.set(value); }
    public ObjectProperty<LocalDate> datumProperty() { return datum; }

    public LocalTime getStartzeit() { return startzeit.get(); }
    public void setStartzeit(LocalTime value) { this.startzeit.set(value); }
    public ObjectProperty<LocalTime> startzeitProperty() { return startzeit; }

    public LocalTime getEndzeit() { return endzeit.get(); }
    public void setEndzeit(LocalTime value) { this.endzeit.set(value); }
    public ObjectProperty<LocalTime> endzeitProperty() { return endzeit; }

    public String getBeschreibung() { return beschreibung.get(); }
    public void setBeschreibung(String value) { this.beschreibung.set(value); }
    public StringProperty beschreibungProperty() { return beschreibung; }
}
```

---

## 2. Die Datenbank-Verbindung (`DBConnection`)
Für die persistente Speicherung verwenden wir eine **SQLite-Datenbank**. SQLite benötigt keinen separaten Datenbankserver, sondern speichert die gesamte Datenbank in einer einzigen Datei (`zeiterfassung.db`) im Projektverzeichnis.

Wir implementieren ein einfaches **Singleton-Muster** für die Verbindung und initialisieren die Tabelle automatisch beim ersten Verbindungsaufbau.

Erstelle `src/main/java/de/zeiterfassung/database/DBConnection.java`:

```java
package de.zeiterfassung.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DBConnection {
    private static final String DB_URL = "jdbc:sqlite:zeiterfassung.db";
    private static Connection connection = null;

    public static synchronized Connection getConnection() throws SQLException {
        if (connection == null || connection.isClosed()) {
            try {
                Class.forName("org.sqlite.JDBC");
                connection = DriverManager.getConnection(DB_URL);
                initDatabase();
            } catch (ClassNotFoundException e) {
                throw new SQLException("SQLite JDBC Treiber nicht gefunden.", e);
            }
        }
        return connection;
    }

    // Erstellt die Tabelle 'zeiteintrag', falls sie noch nicht existiert
    private static void initDatabase() {
        String sql = """
            CREATE TABLE IF NOT EXISTS zeiteintrag (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                datum TEXT NOT NULL,
                startzeit TEXT NOT NULL,
                endzeit TEXT NOT NULL,
                beschreibung TEXT NOT NULL
            );
            """;
        try (Connection conn = DriverManager.getConnection(DB_URL);
             Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
        } catch (SQLException e) {
            System.err.println("Fehler bei der DB-Initialisierung: " + e.getMessage());
        }
    }
}
```

---

## 3. Das DAO-Pattern
Das **Data Access Object (DAO)** dient als Abstraktionsschicht zwischen unserer Java-Anwendung und der relationalen SQL-Datenbank. Dadurch bleibt der Code flexibel: Wenn wir später auf PostgreSQL oder MySQL wechseln wollen, müssen wir nur eine neue DAO-Klasse implementieren, ohne den restlichen UI-Code anzufassen.

### Schritt 3.1: Das Interface `ZeiteintragDAO`
Erstelle `src/main/java/de/zeiterfassung/database/ZeiteintragDAO.java`:

```java
package de.zeiterfassung.database;

import de.zeiterfassung.model.Zeiteintrag;
import java.sql.SQLException;
import java.util.List;

public interface ZeiteintragDAO {
    void save(Zeiteintrag eintrag) throws SQLException;
    List<Zeiteintrag> findAll() throws SQLException;
    void delete(int id) throws SQLException;
}
```

### Schritt 3.2: Die Implementierung `SQLiteZeiteintragDAO`
Wir implementieren das Interface für SQLite. Da SQLite keine nativen Datentypen für `LocalDate` oder `LocalTime` besitzt, speichern wir diese als ISO-8601-Text (`YYYY-MM-DD` und `HH:MM`) ab.

Erstelle `src/main/java/de/zeiterfassung/database/SQLiteZeiteintragDAO.java`:

```java
// Siehe SQLiteZeiteintragDAO.java im Hauptverzeichnis des Projekts für den vollen Code.
```

*Didaktischer Hinweis:* Weise die Auszubildenden darauf hin, wie wichtig `PreparedStatement` ist, um SQL-Injection-Angriffe zu verhindern.

---

## 4. Verständnisfragen für das Berichtsheft
1. Beschreibe das DAO-Pattern. Welchen Vorteil bietet dieses Muster für die Softwarewartung und Testbarkeit (z. B. Mocking)?
2. SQLite speichert Datums- und Uhrzeitwerte als Text. Welche Konsequenzen hat das für SQL-Vergleichsoperatoren (wie `<` oder `BETWEEN`)? Wie muss das Format gewählt sein, damit Vergleiche lexikografisch funktionieren?
