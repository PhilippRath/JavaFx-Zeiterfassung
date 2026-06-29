const chapters = [
    {
        id: "basics",
        num: "0",
        title: "Java-Basics & Voraussetzungen",
        content: `
            <h1>Kapitel 0: Java-Grundlagen & Voraussetzungen</h1>
            <p>Bevor wir mit der grafischen Oberfläche in JavaFX und der Datenbankanbindung mit JDBC starten, müssen die Java-Kernkonzepte felsenfest sitzen. Dieses Kapitel dient als Auffrischung und Fitnesstest für dein Programmierfundament.</p>
            <p>Später im Projekt werden wir all diese Konzepte intensiv nutzen. Wenn du die folgenden Übungen problemlos lösen kannst, bist du perfekt vorbereitet!</p>
            
            <h2>1. Objektorientierung & Kapselung</h2>
            <p>In Java ist alles ein Objekt. Klassen beschreiben den Bauplan, Objekte sind die konkreten Instanzen.</p>
            <ul>
                <li><strong>Kapselung (Encapsulation):</strong> Die internen Daten eines Objekts sind vor direktem Zugriff von außen geschützt (<code>private</code>).</li>
                <li>Der Zugriff erfolgt kontrolliert über öffentliche Methoden (<code>getter</code> / <code>setter</code>). Hier können Validierungen einbauen, um ungültige Zustände zu verhindern.</li>
            </ul>
            
            <pre><code>public class Mitarbeiter {
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
}</code></pre>

            <div class="exercise-box">
                <div class="exercise-title">🏋️ Übung 1: Die Klasse Projekt</div>
                <ol>
                    <li>Erstelle eine Klasse <code>Projekt</code> mit den privaten Attributen <code>projektName</code> (String) und <code>budget</code> (double).</li>
                    <li>Erstelle einen Konstruktor, der beide Werte entgegennimmt.</li>
                    <li>Erstelle Getter und Setter.</li>
                    <li><strong>Validierung:</strong> Das Budget darf niemals unter 100.0 Euro liegen. Wird versucht, ein kleineres Budget zu setzen, soll eine <code>IllegalArgumentException</code> geworfen werden.</li>
                </ol>
            </div>

            <h2>2. Vererbung & Polymorphie</h2>
            <ul>
                <li><strong>Vererbung (<code>extends</code>):</strong> Erlaubt es einer Unterklasse, Attribute und Methoden einer Oberklasse zu erben und zu erweitern.</li>
                <li><strong>Polymorphie (Vielgestaltigkeit):</strong> Eine Variable des Typs der Oberklasse kann ein Objekt der Unterklasse referenzieren. Zur Laufzeit wird automatisch die überschriebene Methode der Unterklasse aufgerufen.</li>
            </ul>

            <div class="exercise-box">
                <div class="exercise-title">🏋️ Übung 2: Die Klassenhierarchie</div>
                <ol>
                    <li>Erstelle eine Oberklasse <code>Aktivitaet</code> mit dem Attribut <code>bezeichnung</code> (String) und einer Methode <code>berechneKosten(double stunden)</code>, die standardmäßig <code>stunden * 15.0</code> zurückgibt.</li>
                    <li>Erstelle eine Unterklasse <code>ConsultingAktivitaet</code>, die von <code>Aktivitaet</code> erbt und ein zusätzliches Attribut <code>stundensatz</code> (double) besitzt. Überschreibe <code>berechneKosten</code> so, dass sie <code>stunden * stundensatz</code> berechnet.</li>
                    <li>Erstelle in einer Main-Methode ein Array vom Typ <code>Aktivitaet[]</code> mit Objekten beider Klassen und rufe in einer Schleife <code>berechneKosten(8)</code> auf.</li>
                </ol>
            </div>

            <h2>3. Interfaces & Abstraktion</h2>
            <p>Ein <strong>Interface (Schnittstelle)</strong> ist ein reiner Vertrag. Es legt fest, <em>welche</em> Methoden eine Klasse anbieten muss, aber nicht, <em>wie</em> sie das tut. Das ist die absolute Basis für das DAO-Pattern, da es der UI egal ist, woher die Daten kommen (Datenbank, Datei, API).</p>

            <div class="exercise-box">
                <div class="exercise-title">🏋️ Übung 3: Der Datenspeicher</div>
                <ol>
                    <li>Definiere ein Interface <code>DatenExporter</code> mit der Methode <code>void exportiere(String daten)</code>.</li>
                    <li>Implementiere das Interface in zwei Klassen: <code>ConsoleExporter</code> (Konsolenausgabe) und <code>FileExporter</code> (simuliertes Schreiben in eine Datei).</li>
                    <li>Schreibe ein Testprogramm, das über eine Variable des Typs <code>DatenExporter</code> nacheinander beide Exporter nutzt.</li>
                </ol>
            </div>

            <h2>4. Java Collections (List & Map)</h2>
            <ul>
                <li><strong><code>List&lt;T&gt;</code></strong> (z.B. <code>ArrayList</code>): Geordnete Liste von Elementen, Duplikate erlaubt.</li>
                <li><strong><code>Map&lt;K, V&gt;</code></strong> (z.B. <code>HashMap</code>): Schlüssel-Wert-Paare (Key-Value) für schnelles Suchen anhand von Schlüsseln.</li>
            </ul>

            <div class="exercise-box">
                <div class="exercise-title">🏋️ Übung 4: Zeitbuchungen verwalten</div>
                <ol>
                    <li>Erstelle eine <code>ArrayList&lt;Double&gt;</code> mit folgenden Arbeitsstunden: <code>[8.0, 7.5, 6.0, 9.0, 8.5]</code> und berechne die Summe.</li>
                    <li>Erstelle eine <code>HashMap&lt;String, Double&gt;</code>. Der Key ist der Wochentag, der Value die Arbeitszeit. Gib alle Tage aus, an denen mehr als 8.0 Stunden gearbeitet wurde.</li>
                </ol>
            </div>

            <h2>5. Fehlerbehandlung & Try-with-Resources</h2>
            <p>Wir nutzen Exceptions, um Fehler zur Laufzeit abzufangen. Bei der Arbeit mit Ressourcen (Datenbanken, Dateien) nutzen wir das <strong>Try-with-Resources</strong>-Statement, um offene Verbindungen automatisch zu schließen und Memory Leaks zu vermeiden.</p>

            <div class="exercise-box">
                <div class="exercise-title">🏋️ Übung 5: Sicheres Dividieren & Try-with-Resources</div>
                <ol>
                    <li>Schreibe eine Methode <code>dividiere(double a, double b)</code>. Wenn <code>b == 0</code> ist, wirf eine benutzerdefinierte unchecked Exception namens <code>DivisionByZeroException</code>.</li>
                    <li>Schreibe eine Klasse <code>DatenbankVerbindung</code>, die <code>AutoCloseable</code> implementiert, und nutze sie in einem Try-with-Resources-Block, um zu zeigen, dass die Methode <code>close()</code> automatisch aufgerufen wird.</li>
                </ol>
            </div>

            <h2>🌐 Nützliche Links & Video-Empfehlungen</h2>
            <ul>
                <li><strong><a href="https://www.youtube.com/results?search_query=SemperVideo+Java+Tutorial" target="_blank" rel="noopener">SemperVideo: Java Tutorials für Anfänger (YouTube)</a></strong> – Sehr anschauliche Einführung in OOP, Vererbung und Klassen.</li>
                <li><strong><a href="https://www.youtube.com/results?search_query=ITcademy+Java+Programmieren+lernen" target="_blank" rel="noopener">ITcademy: Java Programmieren lernen (YouTube)</a></strong> – Detaillierte Playlists für fortgeschrittene Themen wie Interfaces, Collections (List/Map) und Exception Handling.</li>
            </ul>
        `
    },
    {
        id: "setup",
        num: "1",
        title: "Projekt-Setup & Maven",
        content: `
            <h1>Kapitel 1: Einleitung und Projekt-Setup</h1>
            <p>In diesem Kapitel richten wir unser JavaFX-Projekt mit Maven ein und legen die grundlegende Dateistruktur fest.</p>
            
            <h2>1. Die Projektstruktur</h2>
            <p>Wir trennen unsere Anwendung sauber nach dem MVC- und DAO-Muster auf:</p>
            <pre><code>src/main/java/de/zeiterfassung/
├── model/          # POJOs (z.B. Zeiteintrag)
├── database/       # DBConnection, DAOs (Datenzugriff)
├── controller/     # JavaFX-Controller für die Logik
└── App.java        # Main-Klasse (Startet die Stage)
src/main/resources/
└── fxml/           # UI-Dateien (z.B. main_view.fxml)</code></pre>

            <h2>2. Maven Konfiguration (pom.xml)</h2>
            <p>Die <code>pom.xml</code> verwaltet unsere Bibliotheken (JavaFX und SQLite-Treiber). Sie enthält folgende Kern-Abhängigkeiten:</p>
            <ul>
                <li><code>javafx-controls</code>: Basis-Controls wie Buttons, Textfelder.</li>
                <li><code>javafx-fxml</code>: Zum Laden der deklarativen XML-Oberflächen.</li>
                <li><code>sqlite-jdbc</code>: Der Treiber für unsere lokale SQLite-Datenbank.</li>
            </ul>

            <h2>3. Das Modulsystem (module-info.java)</h2>
            <p>JavaFX benötigt ab Java 9 explizite Reflection-Rechte, um auf deine Klassen zuzugreifen. Erstelle die Datei <code>src/main/java/module-info.java</code>:</p>
            <pre><code>module de.zeiterfassung {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.sql;

    opens de.zeiterfassung.controller to javafx.fxml;
    opens de.zeiterfassung.model to javafx.base;

    exports de.zeiterfassung;
}</code></pre>

            <h2>4. Die Main-Klasse (App.java)</h2>
            <p>Der Einstiegspunkt erbt von <code>javafx.application.Application</code> und lädt unsere FXML-Oberfläche in das Fenster (die Stage):</p>
            <pre><code>public class App extends Application {
    @Override
    public void start(Stage stage) {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("/fxml/main_view.fxml"));
            Parent root = loader.load();
            Scene scene = new Scene(root, 900, 600);
            stage.setTitle("Zeiterfassung Pro");
            stage.setScene(scene);
            stage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    public static void main(String[] args) { launch(args); }
}</code></pre>

            <h2>📝 Fragen für das Berichtsheft</h2>
            <ol>
                <li>Warum trennen wir die Benutzeroberfläche (FXML) vom Programmcode (Java)? Welche Vorteile bietet diese Trennung im Team (z.B. Designer und Entwickler)?</li>
                <li>Was ist die Aufgabe der <code>module-info.java</code> und warum müssen wir Pakete explizit mit <code>opens</code> für andere Module freigeben?</li>
            </ol>

            <h2>🌐 Nützliche Links & Video-Empfehlungen</h2>
            <ul>
                <li><strong><a href="https://falconbyte.net/" target="_blank" rel="noopener">Falconbyte: JavaFX Tutorial (Web)</a></strong> – Hervorragende deutsche Textanleitung für die modularisierte Einrichtung von JavaFX-Projekten.</li>
                <li><strong><a href="https://www.youtube.com/results?search_query=ITcademy+JavaFX+Deutsch" target="_blank" rel="noopener">ITcademy: JavaFX Einführung (YouTube)</a></strong> – Einstiegsvideos, die zeigen, wie man JavaFX-Projekte aufsetzt und die Struktur versteht.</li>
            </ul>
        `
    },
    {
        id: "database",
        num: "2",
        title: "Datenmodell & Datenbank",
        content: `
            <h1>Kapitel 2: Das Datenmodell & die Datenbank (DAO-Pattern)</h1>
            <p>Wir strukturieren unsere Daten und schreiben die Logik, um diese in einer lokalen SQLite-Datenbank zu speichern und wieder auszulesen.</p>
            
            <h2>1. Das Model: Zeiteintrag</h2>
            <p>Um später die Vorzüge von JavaFX (Datenbindung) voll auszunutzen, definieren wir die Felder der Klasse direkt als <strong>JavaFX Properties</strong>. Ein <code>StringProperty</code> ist im Gegensatz zu einem normalen String beobachtbar. Die UI-Elemente lauschen auf dieses Property und aktualisieren sich selbst, sobald sich der Wert ändert.</p>

            <h2>2. Die Datenbank-Verbindung (DBConnection)</h2>
            <p>Wir verwenden eine dateibasierte <strong>SQLite-Datenbank</strong>. SQLite speichert die gesamte Datenbank in einer einzigen Datei (<code>zeiterfassung.db</code>). Wir schreiben ein einfaches Singleton-Muster und legen die Tabelle automatisch beim ersten Verbindungsaufbau an.</p>
            
            <h2>3. Das DAO-Pattern</h2>
            <p>Das <strong>Data Access Object (DAO)</strong> dient als Abstraktionsschicht zwischen unserer Java-Anwendung und der relationalen SQL-Datenbank. Dadurch bleibt der Code flexibel und wir können die Datenbank austauschen, ohne den UI-Code anzufassen.</p>
            <pre><code>public interface ZeiteintragDAO {
    void save(Zeiteintrag eintrag) throws SQLException;
    List&lt;Zeiteintrag&gt; findAll() throws SQLException;
    void delete(int id) throws SQLException;
}</code></pre>

            <h2>📝 Fragen für das Berichtsheft</h2>
            <ol>
                <li>Beschreibe das DAO-Pattern. Welchen Vorteil bietet dieses Muster für die Softwarewartung und Testbarkeit (z.B. Mocking)?</li>
                <li>SQLite speichert Datums- und Uhrzeitwerte als Text. Welche Konsequenzen hat das für SQL-Vergleichsoperatoren (wie <code>&lt;</code> oder <code>BETWEEN</code>)? Wie muss das Format gewählt sein, damit Vergleiche lexikografisch funktionieren?</li>
            </ol>

            <h2>🌐 Nützliche Links & Video-Empfehlungen</h2>
            <ul>
                <li><strong><a href="https://de.wikipedia.org/wiki/Data_Access_Object" target="_blank" rel="noopener">Wikipedia: Data Access Object (DAO)</a></strong> – Wikipedia-Definition und Diagramme zum Verständnis des DAO-Musters.</li>
                <li><strong><a href="https://www.youtube.com/results?search_query=DAO+Pattern+Java+Deutsch" target="_blank" rel="noopener">YouTube: DAO Pattern Java Deutsch</a></strong> – Video-Erklärungen, die die Entkopplung von Business-Logik und DB-Zugriff anschaulich zeigen.</li>
                <li><strong><a href="https://www.youtube.com/results?search_query=Java+SQLite+JDBC+Deutsch" target="_blank" rel="noopener">YouTube: Java SQLite JDBC Deutsch</a></strong> – Tutorials, wie man SQLite-Datenbankdateien mit JDBC anspricht.</li>
            </ul>
        `
    },
    {
        id: "view",
        num: "3",
        title: "Benutzeroberfläche & FXML",
        content: `
            <h1>Kapitel 3: Die Benutzeroberfläche (FXML & CSS)</h1>
            <p>In JavaFX beschreiben wir die Oberfläche deklarativ in einer XML-Struktur namens **FXML** und gestalten sie mit **CSS**.</p>
            
            <h2>1. Die Layout-Panes</h2>
            <ul>
                <li><strong>BorderPane:</strong> Teilt das Fenster in fünf Zonen (top, bottom, left, right, center) auf. Ideal als Hauptlayout.</li>
                <li><strong>GridPane:</strong> Tabellarische Ausrichtung in Zeilen und Spalten. Optimal für Eingabeformulare.</li>
                <li><strong>VBox / HBox:</strong> Ordnet Kindelemente linear vertikal bzw. horizontal an.</li>
            </ul>

            <h2>2. Struktur der GUI</h2>
            <ul>
                <li><strong>Oben (top):</strong> Eine Menüleiste für Standardfunktionen.</li>
                <li><strong>Links (left):</strong> Ein Eingabeformular (GridPane in einer VBox) zum Buchen neuer Zeiteinträge.</li>
                <li><strong>Mitte (center):</strong> Eine Tabelle (<code>TableView</code>) zur Übersicht aller gebuchten Arbeitszeiten.</li>
                <li><strong>Rechts (right):</strong> Eine Liste (<code>ListView</code>) für die aggregierte Tagesübersicht.</li>
            </ul>

            <h2>3. CSS-Styling</h2>
            <p>JavaFX lässt sich ähnlich wie Webseiten mit CSS formatieren. Alle JavaFX-spezifischen CSS-Eigenschaften fangen mit dem Präfix <code>-fx-</code> an, z.B. <code>-fx-background-color</code> oder <code>-fx-font-family</code>.</p>

            <h2>📝 Fragen für das Berichtsheft</h2>
            <ol>
                <li>Worin besteht der Unterschied zwischen einer <code>HBox</code> und einem <code>GridPane</code>? Wann setzt man welchen Container sinnvollerweise ein?</li>
                <li>Wie bindet man ein Stylesheet in JavaFX ein und wie unterscheiden sich die CSS-Eigenschaften in JavaFX von denen im Webdesign (z. B. Background-Color)?</li>
            </ol>

            <h2>🌐 Nützliche Links & Video-Empfehlungen</h2>
            <ul>
                <li><strong><a href="https://www.youtube.com/results?search_query=codingenieur+JavaFX+Deutsch" target="_blank" rel="noopener">YouTube: codingenieur JavaFX & Scene Builder (YouTube)</a></strong> – Zeigt hervorragend, wie man mit dem Scene Builder Oberflächen strukturiert und Controls layoutet.</li>
                <li><strong><a href="https://www.youtube.com/results?search_query=ITcademy+JavaFX+Layouts" target="_blank" rel="noopener">ITcademy: JavaFX Layouts (YouTube)</a></strong> – Vertiefende Erklärung zu BorderPane, HBox, VBox und GridPane.</li>
            </ul>
        `
    },
    {
        id: "controller",
        num: "4",
        title: "Controller & Events",
        content: `
            <h1>Kapitel 4: Der Controller & Event-Handling</h1>
            <p>In diesem Kapitel verknüpfen wir die Benutzeroberfläche mit unserer Java-Logik und fangen Benutzeraktionen wie Button-Klicks ab.</p>
            
            <h2>1. Die <code>@FXML</code>-Annotation</h2>
            <p>Der Controller ist das Bindeglied zur FXML-Datei. Variablen und Methoden, die in der FXML-Datei deklariert sind (mittels <code>fx:id</code> bzw. <code>onAction</code>), müssen im Java-Code mit der <code>@FXML</code>-Annotation versehen werden, damit JavaFX sie per Dependency Injection verbinden kann.</p>

            <h2>2. Event-Handling beim Buchen</h2>
            <p>Wenn der Benutzer auf "Buchen" klickt, liest der Controller die Werte aus den Feldern aus, validiert die Zeiten (z.B. ob die Endzeit nach der Startzeit liegt), erzeugt ein <code>Zeiteintrag</code>-Objekt und speichert dieses über unser DAO-Interface in der SQLite-Datenbank.</p>
            
            <pre><code>@FXML
void onSpeichern(ActionEvent event) {
    // 1. Eingaben auslesen
    // 2. Zeiten validieren
    // 3. Zeiteintrag-Objekt anlegen
    // 4. dao.save(neuerEintrag) aufrufen
}</code></pre>

            <h2>📝 Fragen für das Berichtsheft</h2>
            <ol>
                <li>Welche Aufgabe übernimmt die <code>@FXML</code>-Annotation? Was passiert, wenn man sie vergisst, die Variable aber trotzdem in der FXML definiert ist?</li>
                <li>Warum sollten wir Geschäfts- und Validierungsfehler (wie ein falsches Zeitformat) im Controller abfangen und behandeln, statt das Programm abstürzen zu lassen?</li>
            </ol>

            <h2>🌐 Nützliche Links & Video-Empfehlungen</h2>
            <ul>
                <li><strong><a href="https://www.youtube.com/results?search_query=ITcademy+JavaFX+Buttons+Events" target="_blank" rel="noopener">ITcademy: JavaFX Buttons & Events (YouTube)</a></strong> – Einstieg in das Event-Handling und die Interaktion mit dem FXML-Controller.</li>
                <li><strong><a href="https://www.youtube.com/results?search_query=codingenieur+JavaFX+Controller+FXML" target="_blank" rel="noopener">codingenieur: JavaFX Controller-Anbindung (YouTube)</a></strong> – Praxis-Guide für die Einbindung des Java-Controllers in die FXML-Datei.</li>
            </ul>
        `
    },
    {
        id: "bindings",
        num: "5",
        title: "Properties & Bindings",
        content: `
            <h1>Kapitel 5: Die Magie von Properties & Bindings</h1>
            <p>Hier lernen wir, wie Daten reaktiv und synchron zwischen Benutzeroberfläche und Modell fließen, ohne dass manueller Aktualisierungscode geschrieben werden muss.</p>
            
            <h2>1. TableView & ObservableList</h2>
            <p>Wir verwenden eine <code>ObservableList</code>, um unsere Zeiteinträge zu verwalten. Diese Liste wirft bei jeder Änderung (Hinzufügen, Löschen) Events. Die <code>TableView</code> lauscht auf diese Events. Verbinden wir die Liste mit der Tabelle, aktualisiert sich die Oberfläche automatisch bei jeder Änderung in der Liste!</p>
            <pre><code>tblEintraege.setItems(eintragsListe);</code></pre>

            <h2>2. Deklarative Formularvalidierung</h2>
            <p>Mit Bindings können wir den Zustand von Elementen verknüpfen. Zum Beispiel soll der Buchen-Button deaktiviert sein, solange Eingabefelder leer sind. Dies geschieht in einer einzigen, lesbaren Zeile:</p>
            <pre><code>btnSpeichern.disableProperty().bind(
    datePicker.valueProperty().isNull()
    .or(txtStartzeit.textProperty().isEmpty())
    .or(txtEndzeit.textProperty().isEmpty())
    .or(txtBeschreibung.textProperty().isEmpty())
);</code></pre>

            <h2>📝 Fragen für das Berichtsheft</h2>
            <ol>
                <li>Worin unterscheidet sich eine <code>ObservableList</code> von einer klassischen <code>java.util.List</code> (wie <code>ArrayList</code>)?</li>
                <li>Erkläre den Unterschied zwischen einem unidirektionalen Binding (wie wir es beim Deaktivieren des Buttons genutzt haben) und einem bidirektionalen Binding.</li>
            </ol>

            <h2>🌐 Nützliche Links & Video-Empfehlungen</h2>
            <ul>
                <li><strong><a href="https://falconbyte.net/" target="_blank" rel="noopener">Falconbyte: JavaFX Properties & Bindings (Web)</a></strong> – Eine fundierte schriftliche Erklärung zum Thema Properties, Observern und Bindings in JavaFX.</li>
                <li><strong><a href="https://www.youtube.com/results?search_query=ITcademy+JavaFX+Properties+Bindings" target="_blank" rel="noopener">ITcademy: JavaFX Properties & Bindings (YouTube)</a></strong> – Videotutorials zur reaktiven Datenverknüpfung und wie man Formularzustände automatisiert.</li>
            </ul>
        `
    },
    {
        id: "concurrency",
        num: "6",
        title: "Nebenläufigkeit & Custom Cells",
        content: `
            <h1>Kapitel 6: Nebenläufigkeit & Custom UI (CellFactory)</h1>
            <p>Wir optimieren die Performance unserer App und passen das Rendering von Listenelementen individuell an.</p>
            
            <h2>1. Concurrency (Multithreading)</h2>
            <p><strong>Die goldene Regel:</strong> Führe niemals blockierende Operationen (wie Datenbankzugriffe) auf dem JavaFX Application Thread aus! Sonst friert die GUI ein.</p>
            <p>Wir nutzen <code>javafx.concurrent.Task</code>, um langwierige Operationen asynchron in einem Hintergrundthread auszuführen. Sobald der Task fertig ist, meldet er das Ergebnis auf dem UI-Thread zurück und wir aktualisieren die Oberfläche sicher.</p>

            <h2>2. Custom Rendering mit der CellFactory</h2>
            <p>Mit einer <code>CellFactory</code> können wir das Aussehen einzelner Zellen komplett steuern. Wir nutzen dies für unsere Tagesübersicht: Liegt die gesamte Arbeitszeit an einem Tag unter 8.0 Stunden, färben wir die Zelle rötlich, andernfalls grünlich.</p>

            <h2>📝 Fragen für das Berichtsheft</h2>
            <ol>
                <li>Warum führt der direkte Zugriff auf UI-Elemente aus einem separaten Thread, den du selbst gestartet hast (<code>new Thread()</code>), zu einer Exception? Welches JavaFX-Werkzeug schafft hier Abhilfe?</li>
                <li>Beschreibe das Konzept von Zell-Wiederverwendung (Cell Recycling) in Listen. Warum ist es performanter, Zellen wiederzuverwenden, statt für jedes Element ein neues UI-Knoten-Objekt zu erzeugen?</li>
            </ol>

            <h2>🌐 Nützliche Links & Video-Empfehlungen</h2>
            <ul>
                <li><strong><a href="https://falconbyte.net/" target="_blank" rel="noopener">Falconbyte: Concurrency in JavaFX (Web)</a></strong> – Schriftliche Einführung in Threads, den JavaFX Application Thread, <code>Platform.runLater()</code> und <code>Task</code>.</li>
                <li><strong><a href="https://www.youtube.com/results?search_query=JavaFX+Threads+und+Concurrency" target="_blank" rel="noopener">YouTube-Suche: JavaFX Threads und Concurrency</a></strong> – Videoanleitungen zum Thema Multithreading in JavaFX (warum die UI blockiert und wie man es löst).</li>
            </ul>
        `
    },
    {
        id: "resources",
        num: "99",
        title: "Zusätzliche Ressourcen",
        content: `
            <h1>Kapitel 99: Weiterführende Ressourcen & Links</h1>
            <p>Hier findest du eine strukturierte Übersicht über alle empfohlenen Lernquellen auf Deutsch.</p>
            
            <h2>Lern-Websites</h2>
            <ul>
                <li><strong><a href="https://falconbyte.net/" target="_blank" rel="noopener">Falconbyte.net JavaFX Tutorials</a></strong> – Didaktisch hervorragend aufgebaute Text-Tutorials für JavaFX und Modulkonfiguration.</li>
                <li><strong><a href="https://de.wikipedia.org/wiki/Data_Access_Object" target="_blank" rel="noopener">Wikipedia: Data Access Object</a></strong> – Theoretischer Hintergrund zum DAO-Muster.</li>
            </ul>

            <h2>YouTube-Kanäle für Java & JavaFX</h2>
            <ul>
                <li><strong><a href="https://www.youtube.com/results?search_query=ITcademy+JavaFX+Deutsch" target="_blank" rel="noopener">ITcademy (JavaFX)</a></strong> – Sehr gute Playlists für Anfänger und Fortgeschrittene zu Layouts, Properties und Controllern.</li>
                <li><strong><a href="https://www.youtube.com/results?search_query=codingenieur+JavaFX+Deutsch" target="_blank" rel="noopener">codingenieur</a></strong> – Fokus auf Scene Builder und die MVC-Architektur.</li>
                <li><strong><a href="https://www.youtube.com/results?search_query=SemperVideo+Java+Tutorial" target="_blank" rel="noopener">SemperVideo</a></strong> – Die perfekte Auffrischung für Java-OOP-Grundlagen.</li>
            </ul>
        `
    }
];
