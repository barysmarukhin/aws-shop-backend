import db from './db';
import { StockRaw } from './types';

const createOne = async (stock: StockRaw): Promise<StockRaw> => {
    const client = await db();

    try {
        const {
            product_id,
            count,
        } = stock;

        const { rows } = await client.query<StockRaw>(`
        INSERT INTO stock
            (product_id, count)
        VALUES
            (${product_id}, ${count})
      `);

        return rows[0];
    } catch (e) {
    } finally {
        client.end();
    }
};

export default {
    createOne,
};
