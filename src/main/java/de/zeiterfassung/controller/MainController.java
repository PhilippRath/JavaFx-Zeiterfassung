package de.zeiterfassung.controller;

import de.zeiterfassung.database.SQLiteZeiteintragDAO;
import de.zeiterfassung.database.ZeiteintragDAO;
import de.zeiterfassung.model.Zeiteintrag;
import javafx.application.Platform;
import javafx.beans.binding.Bindings;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.concurrent.Task;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.util.Callback;

import java.sql.SQLException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class MainController {

    @FXML private DatePicker datePicker;
    @FXML private TextField txtStartzeit;
    @FXML private TextField txtEndzeit;
    @FXML private TextField txtBeschreibung;
    @FXML private Button btnSpeichern;
    @FXML private Button btnLoeschen;
    @FXML private Label lblStatus;

    @FXML private TableView<Zeiteintrag> tblEintraege;
    @FXML private TableColumn<Zeiteintrag, LocalDate> colDatum;
    @FXML private TableColumn<Zeiteintrag, LocalTime> colStart;
    @FXML private TableColumn<Zeiteintrag, LocalTime> colEnde;
    @FXML private TableColumn<Zeiteintrag, String> colDauer;
    @FXML private TableColumn<Zeiteintrag, String> colBeschreibung;

    @FXML private ListView<String> lstArbeitstage;

    private final ObservableList<Zeiteintrag> eintragsListe = FXCollections.observableArrayList();
    private final ObservableList<String> tagesUebersichten = FXCollections.observableArrayList();
    private final ZeiteintragDAO dao = new SQLiteZeiteintragDAO();

    @FXML
    public void initialize() {
        // Standarddatum auf heute setzen
        datePicker.setValue(LocalDate.now());

        // 1. Spalten der TableView konfigurieren
        colDatum.setCellValueFactory(cellData -> cellData.getValue().datumProperty());
        colStart.setCellValueFactory(cellData -> cellData.getValue().startzeitProperty());
        colEnde.setCellValueFactory(cellData -> cellData.getValue().endzeitProperty());
        colBeschreibung.setCellValueFactory(cellData -> cellData.getValue().beschreibungProperty());
        
        // Dynamische Berechnung der Dauer als Spalteninhalt
        colDauer.setCellValueFactory(cellData -> {
            Zeiteintrag ze = cellData.getValue();
            if (ze.getStartzeit() != null && ze.getEndzeit() != null) {
                long minutes = Duration.between(ze.getStartzeit(), ze.getEndzeit()).toMinutes();
                if (minutes < 0) {
                    return new SimpleStringProperty("Ungültig (Negativ)");
                }
                long hours = minutes / 60;
                long mins = minutes % 60;
                return new SimpleStringProperty(String.format("%dh %02dmin", hours, mins));
            }
            return new SimpleStringProperty("-");
        });

        // 2. Listen an UI-Komponenten binden
        tblEintraege.setItems(eintragsListe);
        lstArbeitstage.setItems(tagesUebersichten);

        // 3. Unidirektionale Bindings für die Formularvalidierung
        btnSpeichern.disableProperty().bind(
                datePicker.valueProperty().isNull()
                .or(txtStartzeit.textProperty().isEmpty())
                .or(txtEndzeit.textProperty().isEmpty())
                .or(txtBeschreibung.textProperty().isEmpty())
        );

        // Löschen-Button deaktivieren, wenn kein Zeiteintrag in der Tabelle ausgewählt ist
        btnLoeschen.disableProperty().bind(
                tblEintraege.getSelectionModel().selectedItemProperty().isNull()
        );

        // 4. Custom CellFactory für die ListView zur farblichen Hervorhebung
        lstArbeitstage.setCellFactory(new Callback<ListView<String>, ListCell<String>>() {
            @Override
            public ListCell<String> call(ListView<String> param) {
                return new ListCell<String>() {
                    @Override
                    protected void updateItem(String item, boolean empty) {
                        super.updateItem(item, empty);
                        if (empty || item == null) {
                            setText(null);
                            setStyle("");
                        } else {
                            setText(item);
                            // Extrahiere Stundenanzahl aus dem String (z.B. "2026-06-29: 8.5 Stunden")
                            try {
                                String[] parts = item.split(": ");
                                if (parts.length == 2) {
                                    String hrsStr = parts[1].replace(" Std.", "").trim();
                                    double hours = Double.parseDouble(hrsStr);
                                    
                                    if (hours < 8.0) {
                                        // Weniger als 8 Std -> Rötlich
                                        setStyle("-fx-background-color: #ffcccc; -fx-text-fill: #800000; -fx-font-weight: bold;");
                                    } else {
                                        // 8 Std oder mehr -> Grünlich
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

        // 5. Daten initial asynchron laden
        loadDataFromDatabase();
    }

    @FXML
    void onSpeichern(ActionEvent event) {
        lblStatus.setText("");
        try {
            LocalDate datum = datePicker.getValue();
            LocalTime start = LocalTime.parse(txtStartzeit.getText(), DateTimeFormatter.ofPattern("HH:mm"));
            LocalTime ende = LocalTime.parse(txtEndzeit.getText(), DateTimeFormatter.ofPattern("HH:mm"));
            String beschreibung = txtBeschreibung.getText().trim();

            if (ende.isBefore(start)) {
                lblStatus.setText("Fehler: Endzeit muss nach Startzeit liegen!");
                lblStatus.setStyle("-fx-text-fill: red;");
                return;
            }

            Zeiteintrag neuerEintrag = new Zeiteintrag(datum, start, ende, beschreibung);

            // Asynchrones Speichern in der Datenbank
            Task<Void> saveTask = new Task<>() {
                @Override
                protected Void call() throws Exception {
                    dao.save(neuerEintrag);
                    return null;
                }
            };

            saveTask.setOnSucceeded(e -> {
                eintragsListe.add(neuerEintrag);
                updateTagesuebersichten();
                lblStatus.setText("Erfolgreich gebucht!");
                lblStatus.setStyle("-fx-text-fill: green;");
                
                // Felder leeren (außer Datum)
                txtStartzeit.clear();
                txtEndzeit.clear();
                txtBeschreibung.clear();
            });

            saveTask.setOnFailed(e -> {
                lblStatus.setText("Fehler beim Speichern in DB.");
                lblStatus.setStyle("-fx-text-fill: red;");
                saveTask.getException().printStackTrace();
            });

            new Thread(saveTask).start();

        } catch (DateTimeParseException e) {
            lblStatus.setText("Fehler: Zeitformat muss HH:mm sein (z.B. 08:30).");
            lblStatus.setStyle("-fx-text-fill: red;");
        }
    }

    @FXML
    void onDelete(ActionEvent event) {
        Zeiteintrag selected = tblEintraege.getSelectionModel().getSelectedItem();
        if (selected != null) {
            Task<Void> deleteTask = new Task<>() {
                @Override
                protected Void call() throws Exception {
                    dao.delete(selected.getId());
                    return null;
                }
            };

            deleteTask.setOnSucceeded(e -> {
                eintragsListe.remove(selected);
                updateTagesuebersichten();
                lblStatus.setText("Eintrag gelöscht.");
                lblStatus.setStyle("-fx-text-fill: blue;");
            });

            deleteTask.setOnFailed(e -> {
                lblStatus.setText("Fehler beim Löschen.");
                lblStatus.setStyle("-fx-text-fill: red;");
            });

            new Thread(deleteTask).start();
        }
    }

    private void loadDataFromDatabase() {
        lblStatus.setText("Lade Daten...");
        lblStatus.setStyle("-fx-text-fill: blue;");

        // Asynchroner Task zum Laden der Daten aus der DB
        Task<List<Zeiteintrag>> loadTask = new Task<>() {
            @Override
            protected List<Zeiteintrag> call() throws Exception {
                // Simulierter Lerneffekt: Kleine Verzögerung, um den asynchronen Vorgang sichtbar zu machen
                Thread.sleep(500); 
                return dao.findAll();
            }
        };

        loadTask.setOnSucceeded(e -> {
            eintragsListe.setAll(loadTask.getValue());
            updateTagesuebersichten();
            lblStatus.setText("Daten erfolgreich geladen.");
            lblStatus.setStyle("-fx-text-fill: green;");
        });

        loadTask.setOnFailed(e -> {
            lblStatus.setText("Fehler beim Laden der Daten aus der Datenbank.");
            lblStatus.setStyle("-fx-text-fill: red;");
            loadTask.getException().printStackTrace();
        });

        new Thread(loadTask).start();
    }

    private void updateTagesuebersichten() {
        // Gruppierung nach Datum und Aufsummierung der Stunden
        Map<LocalDate, Double> stundenProTag = eintragsListe.stream()
                .filter(ze -> ze.getStartzeit() != null && ze.getEndzeit() != null)
                .collect(Collectors.groupingBy(
                        Zeiteintrag::getDatum,
                        Collectors.summingDouble(ze -> {
                            long mins = Duration.between(ze.getStartzeit(), ze.getEndzeit()).toMinutes();
                            return mins / 60.0;
                        })
                ));

        List<String> uebersichten = stundenProTag.entrySet().stream()
                .sorted(Map.Entry.<LocalDate, Double>comparingByKey().reversed())
                .map(entry -> String.format("%s: %.1f Std.", entry.getKey().toString(), entry.getValue()))
                .collect(Collectors.toList());

        tagesUebersichten.setAll(uebersichten);
    }

    @FXML
    void onClose(ActionEvent event) {
        Platform.exit();
    }

    @FXML
    void onAbout(ActionEvent event) {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle("Über Zeiterfassung Pro");
        alert.setHeaderText("JavaFX Zeiterfassungsverwaltung");
        alert.setContentText("Dies ist ein didaktisches Lernprojekt für das 2. Lehrjahr Fachinformatik.\n\nTechnologien:\n- JavaFX\n- SQLite via JDBC\n- Asynchrones Multithreading\n- Reaktives Data-Binding");
        alert.showAndWait();
    }
}
