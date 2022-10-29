CREATE TABLE IF NOT EXISTS clients_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rut TEXT
);

CREATE TABLE IF NOT EXISTS clients_purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_client  INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    date_purchase DATE NOT NULL,
    CONSTRAINT fk_clients
        FOREIGN KEY (id_client)
        REFERENCES clients_info(id)
        ON DELETE CASCADE
);
