# Restaverse Employee Directory

A full-stack employee directory application with search by employee name or department.

## Tech Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Python
- FastAPI
- SQLAlchemy
- Uvicorn

**Database**
- MariaDB / MySQL
- PyMySQL

## Architecture

The application uses a layered backend architecture:

1. **Router** — exposes HTTP endpoints and validates query parameters.
2. **Service** — handles application-level search logic.
3. **Repository** — builds and executes database queries.
4. **Database session** — manages SQLAlchemy connections and sessions.

The React frontend separates API calls, reusable components, and application state.

## Features

- Search employees by name or department.
- Display employee name, email, department, designation, and joining date.
- Loading, empty-result, and error states.
- Retry after a failed API request.
- API query validation and pagination.
- Database connection pooling.
- Environment-based configuration.
- CORS configured for local frontend development.

## Prerequisites

Install the following:

- Node.js and npm
- Python 3.14 or another Python version compatible with the pinned dependencies
- MariaDB or MySQL

## Database Setup

Log in to MariaDB as an administrator:

```sql
CREATE DATABASE restaverse_directory
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

CREATE USER 'restaverse_app'@'localhost'
    IDENTIFIED BY 'choose_a_local_password';

GRANT SELECT, INSERT, UPDATE, DELETE
    ON restaverse_directory.*
    TO 'restaverse_app'@'localhost';

USE restaverse_directory;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(150) NOT NULL,
    date_of_joining DATE NOT NULL,
    INDEX idx_employees_name (name),
    INDEX idx_employees_department (department)
);
```

Replace choose_a_local_password with a password you choose.

Optional sample data for local testing:
```sql
INSERT INTO employees
    (name, email, department, designation, date_of_joining)
VALUES
    ('Rahul Sharma', 'rahul.sharma@example.com',
     'Engineering', 'Backend Developer', '2024-03-15'),
    ('Rhea Nair', 'rhea.nair@example.com',
     'Human Resources', 'HR Executive', '2023-08-01'),
    ('Rahul Mehta', 'rahul.mehta@example.com',
     'Sales', 'Sales Associate', '2025-01-20'),
    ('Ananya Iyer', 'ananya.iyer@example.com',
     'Engineering', 'Frontend Developer', '2024-06-10'),
    ('Arjun Menon', 'arjun.menon@example.com',
     'Finance', 'Financial Analyst', '2022-11-07');
```

## Backend Setup
From the repository root:
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
```

Edit `backend/.env` and configure `DATABASE_URL`:
```dotenv
DATABASE_URL=mysql+pymysql://restaverse_app:your_password@localhost:3306/restaverse_directory
```

Use the password configured for your local MariaDB application user. If it contains URL-reserved characters, URL-encode them in the connection URL.

Start the API from the backend directory:
```bash
python -m uvicorn app.main:app --reload
```


The API is available at `http://localhost:8000`.

Interactive API documentation: `http://localhost:8000/docs`

Health endpoint: `http://localhost:8000/health`

## Frontend Setup
Open another terminal:
```bash
cd frontend
npm install
cp .env.example .env
```

The frontend environment file should contain:
```dotenv
VITE_API_BASE_URL=http://localhost:8000
```

Start the development server:
```bash
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## API Endpoints

### Health check
```http
GET /health
```

### List employees
```http
GET /employees
```

### Search employees
```http
GET /employees?search=rah
```

The search matches employee names and departments.

### Pagination
```http
GET /employees?limit=10&offset=0
```
- `limit`: number of records to return, from 1 to 100; defaults to 10.
- `offset`: number of records to skip; must be zero or greater.

The response is a JSON array of employee objects. An empty result returns `200 OK` with an empty array.

## Error Handling and Performance

- FastAPI validates query parameters before the repository runs.
- The frontend displays loading, empty-result, and error states.
- Outdated browser requests can be cancelled.
- Retry triggers a new request after a failure.
- SQLAlchemy manages a connection pool.
- Pagination limits the number of returned records.
- Name and department indexes are defined in the database schema.

The current substring search uses patterns such as `%term%`. Standard B-tree indexes generally cannot accelerate arbitrary substring matches efficiently; larger datasets may need a different search strategy.

## Project Structure
```
restaverse-employee-directory/
├── backend/
│   ├── app/
│   │   ├── db/
│   │   ├── repositories/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── config.py
│   │   └── main.py
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

## Notes
- Do not commit .env files containing real configuration or credentials.
- The .env.example files contain templates only.
- The sample employee records are fictional.
