import db from './db';
import { ProductRaw } from './types';
import { Product } from '../models';
import { InternalServerError } from '../errors';

const getAll = async (): Promise<Product[]> => {
    const client = await db();

    try {
        const { rows } = await client.query<ProductRaw>(`
            SELECT p.id, p.title, p.description, p.price, COALESCE(s.count, 0) as count FROM products p
                LEFT JOIN stock s
                ON p.id = s.product_id
        `);

        return rows as Product[];
    } catch (e) {
        throw new InternalServerError(e.message);
    } finally {
        client.end();
    }
};

const getOne = async ({ id }): Promise<Product> => {
    const client = await db();

    try {
        const { rows } = await client.query<ProductRaw>(`
            SELECT p.id, p.title, p.description, p.price, s.count FROM products p
                JOIN stock s
                ON p.id = s.product_id
                WHERE p.id = '${id}'
        `);

        return rows[0] as Product;
    } catch (e) {
        throw new InternalServerError(e.message);
    } finally {
        client.end();
    }
};

const createOne = async (product: Omit<Product, 'id' | 'stock'>): Promise<Product> => {
    const client = await db();

    try {
        const {
            title, description, price,
        } = product;

        const { rows } = await client.query<ProductRaw>(`
            INSERT INTO products
                (title, description, price)
            VALUES
                ('${title}', '${description}', ${price})
                RETURNING *
        `);

        console.log({ CREATED_ROWS: rows });
        return rows[0] as Product;
    } catch (e) {
        throw new InternalServerError(e.message);
    } finally {
        client.end();
    }
};

export default {
    getAll,
    getOne,
    createOne,
};
