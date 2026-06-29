package de.zeiterfassung.database;

import de.zeiterfassung.model.Zeiteintrag;

import java.sql.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class SQLiteZeiteintragDAO implements ZeiteintragDAO {

    @Override
    public void save(Zeiteintrag eintrag) throws SQLException {
        String insertSql = "INSERT INTO zeiteintrag (datum, startzeit, endzeit, beschreibung) VALUES (?, ?, ?, ?)";
        String updateSql = "UPDATE zeiteintrag SET datum = ?, startzeit = ?, endzeit = ?, beschreibung = ? WHERE id = ?";

        Connection conn = DBConnection.getConnection();

        if (eintrag.getId() == 0) {
            // Einfügen (Insert)
            try (PreparedStatement pstmt = conn.prepareStatement(insertSql, Statement.RETURN_GENERATED_KEYS)) {
                pstmt.setString(1, eintrag.getDatum().toString());
                pstmt.setString(2, eintrag.getStartzeit().toString());
                pstmt.setString(3, eintrag.getEndzeit().toString());
                pstmt.setString(4, eintrag.getBeschreibung());
                pstmt.executeUpdate();

                try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        eintrag.setId(generatedKeys.getInt(1));
                    }
                }
            }
        } else {
            // Aktualisieren (Update)
            try (PreparedStatement pstmt = conn.prepareStatement(updateSql)) {
                pstmt.setString(1, eintrag.getDatum().toString());
                pstmt.setString(2, eintrag.getStartzeit().toString());
                pstmt.setString(3, eintrag.getEndzeit().toString());
                pstmt.setString(4, eintrag.getBeschreibung());
                pstmt.setInt(5, eintrag.getId());
                pstmt.executeUpdate();
            }
        }
    }

    @Override
    public List<Zeiteintrag> findAll() throws SQLException {
        List<Zeiteintrag> liste = new ArrayList<>();
        String sql = "SELECT id, datum, startzeit, endzeit, beschreibung FROM zeiteintrag ORDER BY datum DESC, startzeit DESC";

        Connection conn = DBConnection.getConnection();
        try (Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                int id = rs.getInt("id");
                LocalDate datum = LocalDate.parse(rs.getString("datum"));
                LocalTime startzeit = LocalTime.parse(rs.getString("startzeit"));
                LocalTime endzeit = LocalTime.parse(rs.getString("endzeit"));
                String beschreibung = rs.getString("beschreibung");

                liste.add(new Zeiteintrag(id, datum, startzeit, endzeit, beschreibung));
            }
        }
        return liste;
    }

    @Override
    public void delete(int id) throws SQLException {
        String sql = "DELETE FROM zeiteintrag WHERE id = ?";
        Connection conn = DBConnection.getConnection();
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            pstmt.executeUpdate();
        }
    }
}
