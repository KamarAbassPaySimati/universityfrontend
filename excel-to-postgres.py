import pandas as pd
import psycopg2
from sqlalchemy import create_engine

# Database connection
engine = create_engine('postgresql://postgres:your_password@localhost:5432/university_db')

# Read Excel file
df = pd.read_excel('student_grades.xlsx')

# Rename columns to match database
df.columns = [
    'registration_number', 'student_name', 'year_of_study', 
    'academic_year', 'semester', 'course_code', 
    'course_name', 'final_grade', 'grade_description'
]

# Insert into temporary table
df.to_sql('temp_student_data', engine, if_exists='replace', index=False)

print(f"Imported {len(df)} records successfully!")