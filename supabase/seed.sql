-- Insert sample resources
INSERT INTO resources (name, type, address) VALUES
    ('Community Center', 'Public Facility', '123 Main St, City, State 12345'),
    ('Local Library', 'Education', '456 Book Lane, City, State 12345'),
    ('Health Clinic', 'Healthcare', '789 Care Drive, City, State 12345');

-- Insert sample services
INSERT INTO services (name, description, resource_id) VALUES
    ('After School Program', 'Daily after-school activities for children', (SELECT id FROM resources WHERE name = 'Community Center')),
    ('Senior Activities', 'Weekly activities for seniors', (SELECT id FROM resources WHERE name = 'Community Center')),
    ('Book Lending', 'Borrow books for up to 3 weeks', (SELECT id FROM resources WHERE name = 'Local Library')),
    ('Computer Access', 'Free computer and internet access', (SELECT id FROM resources WHERE name = 'Local Library')),
    ('Basic Health Checkup', 'Regular health checkups and screenings', (SELECT id FROM resources WHERE name = 'Health Clinic')),
    ('Vaccination Services', 'Regular and seasonal vaccinations', (SELECT id FROM resources WHERE name = 'Health Clinic'));