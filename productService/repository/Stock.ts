import db from './db';
import { StockRaw } from './types';
import { InternalServerError } from '../errors';

const createOne = async (stock: StockRaw): Promise<StockRaw> => {
    const client = await db();

    try {
        const {
            product_id,
            count,
        } = stock;

        const { rows } = await client.query<StockRaw>(`
            INSERT INTO stock (product_id, count)
            VALUES ($1, $2)
                RETURNING *
        `, [product_id, count]);

        return rows[0];
    } catch (e) {
        throw new InternalServerError(e.message);
    } finally {
        client.end();
    }
};

export default {
    createOne,
};
