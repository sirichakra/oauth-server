CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clients (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    redirect_uri VARCHAR(255)
);

CREATE TABLE authorization_codes (
    code VARCHAR(255) PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    client_id VARCHAR(255) REFERENCES clients(id),
    redirect_uri VARCHAR(255),
    code_challenge VARCHAR(255),
    expires_at TIMESTAMP,
    is_used BOOLEAN DEFAULT FALSE
);

CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    token_hash VARCHAR(255) UNIQUE NOT NULL,
    family_id VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id),
    client_id VARCHAR(255) REFERENCES clients(id),
    is_revoked BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP,
    used_at TIMESTAMP
);

INSERT INTO users (email,password)
VALUES ('test@example.com','password123');

INSERT INTO clients (id,name,redirect_uri)
VALUES (
    'dev-portal',
    'Developer Portal',
    'http://localhost:3000/callback'
);

CREATE TABLE IF NOT EXISTS auth_codes (
  id SERIAL PRIMARY KEY,
  code TEXT,
  client_id TEXT,
  redirect_uri TEXT,
  code_challenge TEXT,
  code_challenge_method TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
