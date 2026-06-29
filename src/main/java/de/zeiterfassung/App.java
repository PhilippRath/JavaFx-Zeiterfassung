package de.zeiterfassung;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import java.io.IOException;

public class App extends Application {

    @Override
    public void start(Stage stage) {
        try {
            FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("/fxml/main_view.fxml"));
            Parent root = fxmlLoader.load();
            Scene scene = new Scene(root, 900, 600);
            
            // Optional: CSS Stylesheet laden
            if (getClass().getResource("/css/style.css") != null) {
                scene.getStylesheets().add(getClass().getResource("/css/style.css").toExternalForm());
            }

            stage.setTitle("Zeiterfassung Pro - Lernprojekt");
            stage.setScene(scene);
            stage.show();
        } catch (IOException e) {
            System.err.println("Fehler beim Laden der FXML-Datei: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        launch(args);
    }
}
