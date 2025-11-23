-- Create Student Records table for Excel data import
CREATE TABLE student_records (
    id SERIAL PRIMARY KEY,
    registration_number VARCHAR(50) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    year_of_study INTEGER NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    final_grade INTEGER NOT NULL,
    grade_description VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert your Excel data
INSERT INTO student_records (registration_number, student_name, year_of_study, academic_year, semester, course_code, course_name, final_grade, grade_description) VALUES
('BBA/10/LL/NE/007', 'Kasewentha, Rowland', 1, '2010-2011', 'Semester 1', 'DP 112', 'Communication Studies I', 71, 'A - Distinction'),
('BBA/10/LL/CE/034', 'Sendeza, Patricia', 3, '2010-2011', 'Semester 1', 'BUS 312', 'Management Information Systems', 71, 'A -Distinction'),
('BBA/10/LL/CE/034', 'Sendeza, Patricia', 3, '2010-2011', 'Semester 1', 'BUS 313', 'Communication Management', 65, 'B - Credit'),
('BBA/10/LL/CE/034', 'Sendeza, Patricia', 3, '2010-2011', 'Semester 1', 'BUS 311', 'Research Methodology', 60, 'B - Credit'),
('BBA/10/LL/CE/034', 'Sendeza, Patricia', 3, '2010-2011', 'Semester 1', 'BUS 314', 'Legal Environment of Business', 63, 'B - Credit'),
('MBA/11/LL/CE/01/001', 'Adebayo, Comfort', 1, '2011-2012', 'Semester 1', 'HRM 514', 'Strategic Human Resource Management', 58, 'C - Pass'),
('MBA/11/LL/CE/01/001', 'Adebayo, Comfort', 1, '2011-2012', 'Semester 1', 'BUS 512', 'Business Ethics', 64, 'B - Credit'),
('MBA/11/LL/CE/01/001', 'Adebayo, Comfort', 1, '2011-2012', 'Semester 1', 'BUS 511', 'Business Research Methodology', 66, 'B - Credit'),
('MBA/11/LL/CE/01/001', 'Adebayo, Comfort', 1, '2011-2012', 'Semester 1', 'HRM 513', 'Organizational Behaviour', 69, 'B - Credit'),
('BBA/11/LL/NE/006', 'Baluwa, Chikumbutso', 1, '2011-2012', 'Semester 1', 'BUS 113', 'Micro Economics', 50, 'C - Pass'),
('BBA/11/LL/NE/006', 'Baluwa, Chikumbutso', 1, '2011-2012', 'Semester 1', 'ACC 111', 'Financial Accounting I', 52, 'C - Pass'),
('BBA/11/LL/NE/006', 'Baluwa, Chikumbutso', 1, '2011-2012', 'Semester 1', 'BUS 110', 'Business Mathematics I', 55, 'C - Pass');