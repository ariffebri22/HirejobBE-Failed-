-- Active: 1690000069845@@147.139.210.135@5432@kb02

-- auth
CREATE TABLE
    workers (
        id SERIAL PRIMARY KEY,
        username VARCHAR (152) NOT NULL,
        email VARCHAR (104) UNIQUE NOT NULL,
        phone VARCHAR (24) NOT NULL,
        password VARCHAR (104) NOT NULL
    );

-- profile
CREATE TABLE
    workers_profile (
        id SERIAL PRIMARY KEY,
        id_worker INT,
        FOREIGN KEY (id_worker) REFERENCES workers(id),
        position VARCHAR(104) NOT NULL,
        domicile VARCHAR(104) NOT NULL,
        company_work VARCHAR(256) NOT NULL,
        job_desc VARCHAR(256) NOT NULL,
        photo_worker VARCHAR(256) NOT NULL
    );

CREATE TABLE
    workers_skills (
        id SERIAL PRIMARY KEY,
        id_worker INT,
        FOREIGN KEY (id_worker) REFERENCES workers(id),
        skills_name VARCHAR(256) NOT NULL
    );

ALTER TABLE workers ADD COLUMN is_active BOOLEAN DEFAULT false;
ALTER TABLE workers ADD COLUMN checker VARCHAR;



