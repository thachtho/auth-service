export const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        nickname VARCHAR(255) NOT NULL,
        role INT NOT NULL
    )
`;
