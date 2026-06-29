# Kapitel 0: Java-Grundlagen & Voraussetzungen

Bevor wir mit der grafischen Oberfläche in JavaFX und der Datenbankanbindung mit JDBC starten, müssen die Java-Kernkonzepte felsenfest sitzen. Dieses Kapitel dient als Auffrischung und Fitnesstest für dein Programmierfundament.

Später im Projekt werden wir all diese Konzepte intensiv nutzen. Wenn du die folgenden Übungen problemlos lösen kannst, bist du perfekt vorbereitet!

---

## 🗺️ Inhaltsübersicht
1. **Objektorientierung & Kapselung (Encapsulation)**
2. **Vererbung & Polymorphie**
3. **Interfaces (Schnittstellen) & Abstraktion**
4. **Java Collections (`List` & `Map`)**
5. **Fehlerbehandlung (Exceptions & Try-with-Resources)**

---

## 1. Objektorientierung & Kapselung

### Das Konzept
In Java ist alles ein Objekt. Klassen beschreiben den Bauplan, Objekte sind die konkreten Instanzen.
* **Kapselung (Encapsulation)** bedeutet, dass die internen Daten eines Objekts vor direktem Zugriff von außen geschützt sind (`private`).
* Der Zugriff erfolgt kontrolliert über öffentliche Methoden (`getter`/`setter`). Hier können wir Validierungen einbauen, um ungültige Zustände zu verhindern.

### Code-Beispiel
```java
public class Mitarbeiter {
    private String name;
    private double stundensatz;

    public Mitarbeiter(String name, double stundensatz) {
        setName(name);
        setStundensatz(stundensatz);
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getStundensatz() { return stundensatz; }
    public void setStundensatz(double stundensatz) {
        if (stundensatz < 0) {
            throw new IllegalArgumentException("Stundensatz darf nicht negativ sein!");
        }
        this.stundensatz = stundensatz;
    }
}
```

### 🏋️ Übung 1: Die Klasse `Projekt`
Erstelle eine Klasse `Projekt` mit folgenden Anforderungen:
1. Private Attribute: `projektName` (String) und `budget` (double).
2. Ein Konstruktor, der beide Werte entgegennimmt.
3. Getter und Setter.
4. **Validierung:** Das Budget darf niemals unter `100.0` Euro liegen. Wird versucht, ein kleineres Budget zu setzen, soll eine `IllegalArgumentException` mit einer passenden Fehlermeldung geworfen werden.

---

## 2. Vererbung & Polymorphie

### Das Konzept
* **Vererbung (`extends`)** erlaubt es einer Unterklasse (Child Class), Attribute und Methoden einer Oberklasse (Parent Class) zu erben und zu erweitern.
* **Polymorphie (Vielgestaltigkeit)** bedeutet, dass eine Variable des Typs der Oberklasse ein Objekt der Unterklasse referenzieren kann. Zur Laufzeit wird automatisch die überschriebene Methode der Unterklasse aufgerufen.

### Code-Beispiel
```java
public class Person {
    private String name;
    public Person(String name) { this.name = name; }
    public void printInfo() { System.out.println("Person: " + name); }
}

public class Entwickler extends Person {
    private String programmiersprache;
    public Entwickler(String name, String sprache) {
        super(name);
        this.programmiersprache = sprache;
    }
    @Override
    public void printInfo() {
        System.out.println("Entwickler " + getName() + " schreibt " + programmersprache);
    }
}
```

### 🏋️ Übung 2: Die Klassenhierarchie
1. Erstelle eine Oberklasse `Aktivitaet` mit dem Attribut `bezeichnung` (String) und einer Methode `berechneKosten(double stunden)`, die standardmäßig `stunden * 15.0` (Pauschalpreis) zurückgibt.
2. Erstelle eine Unterklasse `ConsultingAktivitaet`, die von `Aktivitaet` erbt. Sie besitzt zusätzlich das Attribut `stundensatz` (double). Überschreibe die Methode `berechneKosten` so, dass sie `stunden * stundensatz` berechnet.
3. **Testaufruf:** Erstelle in einer `main`-Methode ein Array vom Typ `Aktivitaet[]`, belege es mit je einem Objekt beider Klassen und rufe in einer Schleife `berechneKosten(8)` auf. Was fällt dir bei der Ausgabe auf?

---

## 3. Interfaces & Abstraktion

### Das Konzept
Ein **Interface (Schnittstelle)** ist ein reiner Vertrag. Es legt fest, *welche* Methoden eine Klasse anbieten muss, aber nicht, *wie* sie das tut.
* Interfaces enthalten in der Regel keine Implementierungen (außer `default`-Methoden).
* Eine Klasse implementiert ein Interface mittels `implements`.
* **Bedeutung für unser Projekt:** Das DAO-Muster basiert auf Interfaces. Dadurch ist es der Benutzeroberfläche völlig egal, ob die Daten in einer SQLite-Datenbank, einer Textdatei oder über eine Webschnittstelle geladen werden – das Interface bleibt identisch!

### Code-Beispiel
```java
public interface Drucker {
    void druckeText(String text);
}

public class TintenstrahlDrucker implements Drucker {
    @Override
    public void druckeText(String text) {
        System.out.println("Drucke mit Tinte: " + text);
    }
}
```

