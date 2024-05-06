-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL DEFAULT "$2a$10$Rb4V8b8Qd5UMTfB/88b8MeW/Ar7ATM/30CsxU/2r6EL/IOZLROqU2"
);
