-- Active: 1690000069845@@147.139.210.135@5432@kb02

CREATE TABLE recruiters(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    phone VARCHAR,
    perusahaan VARCHAR,
    jabatan VARCHAR DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users(username,email,password,phone) VALUES('admin','admin@admin.id','123456','phone');
ALTER TABLE users ADD COLUMN perusahaan VARCHAR;