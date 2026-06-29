module de.zeiterfassung {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.sql;

    // Erlaubt dem FXMLLoader Zugriff auf unsere Controller
    opens de.zeiterfassung.controller to javafx.fxml;
    
    // Erlaubt der TableView Zugriff auf die Properties in den Models
    opens de.zeiterfassung.model to javafx.base;

    // Exportiert das Hauptpaket, damit App gestartet werden kann
    exports de.zeiterfassung;
}
