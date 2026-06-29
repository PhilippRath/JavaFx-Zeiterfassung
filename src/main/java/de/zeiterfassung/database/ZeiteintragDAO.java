package de.zeiterfassung.database;

import de.zeiterfassung.model.Zeiteintrag;
import java.sql.SQLException;
import java.util.List;

public interface ZeiteintragDAO {
    void save(Zeiteintrag eintrag) throws SQLException;
    List<Zeiteintrag> findAll() throws SQLException;
    void delete(int id) throws SQLException;
}
