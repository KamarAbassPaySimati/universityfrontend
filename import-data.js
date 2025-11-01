const fs = require('fs');
const csv = require('csv-parser');
const { Pool } = require('pg');

// PostgreSQL connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost', 
    database: 'university_db',
    password: 'your_password',
    port: 5432,
});

// Import any CSV file to PostgreSQL table
async function importCSV(csvFile, tableName, columns) {
    const data = [];
    
    fs.createReadStream(csvFile)
        .pipe(csv())
        .on('data', (row) => {
            data.push(row);
        })
        .on('end', async () => {
            console.log(`Processing ${data.length} rows for ${tableName}`);
            
            for (const row of data) {
                try {
                    const values = columns.map(col => row[col] || null);
                    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
                    
                    await pool.query(
                        `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`,
                        values
                    );
                } catch (err) {
                    console.error(`Error inserting into ${tableName}:`, err.message);
                }
            }
            
            console.log(`Completed import for ${tableName}`);
        });
}

// Usage examples:
// importCSV('students.csv', 'students', ['student_id', 'first_name', 'last_name', 'email', 'program', 'year', 'semester']);
// importCSV('courses.csv', 'courses', ['course_code', 'title', 'credits', 'department_id']);
// importCSV('grades.csv', 'grades', ['enrollment_id', 'assignment1', 'assignment2', 'mid_sem', 'end_sem']);

// Run imports
async function runImports() {
    await importCSV('students.csv', 'students', ['student_id', 'first_name', 'last_name', 'email', 'program', 'year', 'semester']);
    pool.end();
}

runImports();