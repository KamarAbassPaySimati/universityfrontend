-- Step 1: Create temporary table for import
CREATE TEMP TABLE temp_student_data (
    registration_number VARCHAR(50),
    student_name VARCHAR(100),
    year_of_study INTEGER,
    academic_year VARCHAR(20),
    semester VARCHAR(20),
    course_code VARCHAR(20),
    course_name VARCHAR(200),
    final_grade VARCHAR(10),
    grade_description VARCHAR(50)
);