### 🏋️ Übung 3: Der Datenspeicher
1. Definiere ein Interface `DatenExporter` mit der Methode `void exportiere(String daten)`.
2. Implementiere das Interface in zwei verschiedenen Klassen:
   * `ConsoleExporter`: Gibt die Daten einfach per `System.out.println` auf der Konsole aus.
   * `FileExporter`: Schreibt die Daten in eine Datei (Nutze `System.out.println("Schreibe in Datei: " + daten)` als Simulation).
3. Schreibe eine Testklasse, die eine Variable vom Typ `DatenExporter` deklariert. Weise ihr zuerst einen `ConsoleExporter` zu, rufe `exportiere("Testdaten")` auf, weise ihr danach einen `FileExporter` zu und rufe die Methode erneut auf.

---

## 4. Collections (`List` & `Map`)

### Das Konzept
Collections verwalten Gruppen von Objekten im Arbeitsspeicher.
* **`List<T>`** (z.B. `ArrayList`): Eine geordnete Liste von Elementen, in der Duplikate erlaubt sind. Der Zugriff erfolgt meist über einen Index oder per Schleife.
* **`Map<K, V>`** (z.B. `HashMap`): Speichert Schlüssel-Wert-Paare (Key-Value). Jeder Schlüssel ist eindeutig und verweist auf genau einen Wert. Perfekt für schnelles Suchen nach IDs.

### Code-Beispiel
```java
// Liste
List<String> projekte = new ArrayList<>();
projekte.add("Projekt A");
projekte.add("Projekt B");

// Map (ID -> Name)
Map<Integer, String> mitarbeiterMap = new HashMap<>();
mitarbeiterMap.put(101, "Max Mustermann");
String name = mitarbeiterMap.get(101); // Max Mustermann
```

### 🏋️ Übung 4: Zeitbuchungen verwalten
Gegeben ist folgende Liste von Arbeitsstunden (Double-Werte): `[8.0, 7.5, 6.0, 9.0, 8.5]`.
1. Erstelle eine `ArrayList<Double>` und füge diese Werte hinzu.
2. Schreibe eine Methode, die diese Liste übergeben bekommt und die Summe aller Stunden berechnet und zurückgibt.
3. **Erweiterung (Map):** Erstelle eine `HashMap<String, Double>`. Der Key ist der Wochentag (z. B. "Montag", "Dienstag"), der Value die Arbeitszeit. Fülle die Map für 3 Tage und gib über eine Schleife alle Wochentage aus, an denen mehr als 8.0 Stunden gearbeitet wurde.

---

## 5. Exception Handling & Try-with-Resources

### Das Konzept
Exceptions (Ausnahmen) signalisieren Fehler zur Laufzeit.
* **Unchecked Exceptions** (erben von `RuntimeException`): Müssen nicht zwingend abgefangen werden (z. B. `NullPointerException`, `IllegalArgumentException`).
* **Checked Exceptions** (erben von `Exception`): *Müssen* vom Compiler abgefangen (`try-catch`) oder weitergegeben (`throws`) werden. (Sehr häufig bei Datenbankzugriffen via JDBC: `SQLException`).

### Try-with-Resources
Wenn wir mit externen Ressourcen arbeiten (z.B. Dateien oder Datenbankverbindungen), müssen diese nach der Arbeit zwingend geschlossen werden, um Speicherlecks (Memory Leaks) zu vermeiden. Java bietet hierfür das **Try-with-Resources** Statement. Alle Klassen, die `AutoCloseable` implementieren, werden damit automatisch geschlossen.

```java
// Die Ressource (hier BufferedReader) wird nach dem Try-Block automatisch geschlossen
try (BufferedReader br = new BufferedReader(new FileReader("test.txt"))) {
    System.out.println(br.readLine());
} catch (IOException e) {
    System.err.println("Fehler beim Lesen: " + e.getMessage());
}
```

### 🏋️ Übung 5: Sicheres Dividieren & Datei-Lese-Simulation
1. Schreibe eine Methode `double dividiere(double a, double b)`. Wenn `b == 0` ist, wirf eine benutzerdefinierte unchecked Exception namens `DivisionByZeroException`.
2. Fange diese Exception in deiner Hauptmethode ab und gib eine verständliche Fehlermeldung auf der Konsole aus.
3. **Try-with-Resources:** Simuliere eine Ressource, indem du eine Klasse `DatenbankVerbindung` schreibst, die das Interface `AutoCloseable` implementiert. Überschreibe die Methode `close()` und lasse sie `"Verbindung geschlossen!"` auf der Konsole ausgeben. Nutze diese Klasse in einem Try-with-Resources Block in deiner `main`-Methode, um zu demonstrieren, dass `close()` automatisch aufgerufen wird, selbst wenn im Block ein Fehler passiert.

---

## 🌐 Nützliche Links & Video-Empfehlungen
*   **[SemperVideo: Java Tutorials für Anfänger (YouTube)](https://www.youtube.com/results?search_query=SemperVideo+Java+Tutorial)** – Sehr anschauliche Einführung in OOP, Vererbung und Klassen.
*   **[ITcademy: Java Programmieren lernen (YouTube)](https://www.youtube.com/results?search_query=ITcademy+Java+Programmieren+lernen)** – Detaillierte Playlists für fortgeschrittene Themen wie Interfaces, Collections (`List`/`Map`) und Exception Handling.

