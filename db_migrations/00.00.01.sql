CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    description text NULL,
    price INTEGER
);

CREATE TABLE IF NOT EXISTS stock (
    product_id UUID,
    count INTEGER,
    FOREIGN KEY (product_id) REFERENCES products (id)
);

INSERT INTO products
    (title, description, price)
VALUES
    ('ProductOne', 'Short Product Description 1', 24),
    ('ProductTwo', 'Short Product Description 2', 15),
    ('ProductThree', 'Short Product Description 3', 23),
    ('ProductFour', 'Short Product Description 4', 15),
    ('ProductFive', 'Short Product Description 5', 23),
    ('ProductSix', 'Short Product Description 6', 15);

INSERT INTO stock
    (product_id, count)
VALUES
    ((SELECT id FROM products WHERE title = 'ProductOne'), 4),
    ((SELECT id FROM products WHERE title = 'ProductTwo'), 5),
    ((SELECT id FROM products WHERE title = 'ProductThree'), 3),
    ((SELECT id FROM products WHERE title = 'ProductFour'), 1),
    ((SELECT id FROM products WHERE title = 'ProductFive'), 7),
    ((SELECT id FROM products WHERE title = 'ProductSix'), 2);
