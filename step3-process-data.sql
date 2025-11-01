-- Step 3: Process and insert data into main tables

-- Insert users for students
INSERT INTO users (username, email, password_hash, role, first_name, last_name, is_active)
SELECT DISTINCT
    LOWER(REPLACE(student_name, ' ', '')) as username,
    LOWER(REPLACE(student_name, ' ', '')) || '@university.edu' as email,
    '$2b$10$defaulthash' as password_hash,
    'student' as role,
    TRIM(SPLIT_PART(student_name, ',', 2)) as first_name,
    TRIM(SPLIT_PART(student_name, ',', 1)) as last_name,
    true as is_active
FROM temp_student_data
ON CONFLICT (username) DO NOTHING;

-- Insert students
INSERT INTO students (user_id, student_id, program, year, semester, gpa, enrollment_date, status)
SELECT DISTINCT
    u.id as user_id,
    t.registration_number as student_id,
    'General Studies' as program,
    t.year_of_study as year,
    CASE 
        WHEN t.semester = 'Semester 1' THEN 1
        WHEN t.semester = 'Semester 2' THEN 2
        ELSE 1
    END as semester,
    3.0 as gpa,
    '2024-01-01'::DATE as enrollment_date,
    'active' as status
FROM temp_student_data t
JOIN users u ON u.username = LOWER(REPLACE(t.student_name, ' ', ''))
ON CONFLICT (student_id) DO NOTHING;

-- Insert courses
INSERT INTO courses (course_code, title, credits)
SELECT DISTINCT 
    course_code,
    course_name,
    3 as credits
FROM temp_student_data
ON CONFLICT (course_code) DO NOTHING;

-- Insert enrollments
INSERT INTO enrollments (student_id, course_id, semester, year, grade, status)
SELECT 
    s.id as student_id,
    c.id as course_id,
    CASE 
        WHEN t.semester = 'Semester 1' THEN 'Fall'
        WHEN t.semester = 'Semester 2' THEN 'Spring'
        ELSE 'Fall'
    END as semester,
    2024 as year,
    CASE 
        WHEN t.grade_description LIKE '%Distinction%' THEN 'Distinction'
        WHEN t.grade_description LIKE '%Credit%' THEN 'Credit'  
        WHEN t.grade_description LIKE '%Pass%' THEN 'Pass'
        ELSE 'Pass'
    END as grade,
    'completed' as status
FROM temp_student_data t
JOIN students s ON s.student_id = t.registration_number
JOIN courses c ON c.course_code = t.course_code;