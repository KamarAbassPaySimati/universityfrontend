-- Insert sample users
INSERT INTO users (email, password, role) VALUES
('admin@university.edu', '$2b$10$hash', 'admin'),
('john.doe@university.edu', '$2b$10$hash', 'faculty'),
('jane.smith@university.edu', '$2b$10$hash', 'student');

-- Insert sample programs
INSERT INTO programs (name, code, duration_years) VALUES
('Computer Science', 'CS', 4),
('Business Administration', 'BA', 4),
('Engineering', 'ENG', 4);

-- Insert sample faculty
INSERT INTO faculty (user_id, first_name, last_name, employee_id, department) VALUES
(2, 'John', 'Doe', 'FAC001', 'Computer Science');

-- Insert sample students
INSERT INTO students (user_id, student_id, first_name, last_name, program_id, enrollment_year) VALUES
(3, 'STU001', 'Jane', 'Smith', 1, 2024);

-- Insert sample courses
INSERT INTO courses (code, name, credits, program_id, faculty_id, semester) VALUES
('CS101', 'Introduction to Programming', 3, 1, 1, 1),
('CS102', 'Data Structures', 3, 1, 1, 2);

-- Insert sample enrollments
INSERT INTO enrollments (student_id, course_id, academic_year, semester) VALUES
(1, 1, '2024-2025', 1),
(1, 2, '2024-2025', 2);

-- Insert sample grades
INSERT INTO student_grades (enrollment_id, grade, points, academic_year) VALUES
(1, 'A', 4.00, '2024-2025'),
(2, 'B+', 3.50, '2024-2025');