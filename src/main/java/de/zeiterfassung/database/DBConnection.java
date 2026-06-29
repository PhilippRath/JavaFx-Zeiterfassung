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
                // Lädt den SQLite JDBC-Treiber
                Class.forName("org.sqlite.JDBC");
                connection = DriverManager.getConnection(DB_URL);
                initDatabase();
            } catch (ClassNotFoundException e) {
                throw new SQLException("SQLite JDBC Treiber nicht gefunden.", e);
            }
        }
        return connection;
    }

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
            System.err.println("Fehler bei der Datenbank-Initialisierung: " + e.getMessage());
        }
    }
}
