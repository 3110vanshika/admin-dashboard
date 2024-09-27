CREATE TABLE IF NOT EXISTS employee_registration (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    position VARCHAR(100),
    department VARCHAR(100),
    date_of_birth DATE,
    date_of_joining DATE NOT NULL DEFAULT CURRENT_DATE,
    salary NUMERIC(10, 2) CHECK (salary >= 0),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url VARCHAR(255)
);
