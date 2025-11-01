-- Step 2: Import CSV data (run this after saving Excel as CSV)
COPY temp_student_data(
    registration_number,
    student_name, 
    year_of_study,
    academic_year,
    semester,
    course_code,
    course_name,
    final_grade,
    grade_description
) 
FROM 'C:\Users\Dell\Desktop\student_grades.csv' 
WITH (FORMAT csv, HEADER true);