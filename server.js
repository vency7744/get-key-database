const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

// Gunakan CORS
app.use(cors());

// Inisialisasi database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error(err.message);
    else {
        console.log('Connected to SQLite database.');

        // Buat tabel jika belum ada
        db.run(`
            CREATE TABLE IF NOT EXISTS keys (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                key TEXT NOT NULL,
                expires_at TEXT NOT NULL
            )
        `);
    }
});

// Endpoint untuk menghasilkan key
app.get('/api/get-key', (req, res) => {
    const key = Math.random().toString(36).substr(2, 8);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    db.run(`INSERT INTO keys (key, expires_at) VALUES (?, ?)`, [key, expiresAt], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Gagal menyimpan key.' });
        } else {
            res.json({ key });
        }
    });
});

// Jalankan server
app.listen(port, () => console.log(`Server berjalan di http://localhost:${port}`));