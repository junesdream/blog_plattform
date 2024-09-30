package com.rainbowdev.backend.config;

import org.hibernate.dialect.identity.IdentityColumnSupport;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class SQLiteDialectTest {

    @Test
    void testIdentityColumnSupport() {
        SQLiteDialect dialect = new SQLiteDialect();
        IdentityColumnSupport identitySupport = dialect.getIdentityColumnSupport();

        assertNotNull(identitySupport);
        assertTrue(identitySupport.supportsIdentityColumns());
        assertEquals("select last_insert_rowid()", identitySupport.getIdentitySelectString("test_table", "test_column", 0));
        assertEquals("integer primary key autoincrement", identitySupport.getIdentityColumnString(0));
    }

    @Test
    void testHasAlterTable() {
        SQLiteDialect dialect = new SQLiteDialect();
        assertFalse(dialect.hasAlterTable());
    }

    @Test
    void testDropConstraints() {
        SQLiteDialect dialect = new SQLiteDialect();
        assertFalse(dialect.dropConstraints());
    }

    @Test
    void testGetAddForeignKeyConstraintString() {
        SQLiteDialect dialect = new SQLiteDialect();
        assertEquals("", dialect.getAddForeignKeyConstraintString("fk_test", new String[]{"test_col"}, "ref_table", new String[]{"ref_col"}, true));
    }

    @Test
    void testGetAddPrimaryKeyConstraintString() {
        SQLiteDialect dialect = new SQLiteDialect();
        assertEquals("", dialect.getAddPrimaryKeyConstraintString("pk_test"));
    }
}
