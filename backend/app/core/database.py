import sqlite3
import os
from contextlib import contextmanager
from typing import Generator

DB_FILE = os.environ.get("DB_FILE", "assessments.db")
_db_initialized = False

def init_db():
    """Initializes the SQLite schema for assessment storage."""
    global _db_initialized
    with get_db_connection(auto_init=False) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS assessments (
                id TEXT PRIMARY KEY,
                created_at TEXT NOT NULL,
                age INTEGER NOT NULL,
                gender TEXT NOT NULL,
                occupation TEXT NOT NULL,
                sleep_hours REAL NOT NULL,
                physical_activity_days INTEGER NOT NULL,
                caffeine_intake TEXT NOT NULL,
                work_stress_level INTEGER NOT NULL,
                phq9_total INTEGER NOT NULL,
                gad7_total INTEGER NOT NULL,
                dass21_depression INTEGER NOT NULL,
                dass21_anxiety INTEGER NOT NULL,
                dass21_stress INTEGER NOT NULL,
                raw_responses_json TEXT NOT NULL
            );
        """)
        conn.commit()
    _db_initialized = True

@contextmanager
def get_db_connection(auto_init: bool = True) -> Generator[sqlite3.Connection, None, None]:
    """Provides a thread-safe transactional SQLite connection."""
    global _db_initialized
    if auto_init and not _db_initialized:
        init_db()

    conn = sqlite3.connect(DB_FILE, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()
