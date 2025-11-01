-- First, create users for students (if not exists)
INSERT INTO users (username, email, password_hash, role, first_name, last_name, is_active)
SELECT 
    LOWER(REPLACE("Student Name", ' ', '')) as username,
    LOWER(REPLACE("Student Name", ' ', '')) || '@university.edu' as email,
    '$2b$10$defaulthash' as password_hash,
    'student' as role,
    SPLIT_PART("Student Name", ', ', 2) as first_name,
    SPLIT_PART("Student Name", ', ', 1) as last_name,
    true as is_active
FROM temp_student_data
ON CONFLICT (username) DO NOTHING;

-- Import students data
INSERT INTO students (
    user_id, 
    student_id, 
    program, 
    year, 
    semester, 
    gpa, 
    credits_completed, 
    enrollment_date, 
    status
)
SELECT 
    u.id as user_id,
    "Registration Number" as student_id,
    'General Studies' as program, -- You may want to map this properly
    "Year of Study" as year,
    CASE 
        WHEN "Semester" = 'Semester 1' THEN 1
        WHEN "Semester" = 'Semester 2' THEN 2
        ELSE 1
    END as semester,
    CASE 
        WHEN "Grade Description" LIKE '%Distinction%' THEN 4.0
        WHEN "Grade Description" LIKE '%Credit%' THEN 3.0
        WHEN "Grade Description" LIKE '%Pass%' THEN 2.0
        ELSE 1.0
    END as gpa,
    0 as credits_completed,
    CONCAT("Academic Year", '-01-01')::DATE as enrollment_date,
    'active' as status
FROM temp_student_data t
JOIN users u ON u.username = LOWER(REPLACE(t."Student Name", ' ', ''));

-- Import courses (if not exists)
INSERT INTO courses (course_code, title, credits, prerequisites)
SELECT DISTINCT 
    "Course Code",
    "Course Name",
    3 as credits, -- Default credits, adjust as needed
    '' as prerequisites
FROM temp_student_data
ON CONFLICT (course_code) DO NOTHING;

-- Import enrollments and grades
INSERT INTO enrollments (student_id, course_id, semester, year, grade, status)
SELECT 
    s.id as student_id,
    c.id as course_id,
    CASE 
        WHEN t."Semester" = 'Semester 1' THEN 'Fall'
        WHEN t."Semester" = 'Semester 2' THEN 'Spring'
        ELSE 'Fall'
    END as semester,
    EXTRACT(YEAR FROM CONCAT(t."Academic Year", '-01-01')::DATE) as year,
    CASE 
        WHEN t."Grade Description" LIKE '%A%' THEN 'Distinction'
        WHEN t."Grade Description" LIKE '%B%' THEN 'Credit'  
        WHEN t."Grade Description" LIKE '%C%' THEN 'Pass'
        WHEN t."Grade Description" LIKE '%D%' THEN 'Marginal Pass'
        ELSE 'Fail'
    END as grade,
    'completed' as status
FROM temp_student_data t
JOIN students s ON s.student_id = t."Registration Number"
JOIN courses c ON c.course_code = t."Course Code";