const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Create a connection pool instead of single connection
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'mysql',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'srithan',
    database: process.env.DB_NAME || 'tourism',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Function to test MySQL connection repeatedly until ready
function testConnection() {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('MySQL not ready, retrying in 5s...');
            setTimeout(testConnection, 5000);
        } else {
            console.log('Connected to MySQL database');
            connection.release(); // release back to pool
        }
    });
}

testConnection();

// Create bookings table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    travelers VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

pool.query(createTableQuery, (err) => {
    if (err) console.error('Error creating table:', err);
    else console.log('Bookings table ready');
});

// POST endpoint to handle booking
app.post('/book', (req, res) => {
    const { name, email, phone, destination, start_date, end_date, travelers } = req.body;

    if (!name || !email || !phone || !destination || !start_date || !end_date || !travelers) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const insertQuery = `
        INSERT INTO bookings (name, email, phone, destination, start_date, end_date, travelers)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    pool.query(insertQuery, [name, email, phone, destination, start_date, end_date, travelers], (err, result) => {
        if (err) {
            console.error('Error inserting booking:', err);
            return res.status(500).json({ message: 'Booking failed' });
        }
        return res.json({ message: 'Your travel booking has been submitted successfully!' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
