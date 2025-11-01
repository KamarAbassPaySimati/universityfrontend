@echo off
echo Importing CSV data via psql...

psql -U postgres -d university_db -c "CREATE TEMP TABLE temp_student_data (registration_number VARCHAR(50), student_name VARCHAR(100), year_of_study INTEGER, academic_year VARCHAR(20), semester VARCHAR(20), course_code VARCHAR(20), course_name VARCHAR(200), final_grade VARCHAR(10), grade_description VARCHAR(50));"

psql -U postgres -d university_db -c "\copy temp_student_data FROM 'C:\Users\Dell\Desktop\student_grades.csv' WITH CSV HEADER;"

echo Import completed!
pause