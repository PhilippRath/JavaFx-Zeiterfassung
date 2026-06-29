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

    public Zeiteintrag() {}

    public Zeiteintrag(LocalDate datum, LocalTime startzeit, LocalTime endzeit, String beschreibung) {
        setDatum(datum);
        setStartzeit(startzeit);
        setEndzeit(endzeit);
        setBeschreibung(beschreibung);
    }

    public Zeiteintrag(int id, LocalDate datum, LocalTime startzeit, LocalTime endzeit, String beschreibung) {
        setId(id);
        setDatum(datum);
        setStartzeit(startzeit);
        setEndzeit(endzeit);
        setBeschreibung(beschreibung);
    }

    // ID Property
    public int getId() { return id.get(); }
    public void setId(int value) { this.id.set(value); }
    public IntegerProperty idProperty() { return id; }

    // Datum Property
    public LocalDate getDatum() { return datum.get(); }
    public void setDatum(LocalDate value) { this.datum.set(value); }
    public ObjectProperty<LocalDate> datumProperty() { return datum; }

    // Startzeit Property
    public LocalTime getStartzeit() { return startzeit.get(); }
    public void setStartzeit(LocalTime value) { this.startzeit.set(value); }
    public ObjectProperty<LocalTime> startzeitProperty() { return startzeit; }

    // Endzeit Property
    public LocalTime getEndzeit() { return endzeit.get(); }
    public void setEndzeit(LocalTime value) { this.endzeit.set(value); }
    public ObjectProperty<LocalTime> endzeitProperty() { return endzeit; }

    // Beschreibung Property
    public String getBeschreibung() { return beschreibung.get(); }
    public void setBeschreibung(String value) { this.beschreibung.set(value); }
    public StringProperty beschreibungProperty() { return beschreibung; }
}
